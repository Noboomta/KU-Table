import axiosInstance from '../http'
import { Module } from 'vuex'

interface IsAuthStore {
  studentInfo: string | null
  accessToken: string | null
}

export default {
  namespaced: true,
  state: {
    studentInfo: JSON.parse(localStorage.getItem('studentInfo')) || null,
    accessToken: localStorage.getItem('accessToken') || null,
  },
  mutations: {
    authenticate(state, payload) {
      const { studentInfo, accessToken } = payload
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('studentInfo', JSON.stringify(studentInfo))
      axiosInstance.defaults.headers.common['accesstoken'] = accessToken
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
