<template>
	<div id="card" class="flex mx-auto border rounded-lg m-10 overflow-hidden">
		<form class="p-5 w-96 flex flex-col" @submit.prevent="login">
			<div class="flex-grow">
				<h3 class="text-4xl">Login</h3>
				<h3 class="text-sm text-gray-600">Sign in to your nontri account</h3>
				<input
					type="text"
					class="w-full my-5 p-3 border focus:shadow-lg"
					required
					v-model="username"
					placeholder="username"
				/>
				<input
					class="w-full p-3 mb-5 border focus:shadow-lg"
					type="password"
					required
					v-model="password"
					placeholder="password"
				/>
				<button
					class="
						py-2 px-6
						text-white text-lg
						rounded-md
						transition duration-500 ease-in-out bg-blue-500 hover:bg-blue-700 transform hover:scale-110
						"
					type="submit"
				>
					Login
				</button>
			</div>

			<footer class="text-xs">
				<h3>ทั้งหมดนี้ไม่ใช่เว็บของมหาลัยจริง</h3>
				<h3>
					KU-Table
					เป็นเพียงเว็บที่ทำเพื่อความสะดวกสบายด้วยการสร้างตารางเรียนให้นิสิต
					โดยใช้ข้อมูลจาก
					<a href="https://my.ku.th/" class="text-blue-500 hover:underline"
						>https://my.ku.th/</a
					>
				</h3>
			</footer>
		</form>
		<div>
			<img src="../assets/ku-table-high.jpg" alt="" />
		</div>
	</div>
</template>

<script>
export default {
	name: "Login",
	data: function() {
		return {
			username: "",
			password: ""
		};
	},
	methods: {
		login: function() {
			const data = {
				username: this.username,
				password: this.password
			};

			fetch("https://schedule-ku-server.herokuapp.com:8000/login", {
				method: "POST", // or 'PUT'
				//   mode: 'no-cors',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			})
				.then(response => response.json())
				.then(json => {
					console.log(json);
					localStorage.setItem("accesstoken", json.accesstoken);
					localStorage.setItem("stdId", json.user.student.stdId);
				})
				.then(() => {
					this.$emit("login");
					this.$router.push("/schedule");
				});
		}
	},
	mounted() {
		if (localStorage.getItem("accesstoken")) {
			this.$router.push("/schedule");
		}
	}
};
</script>

<style></style>
