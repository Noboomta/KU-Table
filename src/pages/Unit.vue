<template>
	<div class="flex justify-center container mx-auto items-center overflow-y-auto my-4">
		<spin-table-vue v-if="loading"></spin-table-vue>
		<div class="space-y-3 text-lg flex-wrap">
			<div class="border-2 m-1 p-3" v-for="(item, index) in units" :key="index">
				<a>{{ unitsName[index] }}</a>
				<a class="flex text-sm">{{ item.done }}/{{ item.need }}</a>
				<k-progress
					:percent="initProgress[index]"
					:status="initProgress[index] === 100 ? 'success' : 'warning'"
				></k-progress>
				<div
					class="flex flex-row space-x-4 text-xs items-baseline"
					v-for="(sub, index) in item.subjects"
					:key="index"
				>
					<div class="flex flex-row space-x-2">
						<a class="w-16">{{ sub.subject_code }}</a>
						<a class="w-36">{{ sub.subject_name_en }}</a>
						<a>{{ sub.credit }}</a>
					</div>
				</div>
			</div>
		</div>
		<div></div>
	</div>
</template>

<script>
import axios from '../http'
import spinTableVue from '../components/SpinTable.vue'

export default {
	name: 'Unit',
	components: {
		spinTableVue,
	},
	data() {
		return {
			a: '30',
			loading: true,
			isCheck: true,
			units: [],
			unitsName: [
				'Wellness',
				'Entrepreneurship',
				'Aesthetics',
				'Language and Communication',
				'Thai Citizen and Global Citizen',
			],
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
		}
	},
	created() {
		this.getUnit()
			.then(() => this.setProgress())
			.then(() => this.processInterval())
			.then(() => console.log(this.units))
			.then(() => this.units.forEach((item) => console.log(item.subjects)))
	},
	computed: {},
	methods: {
		processInterval() {
			// eslint-disable-next-line no-unused-vars
			setInterval(() => {
				this.initProgress = this.initProgress.map((item, index) => {
					if (item >= this.progress[index].percent) {
						this.progress[index].ifUp = false
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
				if (item.done < item.need) {
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
					this.units.push(data.Aesthetics)
					this.units.push(data.Language_and_Communication)
					this.units.push(data.Thai_Citizen_and_Global_Citizen)
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
