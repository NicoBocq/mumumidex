import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

Vue.component('font-awesome-icon', FontAwesomeIcon) // Register component globally
library.add(fas) // Include needed icons.

Vue.use(Vuetify, {
  iconfont: 'faSvg'
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
