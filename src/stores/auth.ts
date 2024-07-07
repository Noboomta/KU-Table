import loginMyKu, { type LoginRequest, type StudentInfo } from '@/service/api/loginMyKu'
import { defineStore } from 'pinia'

interface AuthStore {
  studentInfo: StudentInfo
  accessToken: string
}

export const useAuthStore = defineStore('Auth', {
  state: (): AuthStore => ({
    studentInfo: localStorage.getItem('studentInfo')
      ? JSON.parse(localStorage.getItem('studentInfo')!)
      : {},
    accessToken: localStorage.getItem('accessToken') || '',
  }),
  actions: {
    async login({ username, password }: LoginRequest) {
      const { accesstoken, user } = await loginMyKu({
        username,
        password,
      })

      const studentInfo = {
        stdCode: user.student.stdCode,
        stdId: user.student.stdId,
        majorCode: user.student.majorCode,
      }

      localStorage.setItem('accessToken', accesstoken)
      localStorage.setItem('studentInfo', JSON.stringify(studentInfo))

      this.studentInfo = studentInfo
      this.accessToken = accesstoken
    },
    clearAuthData() {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('studentInfo')

      this.studentInfo = {} as StudentInfo
      this.accessToken = ''
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },
})
