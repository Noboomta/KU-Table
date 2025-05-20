<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SpinTableVue from '../components/SpinTable.vue'
import { useStore } from 'vuex'
import axios from '../http'

const username = ref('')
const password = ref('')
const err = ref('')
const loading = ref(false)
const router = useRouter()
const store = useStore()

onMounted(() => {
  if (localStorage.getItem('accessToken')) {
    router.push('/schedule')
  }
})

function login() {
  const data = {
    username: username.value,
    password: password.value,
  }
  loading.value = true
  axios
    .post('/login', data)
    .then((response) => {
      const { accesstoken, user } = response.data
      store.commit('auth/authenticate', {
        studentInfo: {
          stdCode: user.student.stdCode,
          stdId: user.student.stdId,
          majorCode: user.student.majorCode,
        },
        accessToken: accesstoken,
      })
    })
    .catch((error) => {
      console.log(error)

      if (err.value) {
        err.value =
          'เกิดข้อผิดพลาดในการล็อคอิน กรุณาลองล็อคอินที่ <a class="underline" href="https://my.ku.th">my.ku.th</a> ก่อนแล้วลองอีกครั้ง'
      } else {
        err.value = 'รออัพเดทระบบตามระบบใหม่ของมหาวิทยาลัย'
      }
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <div class="mx-auto flex md:flex-grow items-center">
    <div class="md:flex border rounded-lg m-5 overflow-hidden dark:border-0">
      <SpinTableVue v-if="loading" />
      <form class="p-5 max-w-sm flex flex-col dark:bg-gray-800" @submit.prevent="login">
        <div class="md:flex-grow">
          <h3 class="text-4xl dark:text-green-300">Login</h3>
          <h3 class="text-sm text-gray-600 dark:text-white">Sign in to your nontri account</h3>
          <h3 class="text-sm text-gray-600 dark:text-white">
            <span class="text-red-400">**รออัพเดทระบบตามระบบใหม่ของมหาวิทยาลัย</span>
          </h3>
          <input
            v-model="username"
            type="text"
            class="w-full my-5 p-3 border rounded"
            required
            placeholder="username"
            autocomplete="on"
          />
          <input
            v-model="password"
            class="w-full p-3 mb-5 border rounded"
            type="password"
            required
            placeholder="password"
            autocomplete="on"
          />
          <button
            class="py-2 px-6 text-white text-lg rounded-md transition duration-500 ease-in-out bg-blue-500 hover:bg-blue-700 transform hover:scale-110 mb-3"
            type="submit"
          >
            Login
          </button>
          <div v-if="err">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p class="text-red-500" v-html="err" />
          </div>
        </div>

        <footer class="text-xs">
          <p class="font-bold dark:text-white">
            ทั้งหมดนี้ <span class="text-red-400">ไม่ใช่</span> เว็บของมหาลัยจริง
          </p>
          <p class="dark:text-white">
            KU-Table เป็นเพียงเว็บที่ทำเพื่อความสะดวกสบายด้วยการสร้างตารางเรียนให้นิสิต
            โดยใช้ข้อมูลจาก
            <a href="https://my.ku.th/" class="text-blue-500 hover:underline">https://my.ku.th/</a>
          </p>
        </footer>
      </form>
      <div>
        <img src="../assets/ku-table-high.jpg" alt="ku-table-high.jpg" class="hidden md:block" />
      </div>
    </div>
  </div>
</template>

<style></style>
