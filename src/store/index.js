import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetUps: [
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
        id: 'afajfjadfaadfa323',
        title: 'Meetup in New York',
        date: '2017-07-17'
      },
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg',
        id: 'aadsfhbkhlk1241',
        title: 'Meetup in Paris',
        date: '2017-07-19'
      }
    ],
    user: {
      id: 'dsfsdf',
      registeredMeetUps: ['0'],
    }
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
    }
  },
  mutations: {
    createMeetUp(state, payload) {
      state.loadedMeetUps.push(payload)
    }
  },
  actions: {
    createMeetUp({ commit }, payload) {
      const meetUps = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        date: payload.date,
        id: 'dsfsdfsdf'
      }
      //Reach Out Firebase
      console.log(meetUps)
      commit('createMeetUp', meetUps)
    }
  },


})
