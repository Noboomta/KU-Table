<template>
	<div>
		<spin-table-vue v-if="loading"></spin-table-vue>
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
								<input type="checkbox" id="toggleB" class="sr-only" v-model="isCheck" />
								<!-- line -->
								<div
									v-if="isCheck"
									class="block bg-gray-300 dark:bg-gray-600 w-12 h-7 sm:w-14 sm:h-8 rounded-full"
								></div>
								<div
									v-else
									class="block bg-gray-200 dark:bg-gray-600 w-12 h-7 sm:w-14 sm:h-8 rounded-full"
								></div>
								<!-- dot -->
								<div
									class="dot absolute left-1 top-1 bg-white w-5 h-5 sm:w-6 sm:h-6 rounded-full transition"
								></div>
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
			<div class="overflow-x-auto border mx-1 rounded-lg" ref="printcontent">
				<div class="overflow-x-hidden table-w" id="table">
					<div class="grid grid-cols-168">
						<div
							class="border py-1 pl-1 col-span-12 dark:text-white dark:border-gray-700"
							v-for="(header, headerIndex) in headers"
							:key="`header-${headerIndex}`"
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
							class="border p-2 md:px-3 md:py-2 rounded text-xs md:text-sm bg-opacity-60 flex flex-col justify-between hover:bg-opacity-70 overflow-hidden cursor-pointer dark:bg-opacity-100 dark:border-gray-700"
							:class="`col-start-${course.startCol} col-end-${course.endCol}
							${getColorByDate(date)}`"
							v-for="(course, courseIndex) in mappedCourses[date]"
							:key="`course-${courseIndex}`"
						>
							<div class="mb-2">
								<p>{{ course.subject_code }}</p>
								<p>[{{ course.time_from }} - {{ course.time_to }}]</p>
							</div>
							<p v-if="isCheck">{{ course.subject_name_en }}</p>
							<p v-else>{{ course.subject_name_th }}</p>
							<div class="text-gray-700 text-xs">
								<p v-if="isCheck">{{ course.room_name_en }} | {{ course.section_type_en }} {{ course.section_code }}</p>
								<p v-else>{{ course.room_name_th }} | {{ course.section_type_th }} {{ course.section_code }}</p>
							</div>
						</div>
					</div>
				</div>
				<span class="hidden" id="create-by"
					>created by
					<a href="https://ku-table.vercel.app" class="text-blue-600 underline"
						>https://ku-table.vercel.app
					</a>
				</span>
			</div>
			<unit class="dark:text-white" :lang="isCheck" />
		</div>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import axios from '../http'
import SpinTableVue from '../components/SpinTable.vue'
import Unit from '../components/Unit.vue'
export default {
	name: 'Schedule',
	components: {
		SpinTableVue,
		Unit,
	},
	data() {
		return {
			loading: false,
			courses: [],
			period_date: '',
			headers: [
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
			],
			isCheck: true,
		}
	},
	mounted() {
		this.getSchedule()
	},
	computed: {
		...mapGetters({ theme: 'theme/getTheme' }),
		...mapState('auth', ['studentInfo']),
		orderedDate() {
			return ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
		},
		mappedCourses() {
			if (Array.isArray(this.courses)) {
				return this.courses.reduce((acc, course) => {
					const dayKey = course.day_w.trim()
					const mappedCourse = {
						startCol: this.timeToCol(course.time_from),
						endCol: this.timeToCol(course.time_to),
						...course,
					}
					if (dayKey in acc) {
						acc[dayKey].push(mappedCourse)
					} else {
						acc[dayKey] = [mappedCourse]
					}
					return acc
				}, {})
			}
			return ''
		},
	},
	methods: {
		...mapMutations('auth', ['clearAuthData']),
		async download() {
			const el = this.$refs.printcontent
			const createBy = el.lastElementChild
			createBy.className = 'mx-1 text-right block dark:text-white'
			const options = {
				type: 'dataURL',
				windowWidth: '2560px',
			}
			if (this.theme === 'dark') {
				options.backgroundColor = '#111827'
			}
			const printCanvas = await this.$html2canvas(el, options)
			const link = document.createElement('a')
			link.setAttribute('download', 'ku-table.png')
			link.setAttribute('href', printCanvas)
			link.className = 'dark:text-white'
			link.click()
			createBy.className = 'hidden'
		},
		timeToCol(timeString) {
			const time = timeString?.split(':') || []
			if (time.length != 2) {
				return 0
			}
			const hours = +time[0]
			const minutes = +time[1]

			const hourCol = (hours - 8) * 12
			const minuteCol = Math.floor(minutes / 5)

			return hourCol + minuteCol + 12 + 1 // 12 is the first column (1 hour slot) + 1 for the first column
		},
		logout() {
			localStorage.removeItem('accesstoken')
			localStorage.removeItem('stdId')
			this.$router.push('/')
		},
		getColorByDate(date) {
			const color = {
				MON: 'bg-yellow-200',
				TUE: 'bg-pink-400',
				WED: 'bg-green-400',
				THU: 'bg-yellow-400',
				FRI: 'bg-blue-400',
				SAT: 'bg-purple-400',
				SUN: 'bg-red-400',
			}
			return color[date]
		},
		getSchedule() {
			this.loading = true
			axios
				.get('/getSchedule', {
					params: {
						stdId: this.studentInfo.stdId,
					},
				})
				.then((response) => {
					const { data } = response
					this.courses = data.course
					this.period_date = data.peroid_date
				})
				.catch((error) => {
					console.log(error)
					this.clearAuthData()
				})
				.finally(() => {
					this.loading = false
				})
		},
	},
}
</script>

<style>
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
