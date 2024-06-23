import { Module } from 'vuex'

interface ThemeStore {
  theme: null | 'light' | 'dark'
}

export default {
  namespaced: true,
  state: {
    theme: null,
  },
  mutations: {
    setTheme(state, theme) {
      state.theme = theme
      localStorage.theme = theme
    },
  },
  actions: {
    initTheme({ commit }) {
      const cached = localStorage.theme ? localStorage.theme : false
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (cached) {
        commit('setTheme', cached)
      } else if (prefersDark) {
        commit('setTheme', 'dark')
      } else {
        commit('setTheme', 'light')
      }
    },
    toggleTheme({ commit }) {
      switch (localStorage.theme) {
        case 'light':
          commit('setTheme', 'dark')
          break
        case 'dark':
          commit('setTheme', 'light')
          break
      }
    },
  },
  getters: {
    getTheme: (state) => {
      return state.theme
    },
  },
} as Module<ThemeStore, any>
