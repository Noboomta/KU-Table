<template>
	<div class="container mx-auto items-center overflow-y-auto my-4 mt-10">
		<div class="flex flex-wrap items-baseline mb-2 space-x-2">
			<h1 class="font-bold text-4xl inline-block">KU GenEd</h1>
			<h1 class="text-4xl font-bold inline-block" v-if="!loading">({{ major }})</h1>
			<p class="mb-2">
				**กำลังแสดงหลักสูตรปี {{ unitYear }} หากจำนวนหน่วยกิตไม่ถูกต้อง โปรด
				<a class="underline" href="https://forms.gle/HJw8KFbKpuN3RrxE6">กรอกฟอร์ม</a>
				เพื่อแจ้งให้เพิ่ม
			</p>
		</div>
		<div class="container text-sm font-bold mx-auto p-2 text-red-500">
			<div v-if="major" class="mb-2">
				<span class="text-center" v-if="lang">
					**Sorry, we don't have information about your faculty department. you can
					<a class="underline" href="https://forms.gle/xPs2cc2xxWnGiTvY6">fill form here.</a>
				</span>
				<span class="text-center" v-else>
					**ขออภัย ทางเรายังไม่มีข้อมูลเกี่ยวกับคณะ ({{ major }}) ของท่าน กรุณากรอก
					<a class="underline" href="https://forms.gle/xPs2cc2xxWnGiTvY6">ฟอร์มขอเพิ่มหมวด</a>
				</span>
			</div>

			<span v-if="!lang">
				**โปรดตรวจสอบข้อมูลเงื่อนไขการลงทะเบียนของท่านอีกครั้ง
				อาจมีเงื่อนไขแตกต่างกันออกไปในแต่ละสาขาและชั้นปีครับ</span
			>
			<span v-else>
				**Please check your registration conditions again. There may be different conditions for
				each department and year.</span
			>
		</div>
		<spin-table-vue v-if="loading"></spin-table-vue>
		<div class="space-y-3 text-lg container mx-auto">
			<div class="border-2 m-1 p-3 rounded-md" v-for="(item, index) in units" :key="index">
				<div class="flex flex-col md:flex-row justify-between text-2xl">
					<span v-if="lang">{{ unitsName.en[index] }}</span>
					<span v-else>{{ unitsName.th[index] }}</span>
					<span class="text-lg">{{ item.done }}/{{ item.need }} units</span>
				</div>
				<k-progress
					class="no-gap text-xl dark:text-gray-300"
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
			<div class="container mx-auto flex text-center pl-2 text-xs md:text-lg">
				<span v-if="lang" class="">More information: </span>
				<span v-else class="">หมายเหตุ: </span>
				<a
					class="text-blue-700 dark:text-gray-200 pl-1 underline"
					href="https://www.ku.ac.th/th/bachelor-degree"
					>https://www.ku.ac.th/th/bachelor-degree</a
				>
				หรือ
				<a class="text-blue-700" href="https://registrar.ku.ac.th/cur/all"
					>https://registrar.ku.ac.th/cur/all</a
				>
			</div>
		</div>
		<div></div>
	</div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
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
			unitYear: 0,
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
	async mounted() {
		await this.getUnit()

		this.major = JSON.parse(localStorage.getItem('studentInfo'))?.majorCode

		this.setProgress()

		this.processInterval()
	},
	computed: {
		...mapState('auth', ['studentInfo']),
	},
	methods: {
		...mapMutations('auth', ['clearAuthData']),
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
					params: {
						stdCode: this.studentInfo.stdCode,
						majorCode: this.studentInfo.majorCode,
					},
				})
				.then((response) => {
					const { data } = response
					this.unitYear = data.unitYear
					this.units.push(data.Wellness)
					this.units.push(data.Entrepreneurship)
					this.units.push(data.Thai_Citizen_and_Global_Citizen)
					this.units.push(data.Language_and_Communication)
					this.units.push(data.Aesthetics)
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

<style></style>
