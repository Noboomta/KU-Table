import axios from '@/service'

export default async function getScheduleData(stdId: string) {
  const response = await axios.get('/getSchedule', {
    params: {
      stdId: stdId,
    },
  })

  return response.data
}
