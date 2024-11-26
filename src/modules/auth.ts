import type { Module } from 'vuex'

interface IsAuthStore {
  studentInfo: string | null
  accessToken: string | null
}

export default {
  namespaced: true,
  state: {
    studentInfo: localStorage.getItem('studentInfo')
      ? JSON.parse(localStorage.getItem('studentInfo')!)
      : null,
    accessToken: localStorage.getItem('accessToken') || null,
  },
  mutations: {
    authenticate(state, payload) {
      const { studentInfo, accessToken } = payload
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('studentInfo', JSON.stringify(studentInfo))

      state.studentInfo = studentInfo
      state.accessToken = accessToken
    },
    clearAuthData(state) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('studentInfo')
      state.studentInfo = null
      state.accessToken = null
    },
  },
  getters: {
    getIsAuthenticated(state) {
      return state.accessToken !== null
    },
  },
} as Module<IsAuthStore, any>
