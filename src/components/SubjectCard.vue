<template>
	<h1>{{subject_name_th}}</h1>
</template>

<script>
export default {
	name: "SubjectCard",
	props: {
		coure: {
			type: Object
		}
	},
	// USE THIS
	// data() {
	// 	return {
	// 		section_id: Number,
	//     weekstartday: "",
	//     weekendday: "",
	//     subject_code: "",
	//     subject_name_th: "",
	//     subject_name_en: "",
	//     section_code: "",
	//     section_type_th: "",
	//     section_type_en: "",
	//     teacher_name: "",
	//     time_from: "",
	//     time_to: "",
	//     day_w: ""
	// 	}
	// }
}
</script>

<style>

</style>
