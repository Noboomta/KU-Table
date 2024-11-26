import axios from '@/service'

export interface GetUnitRequest {
  stdCode: string
  majorCode: string
}

export default async function getUnitData({ stdCode, majorCode }: GetUnitRequest) {
  const response = await axios.get('/getGenEd', {
    params: {
      stdCode: stdCode,
      majorCode: majorCode,
    },
  })

  return response.data
}
