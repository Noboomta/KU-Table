import axios from 'axios'
import { useAuthStore } from './stores/auth'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_SERVER_URL,
})

axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore()

  if (accessToken) {
    config.headers['accesstoken'] = accessToken
  }

  return config
})

export default axiosInstance
