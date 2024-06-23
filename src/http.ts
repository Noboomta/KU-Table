import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_SERVER_URL,
})

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken')

  if (accessToken) {
    config.headers['accesstoken'] = accessToken
  }

  return config
})

export default axiosInstance
