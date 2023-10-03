<template>
	<div class="mx-auto flex md:flex-grow items-center">
		<div class="md:flex border rounded-lg m-5 overflow-hidden dark:border-opacity-0">
			<spin-table-vue v-if="loading"></spin-table-vue>
			<form class="p-5 max-w-sm flex flex-col dark:bg-gray-800" @submit.prevent="login">
				<div class="md:flex-grow">
					<h3 class="text-4xl dark:text-green-300">Login</h3>
					<h3 class="text-sm text-gray-600 dark:text-white">Sign in to your nontri account</h3>
					<h3 class="text-sm text-gray-600 dark:text-white">
						**ตารางเรียนจะอัพเดทตามตารางล่าสุดในเว็บมหาลัย
					</h3>
					<input
						type="text"
						class="w-full my-5 p-3 border rounded"
						required
						v-model="username"
						placeholder="username"
						autocomplete="on"
					/>
					<input
						class="w-full p-3 mb-5 border rounded"
						type="password"
						required
						v-model="password"
						placeholder="password"
						autocomplete="on"
					/>
					<button
						class="
							py-2
							px-6
							text-white text-lg
							rounded-md
							transition
							duration-500
							ease-in-out
							bg-blue-500
							hover:bg-blue-700
							transform
							hover:scale-110
							mb-3
						"
						type="submit"
					>
						Login
					</button>
					<div class="mt-3" v-if="err">
						<p class="text-red-500" v-html="err" />
					</div>
				</div>

				<footer class="text-xs">
					<p class="font-bold dark:text-white">
						ทั้งหมดนี้ <span class="text-red-400">ไม่ใช่</span> เว็บของมหาลัยจริง
					</p>
					<p class="dark:text-white">
						KU-Table เป็นเพียงเว็บที่ทำเพื่อความสะดวกสบายด้วยการสร้างตารางเรียนให้นิสิต
						โดยใช้ข้อมูลจาก
						<a href="https://my.ku.th/" class="text-gray-200 hover:underline">https://my.ku.th/</a>
					</p>
				</footer>
			</form>
			<div>
				<img src="../assets/ku-table-high.jpg" alt="ku-table-high.jpg" class="hidden md:block" />
			</div>
		</div>
	</div>
</template>

<script>
import axios from '../http'
import spinTableVue from '../components/SpinTable.vue'
import { mapMutations } from 'vuex'

export default {
	name: 'Login',
	components: {
		spinTableVue,
	},
	data() {
		return {
			username: '',
			password: '',
			err: '',
			loading: false,
		}
	},
	methods: {
		...mapMutations('auth', ['authenticate']),
		login() {
			const data = {
				username: this.username,
				password: this.password,
			}
			this.loading = true
			axios
				.post('/login', data)
				.then((response) => {
					const { accesstoken, user } = response.data
					this.authenticate({
						studentInfo: {
							stdCode: user.student.stdCode,
							stdId: user.student.stdId,
							majorCode: user.student.majorCode,
						},
						accessToken: accesstoken,
					})
				})
				.catch((error) => {
					console.log(error)

					const errorCode = error.response.status
					if (errorCode === 500) {
						this.err =
							'เกิดข้อผิดพลาดในการล็อคอิน กรุณาลองล็อคอินที่ <a class="underline" href="https://my.ku.th">my.ku.th</a> ก่อนแล้วลองอีกครั้ง'
					} else {
						this.err = 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ.'
					}
				})
				.finally(() => (this.loading = false))
		},
	},
	mounted() {
		if (localStorage.getItem('accessToken')) {
			this.$router.push('/schedule')
		}
	},
}
</script>

<style></style>
