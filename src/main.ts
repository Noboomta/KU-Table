import 'regenerator-runtime/runtime'

import { createApp } from 'vue'
import App from './App.vue'

import './assets/tailwind.css'

import { faDownload, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import KProgress from 'k-progress-v3'
import theme from './modules/theme'
import { createStore } from 'vuex'
import auth from './modules/auth'
import router from './router'
import { createI18n } from 'vue-i18n'

library.add(faDownload, faMoon, faSun)

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'th',
  fallbackLocale: 'th',
})

const store = createStore({
  modules: {
    theme,
    auth,
  },
})

const app = createApp(App)

app.component('FontAwesomeIcon', FontAwesomeIcon)
app.component('KProgress', KProgress)

app.use(store)
app.use(router)
app.use(i18n)

app.mount('#app')
