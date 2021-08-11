<template>
  <div>
    <nav class="h-16 flex items-center bg-green-500 px-5 justify-between z-10 fixed w-full">
      <div id="middle" class="h-16 flex items-center w-full justify-center absolute">
          <h1 class="font-bold text-gray-200 text-2xl">KU-Table</h1>
      </div>  
			<div id="left">
				<img src="../assets/ku-table.jpg" class="w-10 h-10" alt="KU-Logo" />
			</div>
			<div id="right" class="flex">
				<router-link
					class="m-3 text-gray-200 hover:text-white transition duration-300"
					to="/schedule"
					>Schedule</router-link
				>
				<div
					class="m-3 text-gray-200 hover:text-while transition duration-300 cursor-pointer"
					@click="checkLogin"
				>
					{{ buttonText }}
				</div>
			</div>
		</nav>
    <div class="h-16"></div>
    </div>
</template>

<script>
export default {
  name: "navbar",
  data() {
		return {
			authStatus: false
		};
	},
	computed: {
		buttonText() {
			return this.authStatus ? "Logout" : "Login";
		}
	},
	created() {
		if (localStorage.getItem("accesstoken")) {
			this.authStatus = true;
		}
	},
	methods: {
		checkLogin: function() {
			if (this.authStatus) {
				localStorage.removeItem("accesstoken");
				localStorage.removeItem("stdId");
				this.authStatus = false;
				this.$router.push("/login");
			} else {
				if (this.$route.path != "/login") {
					this.$router.push("/login");
				}
			}
		}
	}
};
</script>

<style>
nav {
	box-shadow: 0px 4px 4px 0px #00000040;
}
</style>