<template>
	<div>
		<h1>Schedule</h1>
		<h1 v-for="(dt, index) in data" :key="index">{{dt.subject_name_en}}</h1>
		<div class="timetable"></div>
	</div>
</template>

<script>
export default {
	name: "Schedule",
	data(){
		return {
			data: []
		}
	},
	created() {
		this.getSchedule();
	},
	methods: {
		logout: function() {
			localStorage.removeItem("accesstoken");
			localStorage.removeItem("stdId");
			this.$router.push("/");
		},
		getSchedule: function() {
			fetch(
				`http://localhost:8000/getSchedule?stdId=${localStorage.getItem(
					"stdId"
				)}`,
				{
					headers: {
						"Content-Type": "application/json",
						'Accept': 'application/json',
						accesstoken: localStorage.getItem("accesstoken")
					}
				}
			)
				.then(response => response.json())
				.then(json => {
					console.log(json);
					this.data = json.data
				});
		}
	}
};
</script>

<style></style>
