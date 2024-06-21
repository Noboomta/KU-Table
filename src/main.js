import 'regenerator-runtime/runtime'

import { createApp } from 'vue'
import App from './App.vue'

import VueHtml2Canvas from 'vue-html2canvas'

import './assets/tailwind.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faDownload, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import theme from './modules/theme'
import auth from './modules/auth'
import router from './router'
import KProgress from 'k-progress-v3'
import { createStore } from 'vuex'

library.add(faDownload, faMoon, faSun)

const store = createStore({
	modules: {
		theme,
		auth,
	},
})

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('k-progress', KProgress)

app.use(store)
app.use(router)
app.use(VueHtml2Canvas)

app.mount('#app')
