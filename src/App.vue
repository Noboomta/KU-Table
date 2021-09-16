<template>
	<div id="app" class="bg-white dark:bg-gray-900">
		<div>
			<nav
				class="
					h-16
					flex
					items-center
					bg-green-500
					dark:bg-gray-800
					px-5
					justify-between
					z-10
					fixed
					w-full
				"
			>
				<div id="middle" class="h-16 flex items-center m-auto justify-center absolute">
					<h1 class="font-bold text-gray-200 dark:text-green-300 text-2xl">KU-Table</h1>
				</div>
				<div id="left">
					<router-link to="/schedule">
						<img src="./assets/ku-table.jpg" class="w-10 h-10" alt="KU-Logo" />
					</router-link>
				</div>
				<div id="right" class="flex">
					<a
						href="#"
						class="
							m-3
							text-gray-200
							dark:text-green-300
							hover:text-white
							dark:hover:text-white
							transition
							duration-300
						"
						@click.prevent="toggleTheme"
					>
						<font-awesome-icon icon="moon" v-if="theme === 'light'" />
						<font-awesome-icon icon="sun" v-else />
					</a>
					<div
						class="
							m-3
							text-gray-200
							dark:text-green-300
							hover:text-white
							dark:hover:text-white
							transition
							duration-300
							cursor-pointer
						"
						@click="checkLogin"
					>
						{{ buttonText }}
					</div>
				</div>
			</nav>
			<div class="h-16"></div>
		</div>
		<div class="flex-grow flex flex-col">
			<router-view @login="authStatus = true" />
		</div>
		<ku-footer></ku-footer>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import KuFooter from '@/components/KuFooter.vue'

export default {
	components: {
		KuFooter,
	},
	name: 'navbar',
	data() {
		return {
			authStatus: false,
		}
	},
	beforeMount() {
		this.$store.dispatch('init_theme')
	},
	computed: {
		buttonText() {
			return this.authStatus ? 'Logout' : 'Login'
		},
		...mapGetters({ theme: 'getTheme' }),
	},
	watch: {
		theme(newTheme) {
			newTheme === 'light'
				? document.querySelector('html').classList.remove('dark')
				: document.querySelector('html').classList.add('dark')
		},
	},
	created() {
		if (localStorage.getItem('authStatus')) {
			this.authStatus = true
		}
	},
	methods: {
		toggleAuthStatus() {
			this.authStatus = !this.authStatus
		},
		checkLogin() {
			if (this.authStatus) {
				localStorage.removeItem('accesstoken')
				localStorage.removeItem('stdId')
				localStorage.setItem('authStatus', false)
				this.authStatus = false
				this.$router.push('/login')
			} else {
				if (this.$route.path != '/login') {
					this.$router.push('/login')
				}
			}
		},
		toggleTheme() {
			this.$store.dispatch('toggle_theme')
		},
	},
}
</script>

<style>
#app {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	transition: all 0.5s;
}
nav {
	box-shadow: 0px 4px 4px 0px #00000040;
}
#middle {
	left: 50%;
	transform: translateX(-50%);
}
</style>
