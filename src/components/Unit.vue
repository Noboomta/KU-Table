<template>
	<div v-if="!data">
		<h1 class="pl-2 font-bold text-4xl mb-6 mt-6">KU GenEd</h1>

		<div class="text-red-500 text-xl flex container mx-auto justify-center">
			<div class="text-center m-2">
				<span class="text-center" v-if="lang">
					Sorry, we don't have information about your faculty department ({{ major }}) at this
					moment.
				</span>
				<span class="text-center" v-else>
					ขออภัย ทางเรายังไม่มีข้อมูลเกี่ยวกับคณะ ({{ major }}) ของท่านในตอนนี้ครับ
				</span>
			</div>
		</div>
	</div>
	<div v-else class="container mx-auto items-center overflow-y-auto my-4 mt-10">
		<h1 class="pl-2 font-bold text-4xl mb-6">KU GenEd ({{ major }})</h1>
		<spin-table-vue v-if="loading"></spin-table-vue>
		<div class="space-y-3 text-lg container mx-auto">
			<div class="border-2 m-1 p-3" v-for="(item, index) in units" :key="index">
				<div class="flex flex-col md:flex-row justify-between text-2xl">
					<span v-if="lang">{{ unitsName.en[index] }}</span>
					<span v-else>{{ unitsName.th[index] }}</span>
					<span class="text-lg">{{ item.done }}/{{ item.need }} units</span>
				</div>
				<k-progress
					class="no-gap text-xl"
					:percent="initProgress[index]"
					:status="initProgress[index] === 100 ? 'success' : 'warning'"
				></k-progress>
				<table class="table-auto space-x-2 w-full mr-3">
					<tbody>
						<tr class="text-base md:text-lg" v-for="(sub, index) in item.subjects" :key="index">
							<td class="w-1/12 pr-2">{{ sub.subject_code }}</td>
							<td v-if="lang" class="w-10/12">{{ sub.subject_name_en }}</td>
							<td v-else class="w-10/12">{{ sub.subject_name_th }}</td>
							<td class="w-1/12 text-right">{{ sub.credit }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div></div>
	</div>
</template>

<script>
import axios from '../http'
import spinTableVue from './SpinTable.vue'

export default {
	name: 'Unit',
	props: ['lang'],
	components: {
		spinTableVue,
	},
	data() {
		return {
			a: '30',
			loading: true,
			isCheck: true,
			units: [],
			unitsName: {
				en: [
					'Wellness',
					'Entrepreneurship',
					'Thai Citizen and Global Citizen',
					'Language and Communication',
					'Aesthetics',
				],
				th: [
					'กลุ่มสาระอยู่ดีมีสุข',
					'กลุ่มสาระศาสตร์แห่งผู้ประกอบการ',
					'กลุ่มสาระพลเมืองไทยและพลเมืองโลก',
					'กลุ่มสาระภาษากับการสื่อสาร',
					'กลุ่มสาระสุนทรียศาสตร์',
				],
			},
			initProgress: [0, 0, 0, 0, 0],

			subjects: [],

			progress: [
				{ percent: 0, ifUp: 'true' },
				{ percent: 0, ifUp: 'true' },
				{ percent: 0, ifUp: 'true' },
				{ percent: 0, ifUp: 'true' },
				{ percent: 0, ifUp: 'true' },
			],

			progressBarColor: [],

			counter: 0,

			data: true,

			major: '',
		}
	},
	created() {
		this.getUnit()
			.then(() => this.setProgress())
			.then(() => this.processInterval())
			.then(() => (this.major = localStorage.getItem('majorCode')))
		console.log(localStorage.getItem('majorCode'))
	},
	computed: {},
	methods: {
		processInterval() {
			const timer = setInterval(() => {
				this.initProgress = this.initProgress.map((item, index) => {
					if (this.counter === 300) {
						clearInterval(timer)
					}
					if (item >= this.progress[index].percent) {
						this.progress[index].ifUp = false
						this.counter += 1
						return item
					}
					if (this.progress[index].ifUp) {
						return item + 1
					}
				})
			}, 20)
		},

		setProgress() {
			this.units.forEach((item, index) => {
				if (item.need == 0) this.data = false
				else if (item.done < item.need) {
					this.progress[index].percent = (parseInt(item.done) / parseInt(item.need)) * 100
				} else {
					this.progress[index].percent = 100
				}
			})
		},

		logout() {
			localStorage.removeItem('accesstoken')
			localStorage.removeItem('stdId')
			this.$router.push('/')
		},

		getUnit() {
			this.loading = true
			return axios
				.get('/getGenEd', {
					headers: {
						accesstoken: localStorage.getItem('accesstoken'),
					},
					params: {
						stdCode: localStorage.getItem('stdCode'),
						majorCode: localStorage.getItem('majorCode'),
					},
				})
				.then((response) => {
					const { data } = response
					this.units.push(data.Wellness)
					this.units.push(data.Entrepreneurship)
					this.units.push(data.Thai_Citizen_and_Global_Citizen)
					this.units.push(data.Language_and_Communication)
					this.units.push(data.Aesthetics)
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

<style></style>
