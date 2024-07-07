import { defineStore } from 'pinia'

interface ThemeStore {
  theme: null | 'light' | 'dark'
}

export const useThemeStore = defineStore('theme', {
  state: (): ThemeStore => ({
    theme: null,
  }),
  actions: {
    setTheme(theme: 'light' | 'dark') {
      this.theme = theme
      localStorage.setItem('theme', theme)
    },
    initTheme() {
      const cached = localStorage.getItem('theme') as ThemeStore['theme']

      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

      if (cached) {
        this.setTheme(cached)
      } else if (prefersDark) {
        this.setTheme('dark')
      } else {
        this.setTheme('light')
      }
    },
    toggleTheme() {
      switch (this.theme) {
        case 'light':
          this.setTheme('dark')

          return
        case 'dark':
          this.setTheme('light')
      }
    },
  },
  getters: {
    getTheme: (state): 'light' | 'dark' | null => {
      return state.theme
    },
  },
})
