import Vue from 'vue'
import App from './App.vue'

import VueHtml2Canvas from 'vue-html2canvas'

import './assets/tailwind.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faDownload)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('k-progress', KProgress)

Vue.use(VueHtml2Canvas)

Vue.config.productionTip = false

import router from './router'
import KProgress from 'k-progress'

new Vue({
	router,
	render: (h) => h(App),
}).$mount('#app')
