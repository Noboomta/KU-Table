import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

import VueHtml2Canvas from 'vue-html2canvas'

import './assets/tailwind.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faDownload, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import theme from './modules/theme'

library.add(faDownload, faMoon, faSun)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('k-progress', KProgress)

Vue.use(Vuex)
Vue.use(VueHtml2Canvas)

Vue.config.productionTip = false

import router from './router'
import KProgress from 'k-progress'

const store = new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		theme,
	},
})

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app')
