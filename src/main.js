import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMapMarkerAlt, faPhone, faFax } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faMapMarkerAlt)
library.add(faPhone)
library.add(faFax)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(Vuelidate)

axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'
axios.defaults.headers.common['Accept'] = 'application/json'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
