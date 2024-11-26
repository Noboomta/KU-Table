<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import SpinTableVue from '../components/SpinTable.vue'
import Unit from '../components/UnitSection.vue'
import html2canvas from 'html2canvas'
import type { Options } from 'html2canvas'
import appendCopyright from '@/utils/appendCopyright'
import getScheduleData from '@/service/api/getScheduleData'

const store = useStore()
const theme = computed(() => store.getters['theme/getTheme'])
const studentInfo = computed(() => store.state.auth.studentInfo)

const printcontent = ref<HTMLElement>(null!)
const loading = ref(false)
const courses = ref<any[]>([])
const period_date = ref('')
const headers = ref([
  'Day/Time',
  '8:00',
  '9:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
])
const isCheck = ref(true)

const orderedDate = computed(() => ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'])

const mappedCourses = computed(() => {
  if (Array.isArray(courses.value)) {
    return courses.value.reduce(
      (acc, course) => {
        const dayKey = course.day_w.trim()
        const mappedCourse = {
          startCol: timeToCol(course.time_from),
          endCol: timeToCol(course.time_to),
          ...course,
        }
        if (dayKey in acc) {
          acc[dayKey].push(mappedCourse)
        } else {
          acc[dayKey] = [mappedCourse]
        }
        return acc
      },
      {} as Record<string, any[]>
    )
  }
  return ''
})

const savePhoto = (base64: string) => {
  const link = document.createElement('a')
  link.setAttribute('download', 'ku-table.png')
  link.setAttribute('href', base64)
  link.click()
}

const download = async () => {
  const options: Partial<Options> = {
    windowWidth: 2560,
    onclone: (_, element) => {
      appendCopyright(element)
    },
  }
  if (theme.value === 'dark') {
    options.backgroundColor = '#111827'
  }

  const printCanvas = await html2canvas(printcontent.value, options)

  savePhoto(printCanvas.toDataURL())
}

const timeToCol = (timeString: string) => {
  const time = timeString?.split(':') || []
  if (time.length != 2) {
    return 0
  }
  const hours = +time[0]
  const minutes = +time[1]

  const hourCol = (hours - 8) * 12
  const minuteCol = Math.floor(minutes / 5)

  return hourCol + minuteCol + 12 + 1 // 12 is the first column (1 hour slot) + 1 for the first column
}

const getColorByDate = (date: string) => {
  const color: Record<string, string> = {
    MON: 'bg-yellow-200',
    TUE: 'bg-pink-400',
    WED: 'bg-green-400',
    THU: 'bg-yellow-400',
    FRI: 'bg-blue-400',
    SAT: 'bg-purple-400',
    SUN: 'bg-red-400',
  }
  return color[date]
}

const getSchedule = async () => {
  loading.value = true

  try {
    const data = await getScheduleData(studentInfo.value.stdId)

    courses.value = data.course
    period_date.value = data.peroid_date
  } catch {
    store.commit('auth/clearAuthData')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getSchedule()
})
</script>
<template>
  <div>
    <spin-table-vue v-if="loading" />
    <div class="mx-auto container pt-7 pb-10">
      <div id="top" class="mx-2 flex flex-wrap justify-between">
        <div>
          <h1 class="text-4xl font-bold mb-2 md:mb-0 mr-5 inline-block align-top dark:text-white">
            Schedule
            <p class="md:text-xl text-sm font-normal text-gray-600 dark:text-white">
              Period: {{ period_date }}
            </p>
          </h1>
        </div>
        <div class="flex justify-between w-full sm:w-auto">
          <span class="align-top">
            <label for="toggleB" class="flex items-center cursor-pointer">
              <div class="mr-3 hidden sm:block text-gray-700 dark:text-gray-200 text-sm xs:text-md">
                TH
              </div>
              <!-- toggle -->
              <div class="relative">
                <!-- input -->
                <input id="toggleB" v-model="isCheck" type="checkbox" class="sr-only" />
                <!-- line -->
                <div
                  v-if="isCheck"
                  class="block bg-gray-300 dark:bg-gray-600 w-12 h-7 sm:w-14 sm:h-8 rounded-full"
                />
                <div
                  v-else
                  class="block bg-gray-200 dark:bg-gray-600 w-12 h-7 sm:w-14 sm:h-8 rounded-full"
                />
                <!-- dot -->
                <div
                  class="dot absolute left-1 top-1 bg-white w-5 h-5 sm:w-6 sm:h-6 rounded-full transition"
                />
              </div>
              <!-- label -->
              <div class="ml-3 mr-4 text-gray-700 dark:text-gray-200 text-sm xs:text-md">EN</div>
            </label>
          </span>
          <div class="text-center mr-2 mb-5">
            <button
              class="block border border-green-500 rounded px-3 py-1 text-green-500 hover:bg-gray-100 text-md lg:text-lg"
              @click.prevent="download"
            >
              <font-awesome-icon icon="download" />
              Save as PNG
            </button>
          </div>
        </div>
      </div>
      <div id="print-content" ref="printcontent" class="overflow-x-auto border mx-1 rounded-lg">
        <div id="table" class="overflow-x-hidden table-w">
          <div class="grid grid-cols-168">
            <div
              v-for="(header, headerIndex) in headers"
              :key="`header-${headerIndex}`"
              class="border py-1 pl-1 col-span-12 dark:text-white dark:border-gray-700"
            >
              {{ header }}
            </div>
          </div>
          <div
            v-for="(date, dateIndex) in orderedDate"
            :key="`date-${dateIndex}`"
            class="grid grid-cols-168 min-h-16 md:min-h-24 border dark:border-gray-700"
          >
            <div
              class="p-1 md:p-3 col-span-12 border-r-2 dark:border-gray-700"
              :class="`${getColorByDate(date)}`"
            >
              <span class="font-bold dark:text-gray-900">{{ date }}</span>
            </div>
            <div
              v-for="(course, courseIndex) in mappedCourses[date]"
              :key="`course-${courseIndex}`"
              class="border p-2 md:px-3 md:py-2 rounded text-xs md:text-sm bg-opacity-60 flex flex-col justify-between hover:bg-opacity-70 overflow-hidden cursor-pointer dark:bg-opacity-100 dark:border-gray-700"
              :class="`col-start-${course.startCol} col-end-${course.endCol}
							${getColorByDate(date)}`"
            >
              <div class="mb-2">
                <p class="truncate">[{{ course.time_from }}-{{ course.time_to }}]</p>
                <p class="truncate">
                  {{ course.subject_code }}
                </p>
              </div>
              <p v-if="isCheck" class="truncate">
                {{ course.subject_name_en }}
              </p>
              <p v-else class="truncate">
                {{ course.subject_name_th }}
              </p>
              <div class="text-gray-700 text-xs">
                <p v-if="isCheck" class="truncate">
                  {{ course.room_name_en }} | {{ course.section_type_en }} {{ course.section_code }}
                </p>
                <p v-else class="truncate">
                  {{ course.room_name_th }} | {{ course.section_type_th }} {{ course.section_code }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <unit class="dark:text-white" :lang="isCheck" />
    </div>
  </div>
</template>

<style scoped>
button:active {
  -moz-box-shadow: inset 0 0 2px gray;
  -webkit-box-shadow: inset 0 0 2px gray;
  box-shadow: inset 0 0 2px gray;
}
/* Toggle B */
input:checked ~ .dot {
  transform: translateX(100%);
  @apply bg-green-400;
}
.table-w {
  min-width: 1000px;
}
</style>
