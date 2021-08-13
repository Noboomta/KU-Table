<template>
	<div>
		<spin-table-vue v-if="loading"></spin-table-vue>
		<div class="pt-7 pb-10 container mx-auto">
			<div id="top" class="mb-5 mx-2 flex flex-wrap justify-between">
				<div>
					<h1 class="text-4xl font-bold mb-2 md:mb-0 mr-5 inline-block align-bottom">Schedule</h1>
				</div>
				<div class="md:flex">
					<label for="toggleB" class="flex items-center cursor-pointer">
						<div class="mr-3 text-gray-700 text-md">TH</div>
						<!-- toggle -->
						<div class="relative">
							<!-- input -->
							<input type="checkbox" id="toggleB" class="sr-only" v-model="isCheck" />
							<!-- line -->
							<div v-if="isCheck" class="block bg-gray-300 w-14 h-8 rounded-full"></div>
							<div v-else class="block bg-gray-200 w-14 h-8 rounded-full"></div>
							<!-- dot -->
							<div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
						</div>
						<!-- label -->
						<div class="ml-3 mr-4 text-gray-700 text-md">EN</div>
						<button
							class="
								border border-green-500
								rounded
								px-3
								py-1
								text-green-500
								hover:bg-gray-100
								text-lg
							"
							@click.prevent="download"
						>
							<font-awesome-icon icon="download" />
							save as PNG
						</button>
					</label>
				</div>
			</div>
			<div class="overflow-x-auto border rounded-lg" ref="printcontent">
				<div class="overflow-x-hidden min-w-1000" id="table">
					<div class="grid grid-cols-13">
						<div
							class="border py-1"
							v-for="(header, headerIndex) in headers"
							:key="`header-${headerIndex}`"
						>
							{{ header }}
						</div>
					</div>
					<div
						v-for="(date, dateIndex) in orderedDate"
						:key="`date-${dateIndex}`"
						class="grid grid-cols-13 min-h-20 md:min-h-24 border"
					>
						<div class="p-3 col-span-1 border-r-2" :class="`${getColorByDate(date)}`">
							<span class="font-bold">{{ date }}</span>
						</div>
						<div
							class="
								border
								p-3
								rounded
								text-sm
								bg-opacity-60
								flex flex-col
								justify-between
								hover:bg-opacity-70
								overflow-hidden
								cursor-pointer
							"
							:class="`my-col-start-${course.startCol} my-col-end-${course.endCol}
							${getColorByDate(date)}`"
							v-for="(course, courseIndex) in mappedCourses[date]"
							:key="`course-${courseIndex}`"
						>
							<p class="flex flex-wrap justify-between mb-2">
								<span>{{ course.subject_code }}</span>
								<span>({{ course.time_from }} - {{ course.time_to }})</span>
							</p>
							<p v-if="isCheck">{{ course.subject_name_en }}</p>
							<p v-else>{{ course.subject_name_th }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from '../http'
import SpinTableVue from '../components/SpinTable.vue'
export default {
	name: 'Schedule',
	components: {
		SpinTableVue,
	},
	data() {
		return {
			loading: false,
			courses: [],
			headers: ['', 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
			isCheck: false,
		}
	},
	created() {
		this.getSchedule()
	},
	computed: {
		orderedDate() {
			return ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
		},
		mappedCourses() {
			if (Array.isArray(this.courses)) {
				return this.courses.reduce((acc, course) => {
					const dayKey = course.day_w.trim()
					const mappedCourse = {
						startCol: +course.time_from.split(':')[0] - 6,
						endCol: +course.time_to.split(':')[0] - 6,
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
		async download() {
			const el = this.$refs.printcontent
			const createBy = document.createElement('div')
			createBy.innerHTML = 'Created by KU-Table '
			createBy.style.textAlign = 'right'
			createBy.className = 'temp-link'
			const kuShareLink = document.createElement('a')
			kuShareLink.className = 'text-blue-500 px-1'
			kuShareLink.innerHTML = 'https://schedule-ku.vercel.app'
			kuShareLink.setAttribute('href', 'https://schedule-ku.vercel.app')
			createBy.appendChild(kuShareLink)
			el.appendChild(createBy)
			const options = {
				type: 'dataURL',
				windowWidth: '2560px',
			}

			const printCanvas = await this.$html2canvas(el, options)
			const link = document.createElement('a')
			link.setAttribute('download', 'ku-table.png')
			link.setAttribute('href', printCanvas)
			link.click()
			createBy.id = 'temp-link'
			document.getElementById('temp-link').remove()
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
			// console.log(lo)
			axios
				.get('/getSchedule', {
					headers: {
						accesstoken: localStorage.getItem('accesstoken'),
					},
					params: {
						stdId: localStorage.getItem('stdId'),
					},
				})
				.then((response) => {
					console.log(this.loading)
					const { data } = response
					this.courses = data
				})
				.catch(() => {
					localStorage.clear('accesstoken')
					localStorage.clear('authStatus')
					location.reload()
					this.$router.push('/login')
				})
				.finally(() => (this.loading = false))
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
</style>
