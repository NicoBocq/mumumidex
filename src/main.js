import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faThermometerEmpty, faTint } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faThermometerEmpty, faTint)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
