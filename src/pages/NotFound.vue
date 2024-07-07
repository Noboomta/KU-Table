<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function back() {
  router.replace('/login')
}
</script>
<template>
  <div class="flex mx-auto flex-grow items-center">
    <div class="p-5 flex flex-col justify-center w-96">
      <h1 class="text-7xl mb-5 text-shadow-gray">ERROR</h1>
      <h2 class="text-8xl mb-5 text-red-600 text-shadow-red">404</h2>
      <span class="text-4xl mb-5 text-gray-500">Page not found</span>
      <button
        class="py-2 px-6 mr-28 mt-5 text-white text-2xl rounded-md transition duration-500 ease-in-out bg-blue-500 hover:bg-blue-700 transform hover:scale-110"
        @click="back"
      >
        Go Back to Login
      </button>
    </div>
    <div>
      <img src="../assets/404page.jpg" alt="404-page-table" class="h-96" />
    </div>
  </div>
</template>

<style>
.text-shadow-gray {
  text-shadow: 2px 2px 5px gray;
}
.text-shadow-red {
  text-shadow: 2px 2px 5px red;
}
</style>
