import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: process.env.VUE_APP_BASE_SERVER_URL,
})

const accessToken = localStorage.getItem('accessToken')

if (accessToken !== null) {
	axiosInstance.defaults.headers.common['accesstoken'] = accessToken
}

export default axiosInstance
