<template>
	<div class="flex mx-auto flex-grow items-center">
		<ul class="space-y-2 text-lg">
			<li v-for="(item, index) in units" :key="index">
				<p>{{ unitsName[index] }}</p>
				<k-progress
					:percent="initProgress[index]"
					:status="initProgress[index] === 100 ? 'success' : 'warning'"
				></k-progress>
			</li>
		</ul>
		<div></div>
	</div>
</template>

<script>
import axios from '../http'
export default {
	name: 'Unit',
	components: {},
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
	},
	computed: {},
	methods: {
		processInterval() {
			console.log(this.progress)
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
				this.progress[index].percent = (parseInt(item.done) / parseInt(item.need)) * 100
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
					// localStorage.clear('accesstoken')
					// localStorage.clear('authStatus')
					// location.reload()
					// this.$router.push('/login')
				})
				.finally(() => (this.loading = false))
		},
		// getPercentProcess(done, need){
		// 	console.log(done);
		// 	console.log(need);
		// 	return (parseInt(done)/parseInt(need))*100
		// }
	},
}
</script>

<style></style>
