<template>
  <div id="app">
    <nav class="h-16 flex items-center bg-green-500 px-5 justify-between">
      <div id="left">
        <img src="./assets/ku-table.jpg" class="w-10 h-10" alt="KU-Logo">
      </div>
      <div id="middle">
        <h1 class="font-bold text-gray-200 text-2xl">KU-Table</h1>
      </div>
      <div id="right" class="flex">
				<router-link class="m-3 text-gray-200 hover:text-white transition duration-300" to="/schedule">Schedule</router-link>
        <div class="m-3 text-gray-200 hover:text-while transition duration-300 cursor-pointer" @click="checkLogin">{{buttonText}}</div>
      </div>
    </nav>
    <div class="flex-grow flex flex-col">
    <router-view @login="authStatus = true" />
    </div>
    <footer class="text-xs px-5 h-44 items-center flex flex-col justify-center bg-gray-500">
			<a href="https://github.com/Noboomta/schedule-ku" target="_blank"><img class="w-7 h-7" src="./assets/github_logo.png" alt="github-logo"></a>
		</footer>
  </div>
</template>


<script>
export default {
    data() {
      return {
        authStatus: false
      }
    },
    computed: {
        buttonText(){
            return this.authStatus ? "Logout" : "Login"
        }
    },
    created() {
				if( localStorage.getItem("accesstoken") ){
          this.authStatus = true
        }
    },
    methods: {
      checkLogin: function() {
        if(this.authStatus){
            localStorage.removeItem("accesstoken")
            localStorage.removeItem("stdId")
            this.authStatus = false
            this.$router.push("/login")
        }
        else{
						if(this.$route.path != '/login'){
								this.$router.push('/login')
						}
        }
      }
    }
}
</script>


<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

</style>
