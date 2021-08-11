import Vue from 'vue'
import App from './App.vue'

import './assets/tailwind.css';

Vue.config.productionTip = false

import router from './router'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
