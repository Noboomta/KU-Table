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
						:class="`${getColorByDate(date)}`"
					>
						<span class="font-bold">{{ date }}</span>
					</div>
					<div
						class="border p-3 rounded text-sm bg-opacity-60 flex flex-col justify-between"
						:class="
							`my-col-start-${course.startCol} my-col-end-${course.endCol}
							${getColorByDate(date)}`
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
		// getStartColByCourses(courses) {
		// const colClass = `col-start-${courses.startCol}`
		// 	return colClass
		// },
		// getEndColByCourses(courses) {
		// 	const colClass = `col-end-${courses.endCol}`
		// 	return colClass
		// },
		logout() {
			localStorage.removeItem("accesstoken");
			localStorage.removeItem("stdId");
			this.$router.push("/");
		},
		getColorByDate(date) {
			const color = {
				MON: "bg-yellow-200",
				TUE: "bg-pink-400",
				WED: "bg-green-400",
				THU: "bg-yellow-400",
				FRI: "bg-blue-400",
				SAT: "bg-purple-400",
				SUN: "bg-red-400"
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
.my-col-start-1 {
	@apply col-start-1
}
.my-col-start-2 {
	@apply col-start-2
}
.my-col-start-3 {
	@apply col-start-3
}
.my-col-start-4 {
	@apply col-start-4
}
.my-col-start-5 {
	@apply col-start-5
}
.my-col-start-6 {
	@apply col-start-6
}
.my-col-start-7 {
	@apply col-start-7
}
.my-col-start-8 {
	@apply col-start-8
}
.my-col-start-9 {
	@apply col-start-9
}
.my-col-start-10 {
	@apply col-start-10
}
.my-col-start-11 {
	@apply col-start-11
}
.my-col-start-12 {
	@apply col-start-12
}
.my-col-start-13 {
	@apply col-start-13
}
.my-col-end-1 {
	@apply col-end-1
}
.my-col-end-2 {
	@apply col-end-2
}
.my-col-end-3 {
	@apply col-end-3
}
.my-col-end-4 {
	@apply col-end-4
}
.my-col-end-5 {
	@apply col-end-5
}
.my-col-end-6 {
	@apply col-end-6
}
.my-col-end-7 {
	@apply col-end-7
}
.my-col-end-8 {
	@apply col-end-8
}
.my-col-end-9 {
	@apply col-end-9
}
.my-col-end-10 {
	@apply col-end-10
}
.my-col-end-11 {
	@apply col-end-11
}
.my-col-end-12 {
	@apply col-end-12
}
.my-col-end-13 {
	@apply col-end-13
}
</style>
