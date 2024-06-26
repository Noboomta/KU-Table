import axios from '@/service'

export interface LoginRequest {
  username: string
  password: string
}

export default async function loginMyKu({ username, password }: LoginRequest) {
  const response = await axios.post('/login', {
    username,
    password,
  })

  return response.data
}
