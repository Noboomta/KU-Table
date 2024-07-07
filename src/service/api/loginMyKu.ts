import axios from '@/service'

export interface LoginRequest {
  username: string
  password: string
}

export interface StudentInfo {
  stdId: string
  stdCode: string
  majorCode: string
}

export interface LoginResponse {
  accesstoken: string
  user: {
    student: StudentInfo
  }
}

export default async function loginMyKu({ username, password }: LoginRequest) {
  const response = await axios.post<LoginResponse>('/login', {
    username,
    password,
  })

  return response.data
}
