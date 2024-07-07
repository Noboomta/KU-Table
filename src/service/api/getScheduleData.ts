import axios from '@/service'

export interface Course {
  day_w: string
  time_from: string
  time_to: string
  subject_code: string
  subject_name_en: string
  subject_name_th: string
  room_name_en: string
  room_name_th: string
  section_type_en: string
  section_type_th: string
  section_code: string
}

export interface ScheduleData {
  course: Course[]
  period_date: string
}

export default async function getScheduleData(stdId: string) {
  const response = await axios.get<ScheduleData>('/getSchedule', {
    params: {
      stdId: stdId,
    },
  })

  return response.data
}
