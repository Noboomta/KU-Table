import { defineStore } from 'pinia'
import getScheduleData, { type Course } from '@/service/api/getScheduleData'
import mapCourseTimeToColumn from '@/utils/mapCourseTimeToColumn'

export interface CourseWithColumn extends Course {
  startCol: number
  endCol: number
}

export const useScheduleStore = defineStore('schedule', {
  state: () => ({
    courses: {} as Record<string, CourseWithColumn[]>,
    periodDate: '',
  }),
  actions: {
    async getSchedule(stdId: string) {
      const { period_date, course } = await getScheduleData(stdId)

      this.periodDate = period_date

      this.courses = course.reduce(
        (acc, course) => {
          const dayKey = course.day_w.trim()
          const mappedCourse: CourseWithColumn = {
            startCol: mapCourseTimeToColumn(course.time_from),
            endCol: mapCourseTimeToColumn(course.time_to),
            ...course,
          }
          if (dayKey in acc) {
            acc[dayKey].push(mappedCourse)
          } else {
            acc[dayKey] = [mappedCourse]
          }
          return acc
        },
        {} as Record<string, CourseWithColumn[]>
      )
    },
  },
})
