import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store'

import './registerServiceWorker'
import vuetify from '@/plugins/vuetify' // path to vuetify export

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

Vue.component('font-awesome-icon', FontAwesomeIcon) // Register component globally
library.add(fas) // Include needed icons.

Vue.use(vuetify, {
  iconfont: 'faSvg'
})

Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
