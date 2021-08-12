<template>
	<div class="flex mx-auto m-10 overflow-hidden">
		<div class="p-5 flex flex-col justify-center w-96">
			<h1 class="text-7xl mb-5">ERROR</h1>
			<h2 class="text-9xl mb-5">404</h2>
			<h1 class="text-4xl mb-5">Page not found</h1>
			<button
					class="
						py-2 px-6
						mr-28 mt-5
						text-white text-2xl
						rounded-md
						transition duration-500 ease-in-out bg-blue-500 hover:bg-blue-700 transform hover:scale-110
						"
					@click="back"
				>Main Page
			</button>
		</div>
		<div>
			<img src="../assets/404page.jpg" alt="404-page-table" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'NotFoundPage',
	methods: {
		back() {
			this.$router.push('/login')
		}
	},
}
</script>

<style></style>
