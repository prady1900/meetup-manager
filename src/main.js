import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './store/index'
import vuetify from './plugins/vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import DateFilter from './filters/date'
import * as firebase from 'firebase/app'


Vue.config.productionTip = false
Vue.filter('date',DateFilter)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created(){
    
    const firebaseConfig = {
      apiKey: "AIzaSyDOsAcscnElU6RfuOFD0E0ICzLUdROf5JY",
      authDomain: "meet-ups-e78ee.firebaseapp.com",
      projectId: "meet-ups-e78ee",
      storageBucket: "meet-ups-e78ee.appspot.com",
      messagingSenderId: "916491785874",
      appId: "1:916491785874:web:e99879baccc4028599384b",
      measurementId: "G-690HHZ5SQF"
    };
    firebase.initializeApp(firebaseConfig)
  }
}).$mount('#app')


