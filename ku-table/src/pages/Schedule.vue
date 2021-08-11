<template>
	<div class="py-10 container mx-auto">
		<h1 class="text-2xl mb-5">Schedule</h1>
		<div class="overflow-x-auto border rounded-lg">
			<div class="overflow-x-hidden min-w-1000" id="table">
				<div class="grid grid-cols-13">
					<div
						class="border py-1"
						v-for="(header, headerIndex) in headers"
						:key="`header-${headerIndex}`"
					>
						{{ header }}
					</div>
				</div>
				<div
					v-for="(date, dateIndex) in orderedDate"
					:key="`date-${dateIndex}`"
					class="grid grid-cols-13 min-h-24 border"
				>
					<div
						class="p-3 col-span-1 border-r-2"
						:class="`bg-${getColorByDate(date)}`"
					>
						<span class="font-bold">{{ date }}</span>
					</div>
					<div
						class="border p-3 rounded text-sm bg-opacity-60 flex flex-col justify-between"
						:class="
							`col-start-${course.startCol} col-end-${
								course.endCol
							} bg-${getColorByDate(date)}`
						"
						v-for="(course, courseIndex) in mappedCourses[date]"
						:key="`course-${courseIndex}`"
					>
						<p class="flex flex-wrap justify-between mb-2">
							<span>{{ course.subject_code }}</span>
							<span>({{ course.time_from }} - {{ course.time_to }})</span>
						</p>
						<p>{{ course.subject_name_th }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "../http";

export default {
	name: "Schedule",
	data() {
		return {
			courses: [],
			headers: ["", 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
		};
	},
	created() {
		this.getSchedule();
	},
	computed: {
		orderedDate() {
			return ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
		},
		mappedCourses() {
			return this.courses.reduce((acc, course) => {
				const dayKey = course.day_w.trim();
				const mappedCourse = {
					startCol: +course.time_from.split(":")[0] - 6,
					endCol: +course.time_to.split(":")[0] - 6,
					...course
				};
				if (dayKey in acc) {
					acc[dayKey].push(mappedCourse);
				} else {
					acc[dayKey] = [mappedCourse];
				}
				return acc;
			}, {});
		}
	},
	methods: {
		logout() {
			localStorage.removeItem("accesstoken");
			localStorage.removeItem("stdId");
			this.$router.push("/");
		},
		getColorByDate(date) {
			const color = {
				MON: "yellow-200",
				TUE: "pink-400",
				WED: "green-400",
				THU: "yellow-400",
				FRI: "blue-400",
				SAT: "purple-400",
				SUN: "red-400"
			};
			return color[date];
		},
		getSchedule() {
			axios
				.get("/getSchedule", {
					headers: {
						accesstoken: localStorage.getItem("accesstoken")
					},
					params: {
						stdId: localStorage.getItem("stdId")
					}
				})
				.then(response => {
					const { data } = response;
					this.courses = data;
				});
		}
	}
};
</script>

<style>
</style>
