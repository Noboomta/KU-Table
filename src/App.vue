<template>
	<div id="app">
		<navbar></navbar>
		<div class="flex-grow flex flex-col">
			<router-view @login="authStatus = true" />
		</div>
		<ku-footer></ku-footer>
	</div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import KuFooter from './components/KuFooter.vue'

export default {
	components: {
		Navbar,
		KuFooter
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
