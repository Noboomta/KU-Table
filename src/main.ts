import 'regenerator-runtime/runtime'

import { createApp } from 'vue'
import App from './App.vue'

import './assets/tailwind.css'

import { faDownload, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { createPinia } from 'pinia'

import KProgress from 'k-progress-v3'

import router from './router'

library.add(faDownload, faMoon, faSun)

const pinia = createPinia()

const app = createApp(App)

app.component('FontAwesomeIcon', FontAwesomeIcon)
app.component('KProgress', KProgress)

router.beforeEach(async (to, _, next) => {
  const isAuthenticated = localStorage.getItem('accessToken')

  if (!isAuthenticated && to.path !== '/login') {
    return '/login'
  } else if (isAuthenticated && ['/', '/login'].includes(to.path)) {
    return '/schedule'
  }

  next()
})

app.use(router)
app.use(pinia)

app.mount('#app')
