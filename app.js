// const vue = new Vue({
//     el: "#vue-app",
//     data: {
//         name: "Boom",
//         job: "runner",
//         age: 19,
//         status: false,
//         count: 0,
//         foods: [],
//         website: 'http://www.facebook.com/puvanaswatvanith'
//     },
//     methods: {
//         getName: function(){
//             return this.name
//         },
//         setName: function(newName){
//             this.name = newName
//             return this.name
//         },
//         addAge: function(){
//             this.age += 1;
//             console.log(this.age);
//         },
//         subtractAge: function(){
//             this.age -= 1;
//             console.log(this.age);
//         },
//         addCount: function(){
//             this.count++
//             console.log(this.count)
//         }
//     }
// })

const testApi = new Vue({
    el: "#testAPI",
    data: {
        username: "",
        password: "",
        params: {
            academicYear: "2564",
            semester: 1,
        },
        all_courses: "no course now",
        courses: []
    },
    methods: {
        login: async function(){

            // window.onunload = function() { debugger; }

            const data = {
                username: this.username,
                password: this.password,
            };

            fetch('https://schedule-ku-server.herokuapp.com:8000/login', {
                  method: 'POST', // or 'PUT'
                //   mode: 'no-cors',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(json => {
                    console.log(json);
                    this.all_courses = json
                    this.courses = this.all_courses[0]["course"]
                })

        }
    }
})
