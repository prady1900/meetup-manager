import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './store/index'
import vuetify from './plugins/vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import DateFilter from './filters/date'

Vue.config.productionTip = false
Vue.filter('date',DateFilter)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')


