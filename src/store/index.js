import Vue from 'vue'
import Vuex from 'vuex'

import firebase from 'firebase/app'
require('firebase/auth');

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetUps: [
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
        id: 'afajfjadfaadfa323',
        title: 'Meetup in New York',
        date: '2017-07-17',
        description:'asdajksdkahsdahsdha'
      },
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg',
        id: 'aadsfhbkhlk1241',
        title: 'Meetup in Paris',
        date: '2017-07-19',
        description: 'sdaigsdogffgasgfukagdfgaigsd9asuda'
      }
    ],
    user: null,
    loading: false,
    error: null,
  },
  getters: {
    loadedMeetUps(state) {
      return state.loadedMeetUps.sort((meetupA, meetupB)=>{
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups(state) {
      return state.loadedMeetUps.slice(0, 2)
    },
    loadedMeetUp(state) {
      return (meetUpId) => {
        return state.loadedMeetUps.find((meetup) => {
          return meetup.id === meetUpId
        })
      }
    },
    user (state) {
      return state.user
    }
  },
  mutations: {
    createMeetUp(state, payload) {
      state.loadedMeetUps.push(payload)
    },
    setUser(state, payload){
      state.user = payload
    },
    setLoading(state, payload){
      state.loading = payload
    },
    setError(state, payload){
      state.error = payload
    },
    clearError(state){
      state.error = null
    }
  },
  actions: {
    createMeetUp({ commit }, payload) {
      const meetUps = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: 'dsfsdfsdf'
      }
      //Reach Out Firebase
      console.log(meetUps)
      commit('createMeetUp', meetUps)
    },
    signUserUp ({commit}, payload) {
      
      commit('setLoading',true)

      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('clearError')
            commit('setLoading',false)
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading',false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn({commit}, payload){

      commit('setLoading',true)

      firebase.auth().signInWithEmailAndPassword(payload.email,payload.password).then(
        user => {
          commit('clearError')
          commit('setLoading',false)
          const newUser = {
            id: user.uid,
            registeredMeetups:[]
          }
          commit('setUser',newUser)
        }
      ).catch(
        error => {
          commit('setLoading',false)
          commit('setError', error)
          console.log(error);
        }
      )
    }
  },


})
