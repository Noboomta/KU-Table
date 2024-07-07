<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import KuFooter from './components/KuFooter.vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from './stores/auth'
import { useThemeStore } from './stores/theme'

const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

const router = useRouter()
const route = useRoute()

watch(theme, (newTheme) => {
  newTheme === 'light'
    ? document.querySelector('html')!.classList.remove('dark')
    : document.querySelector('html')!.classList.add('dark')
})

watch(isAuthenticated, (newValue) => {
  if (newValue) {
    router.push('/schedule')
  } else {
    router.push('/login')
  }
})

// Mounted lifecycle hook
onMounted(() => {
  themeStore.initTheme()
})

const navigateToLogin = () => {
  if (route.path !== '/login') {
    router.push('/login')
  }
}

const logout = () => {
  authStore.clearAuthData()
}
</script>

<template>
  <div id="app" class="bg-white dark:bg-gray-900">
    <div>
      <nav
        class="h-16 flex items-center bg-green-500 dark:bg-gray-800 px-5 justify-between z-10 fixed w-full"
      >
        <div id="middle" class="h-16 flex items-center m-auto justify-center absolute">
          <h1 class="font-bold text-gray-200 dark:text-green-300 text-2xl">KU-Table</h1>
        </div>
        <div id="left">
          <router-link to="/schedule">
            <img src="./assets/ku-table.jpg" class="w-10 h-10" alt="KU-Logo" />
          </router-link>
        </div>
        <div id="right" class="flex">
          <a
            href="#"
            class="m-3 text-gray-200 dark:text-green-300 hover:text-white dark:hover:text-white transition duration-300"
            @click.prevent="themeStore.toggleTheme"
          >
            <font-awesome-icon v-if="theme === 'light'" icon="moon" />
            <font-awesome-icon v-else icon="sun" />
          </a>
          <button
            v-if="!isAuthenticated"
            class="m-3 text-gray-200 dark:text-green-300 hover:text-white dark:hover:text-white transition duration-300 cursor-pointer"
            @click="navigateToLogin"
          >
            Login
          </button>
          <button
            v-else
            class="m-3 text-gray-200 dark:text-green-300 hover:text-white dark:hover:text-white transition duration-300 cursor-pointer"
            @click="logout"
          >
            Logout
          </button>
        </div>
      </nav>
      <div class="h-16" />
    </div>
    <div class="flex-grow flex flex-col">
      <router-view />
    </div>
    <ku-footer />
  </div>
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: all 0.5s;
}
nav {
  box-shadow: 0px 4px 4px 0px #00000040;
}
#middle {
  left: 50%;
  transform: translateX(-50%);
}
</style>
