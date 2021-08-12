<template>
	<div class="flex mx-auto border rounded-lg m-10 overflow-hidden">
		<spin-table-vue v-if="loading"></spin-table-vue>
		<form class="p-5 w-96 flex flex-col" @submit.prevent="login">
			<div class="flex-grow">
				<h3 class="text-4xl">Login</h3>
				<h3 class="text-sm text-gray-600">Sign in to your nontri account</h3>
				<input
					type="text"
					class="w-full my-5 p-3 border rounded"
					required
					v-model="username"
					placeholder="username"
				/>
				<input
					class="w-full p-3 mb-5 border rounded"
					type="password"
					required
					v-model="password"
					placeholder="password"
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
					"
					type="submit"
				>
					Login
				</button>
				<div class="mt-3" v-if="err">
					<h1 class="text-red-500">ลอคอินไม่ได้จ้า</h1>
				</div>
			</div>

			<footer class="text-xs">
				<h3 class="font-bold">
					ทั้งหมดนี้<span class="text-red-400">ไม่ใช่</span>เว็บของมหาลัยจริง
				</h3>
				<h3>
					KU-Table เป็นเพียงเว็บที่ทำเพื่อความสะดวกสบายด้วยการสร้างตารางเรียนให้นิสิต
					โดยใช้ข้อมูลจาก
					<a href="https://my.ku.th/" class="text-blue-500 hover:underline">https://my.ku.th/</a>
				</h3>
			</footer>
		</form>
		<div>
			<img src="../assets/ku-table-high.jpg" alt="ku-table-high.jpg" />
		</div>
	</div>
</template>

<script>
import axios from '../http'
import spinTableVue from '../components/SpinTable.vue'

export default {
	name: 'Login',
	components: {
		spinTableVue,
	},
	data() {
		return {
			username: '',
			password: '',
			err: false,
			loading: false,
		}
	},
	methods: {
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
					localStorage.setItem('accesstoken', accesstoken)
					localStorage.setItem('stdId', user.student.stdId)
				})
				.then(() => {
					this.$emit('login')
					localStorage.setItem('authStatus', true)
					this.$router.push('/schedule')
				})
				.catch((error) => {
					console.log(error)
					this.err = true
				})
				.finally(() => (this.loading = false))
		},
	},
	mounted() {
		if (localStorage.getItem('authStatus') == false) {
			this.$router.push('/schedule')
		}
	},
}
</script>

<style></style>
