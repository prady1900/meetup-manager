import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
require("firebase/auth");
require("firebase/database");
require("firebase/storage");

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loadedMeetUps: [],
    myMeetups:null,
    user: null,
    loading: false,
    error: null,
    placeHolder: false,
    usernames:[]
  },
  getters: {
    myMeetup(state){
      return state.myMeetups
    },
    regUserNamesGetter(state){
      return state.usernames
    },
    loadedMeetUps(state) {
      return state.loadedMeetUps.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date;
      });
    },
    featuredMeetups(state) {
      return state.loadedMeetUps.slice(0, 5);
    },
    loadedMeetUp(state) {
      return (meetUpId) => {
        return state.loadedMeetUps.find((meetup) => {
          return meetup.id === meetUpId;
        });
      };
    },
    user(state) {
      return state.user;
    },
    error(state) {
      return state.error;
    },
    
    loading(state) {
      return state.loading;
    },
  },
  mutations: {
    registerUserForMeetup (state, payload) {
      const id = payload.id
      if (state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0) {
        return
      }
      state.user.registeredMeetups.push(id)
      state.user.fbKeys[id] = payload.fbKey
    },
    unregisterUserFromMeetup (state, payload) {
      const registeredMeetups = state.user.registeredMeetups
      registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup.id === payload), 1)
      Reflect.deleteProperty(state.user.fbKeys, payload)
    },
    regUserNames(state,payload){
      state.usernames = payload
    },
    setLoadedMeetups(state, payload) {
      state.loadedMeetUps = payload;
    },
    setMyLoadedMeetups(state, payload) {
      state.myMeetups = payload;
    },
    createMeetUp(state, payload) {
      state.loadedMeetUps.push(payload);
    },
    updateMeetup(state, payload) {
      const meetup = state.loadedMeetUps.find((meetup) => {
        return meetup.id === payload.id;
      });
      if (payload.title) {
        meetup.title = payload.title;
      }
      if (payload.description) {
        meetup.description = payload.description;
      }
      if (payload.date) {
        meetup.date = payload.date;
      }
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    
    getUserName({commit},payload){
      let username=[]
      firebase.database().ref("meetups/"+payload+"/regnames").on("value",(snapshot)=>{
        snapshot.forEach((childsnap)=>{
          username.push(childsnap.val())
        })
      })
      commit("regUserNames",username)
    },
    loadMyMeetsFromFB({commit,getters}){
      commit("setLoading", true)
      firebase.database().ref("meetups").on("value",(snapshot)=>{
        
        const myMeetUp = [];
        const name1=[]
        const obj1 = snapshot.val()
        firebase.database().ref("/userName/"+getters.user.id).on("value", (snapshot)=>{
          commit("setLoading", true)
          snapshot.forEach((childSnap)=>{
            name1.push(childSnap.val())
            console.log("Hello from refs",name1)
            commit("setLoading", false)
          });
        })
        
        for(let key in obj1){
          if(getters.user.id === obj1[key].creatorId){
          console.log(obj1[key].creatorId,getters.user.id)
            myMeetUp.push({
              id: key,
              title: obj1[key].title,
              description: obj1[key].description,
              imageUrl: obj1[key].imageUrl,
              date: obj1[key].date,
              name: name1
            })
         } 
        }
        console.log("I am called",myMeetUp)
        commit("setLoading", false)
        commit("setMyLoadedMeetups", myMeetUp);
      })
    },
    loadMeetUpFromFB({ commit }) {
      commit("setLoading", true),
        firebase
          .database()
          .ref("meetups")
          .once("value")
          .then((data) => {
            const meetUPSFb = [];
            const obj = data.val();
            for (let key in obj) {
              meetUPSFb.push({
                id: key,
                title: obj[key].title,
                description: obj[key].description,
                imageUrl: obj[key].imageUrl,
                date: obj[key].date,
                location: obj[key].location,
                creatorId: obj[key].creatorId,
              });
            }
            commit("setLoading", false);
            commit("setLoadedMeetups", meetUPSFb);
          })
          .catch((error) => {
            console.log(error);
          });
    },
    createMeetUp({ commit, getters }, payload) {
      const meetUps = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id,
      };
      let key;
      //Reach Out Firebase
      firebase
        .database()
        .ref("meetups")
        .push(meetUps)
        .then((data) => {
          key = data.key;
          console.log(data);
          return key;
        })
        .then((key) => {
          const filename = payload.image.name;
          const ext = filename.slice(filename.lastIndexOf("."));
          return firebase
            .storage()
            .ref("meetups/" + key + "." + ext)
            .put(payload.image);
        })
        .then((fileData) => {
          fileData.ref.getDownloadURL().then((url) => {
            console.log("Hello",url)
            commit("createMeetUp", {
              ...meetUps,
              imageUrl: url,
              id: key,
            });
            console.log("firebase");
            return firebase
              .database()
              .ref("meetups")
              .child(key)
              .update({ imageUrl: url });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    signUserUp({ commit }, payload) {
      commit("setLoading", true);

      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          commit("clearError");
          commit("setLoading", false);
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
            fbKeys: {},
            
          };
          firebase.database().ref('/userName/' + user.user.uid).push(payload.name).then(()=>{
            
          }).catch((error)=>{
            console.log(error)
          })
          commit("setUser", newUser);
        })
        .catch((error) => {
          commit("setLoading", false);
          commit("setError", error);
          console.log(error);
        });
    },
    registerUserForMeetup ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      firebase.database().ref('/users/' + user.id).child('/registrations/')
        .push(payload)
        .then(data => {

          commit('setLoading', false)
          commit('registerUserForMeetup', {id: payload, fbKey: data.key})
        }).then(()=>{
          let name1 =[]
          firebase.database().ref("/userName/"+getters.user.id).on("value", (snapshot)=>{
            commit("setLoading", true)
            snapshot.forEach((childSnap)=>{
              name1.push(childSnap.val())
              commit("setLoading", false)
            });
            
            firebase.database().ref('/meetups/'+payload+"/regnames").child(getters.user.id).set(name1[0]).then(()=>{
              console.log("User Name Registered")
            })
          })
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    unregisterUserFromMeetup ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      if (!user.fbKeys) {
        return
      }
      const fbKey = user.fbKeys[payload]
      firebase.database().ref('/users/' + user.id + '/registrations/').child(fbKey)
        .remove()
        .then(() => {
          commit('setLoading', false)
          commit('unregisterUserFromMeetup', payload)
        }).then(()=>{
          firebase.database().ref('/meetups/'+payload+"/regnames").child(getters.user.id).remove().then(()=>{
            console.log("User Name Registered")
          })
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    forgotPass({commit},payload){
      
      firebase.auth().sendPasswordResetEmail(payload.email).then(()=>{
        
        console.log("Email Sent")
      }).catch(error =>{
        commit("setError", error);
        console.log("Error Here",error)
      })


    },
    updateMeetupData({ commit }, payload) {
      commit("setLoading", true);
      const updateObj = {};

      if (payload.title) {
        updateObj.title = payload.title;
      }
      if (payload.description) {
        updateObj.description = payload.description;
      }
      if (payload.date) {
        updateObj.date = payload.date;
      }
      firebase
        .database()
        .ref("meetups")
        .child(payload.id)
        .update(updateObj)
        .then(() => {
          console.log(payload);
          commit("setLoading", false);
          commit("updateMeetup", payload);
          console.log("Successfully added to FB");
        })
        .catch((error) => {
          console.log(error);
          commit("setLoading", false);
          console.log("Not added to FB");
        });
    },
    signUserIn({ commit }, payload) {
      commit("setLoading", true);

      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          commit("clearError");
          commit("setLoading", false);
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
            fbKeys: {},
            
          };
          commit("setUser", newUser);
        })
        .catch((error) => {
          commit("setLoading", false);
          commit("setError", error);
          console.log("Error Here",error);
        });
    },
    autoSignIn({ commit }, payload) {
      commit("setUser", { id: payload.uid, registeredMeetups: [], fbKeys: {} });
    },
    fetchUserData ({commit, getters}) {
      commit('setLoading', true)
      firebase.database().ref('/users/' + getters.user.id + '/registrations/').once('value')
        .then(data => {
          const dataPairs = data.val()
          let registeredMeetups = []
          let swappedPairs = {}
          for (let key in dataPairs) {
            registeredMeetups.push(dataPairs[key])
            swappedPairs[dataPairs[key]] = key
          }
          

          const updatedUser = {
            id: getters.user.id,
            registeredMeetups: registeredMeetups,
            fbKeys: swappedPairs
          }
          commit('setLoading', false)
          commit('setUser', updatedUser)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit("setUser", null);
      commit("myMeetups", null);


    },
    clearError({ commit }) {
      commit("clearError");
    },
  },
});
