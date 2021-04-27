import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import { store } from "./store/index"
import vuetify from "./plugins/vuetify"
import "material-design-icons-iconfont/dist/material-design-icons.css"
import DateFilter from "./filters/date"
import * as firebase from "firebase/app"
import AlertCmp from "./components/Shared/alert1.vue";
import EditMeetUpDetails from './components/Meet-Ups/Edit/EditDetails.vue'
import EditMeetupDate from './components/Meet-Ups/Edit/Editmdate.vue'
import Registermeetup from './components/Meet-Ups/Registration/RegistrationD.vue'

require("firebase/auth")

Vue.config.productionTip = false
Vue.filter("date", DateFilter)

Vue.component("app-alert", AlertCmp)
Vue.component("app-edit-dialog", EditMeetUpDetails)
Vue.component("app-edit-date", EditMeetupDate)
Vue.component("app-register-meet", Registermeetup)

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  created() {
      const firebaseConfig = {
        apiKey: "",
        authDomain: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",
        measurementId: "",
      };
      firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch("autoSignIn", user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch("loadMeetUpFromFB")  
    this.$store.dispatch("loadMyMeetsFromFB")
  },
}).$mount("#app");
