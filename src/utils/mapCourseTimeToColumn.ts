export default function mapCourseTimeToColumn(timeString: string) {
  const time = timeString?.split(':') || []
  if (time.length !== 2) {
    return 0
  }
  const hours = +time[0]
  const minutes = +time[1]

  const hourCol = (hours - 8) * 12
  const minuteCol = Math.floor(minutes / 5)

  return hourCol + minuteCol + 12 + 1 // 12 is the first column (1 hour slot) + 1 for the first column
}
