import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadMeetUps: [
      { imgUrl: "https://picsum.photos/300", title: "Random Image 1", id: '0', date: '2020-04-08' },
      { imgUrl: "https://picsum.photos/300", title: "Random Image 2", id: '1', date: '2020-09-18' },
      { imgUrl: "https://picsum.photos/300", title: "Random Image 3", id: '2', date: '2020-02-19' },
      { imgUrl: "https://picsum.photos/300", title: "Random Image 4", id: '3', date: '2020-03-17' },
      { imgUrl: "https://picsum.photos/300", title: "Random Image 5", id: '4', date: '2020-05-11' },
      { imgUrl: "https://picsum.photos/300", title: "Random Image 6", id: '5', date: '2020-06-12' }
    ],
    user: {
      id: 'dsfsdf',
      registeredMeetUps: ['0'],
    }
  },
  getters: {
    loadMeetUps(state) {
      return state.loadMeetUps.sort((meetupA, meetupB)=>{
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups(state) {
      return state.loadMeetUps.slice(0, 3)
    },
    loadMeetUp(state) {
      return (meetUpId) => {
        return state.loadMeetUps.find((meetup) => {
          return meetup.id === meetUpId
        })
      }
    }
  },
  mutations: {
    createMeetUps(state, payload) {
      state.loadMeetUps.push(payload)
    }
  },
  actions: {
    createMeetUps({ commit }, payload) {
      const meetUps = {
        title: payload.title,
        location: payload.loc,
        imgUrl: payload.imgurl,
        date: payload.date,
        id: 'dsfsdfsdf'
      }
      //Reach Out Firebase
      commit('createMeetUps', meetUps)
    }
  },


})
