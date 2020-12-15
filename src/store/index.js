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
      id: 'abcder',
      registeredMeetUps: ['0'],
    }
  },
  getters: {
    load_MeetUps(state) {
      return state.loadMeetUps
    },
    featuredMeetups(state) {
      return state.loadMeetUps.slice(0, 3)
    },
    loadMeetUp(state) {
      return (meetUpId) => {
        return state.loadMeetUps.find((meetup) => {
          return meetup.id == meetUpId
        })
      }
    }
  },
  mutations: {
    createMeetUps(state, payload) {
      state.loadMeetUp.push(payload)
    }
  },
  actions: {
    createMeetUps({ commit }, payload) {
      const meetUps = {
        title: payload.title,
        location: payload.loc,
        imgUrl: payload.img_Url,
        description: payload.desc,
        date: new Date(),
        id: 'adsdvasdv'
      }
      //Reach Out Firebase
      commit('created MeetUps', meetUps)
    }
  },


})
