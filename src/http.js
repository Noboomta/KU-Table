import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: 'https://ku-table-server.herokuapp.com',
})

const accessToken = localStorage.getItem('accessToken')

if (accessToken !== null) {
	axiosInstance.defaults.headers.common['accesstoken'] = accessToken
}

export default axiosInstance
