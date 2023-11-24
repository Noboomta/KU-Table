<template>
	<footer
		class="
			text-xs
			p-5
			h-44
			items-center
			flex flex-col
			justify-center
			text-center
			bg-gray-300
			dark:bg-gray-800 dark:text-white
		"
	>
		<p class="font-bold text-lg mb-2">CONTACT US</p>
		<a href="https://github.com/Noboomta/schedule-ku" target="_blank">
			<img
				class="w-7 h-7 m-auto"
				src="../assets/github_logo.png"
				alt="github-logo"
				v-if="theme === 'light'"
			/>
			<img class="w-7 h-7 m-auto" src="../assets/github_logo_dark.png" alt="github-logo" v-else />
			<p>GitHub</p>
			<a
				class="font-bold mb-2 text-blue-500 dark:text-gray-200 underline"
				href="https://forms.gle/Kks5AEnYtGCTfueSA"
				>กดที่นี่เพื่อแจ้งปัญหา (เมลมาจะไวกว่าครับ puvana.s@ku.th)</a
			>
		</a>
		<span class="text-center mt-3">
			โปรเจคนี้สร้างมาเพื่ออำนวยความสะดวกต่อนิสิต
			<br />
			ไม่มีความต้องการจะดึงข้อมูลจากผู้ใช้แต่อย่างใด
		</span>
	</footer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'KuFooter',
	computed: {
		...mapGetters({ theme: 'theme/getTheme' }),
	},
}
</script>

<style></style>
