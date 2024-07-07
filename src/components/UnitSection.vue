<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import spinTableVue from './SpinTable.vue'
import getUnitData from '@/service/api/getUnitData'

defineProps({
  lang: {
    type: Boolean,
    default: false,
  },
})

const loading = ref(true)
const unitYear = ref(0)

const units = ref<any[]>([])
const unitsName = ref({
  en: [
    'Wellness',
    'Entrepreneurship',
    'Thai Citizen and Global Citizen',
    'Language and Communication',
    'Aesthetics',
  ],
  th: [
    'กลุ่มสาระอยู่ดีมีสุข',
    'กลุ่มสาระศาสตร์แห่งผู้ประกอบการ',
    'กลุ่มสาระพลเมืองไทยและพลเมืองโลก',
    'กลุ่มสาระภาษากับการสื่อสาร',
    'กลุ่มสาระสุนทรียศาสตร์',
  ],
})
const initProgress = ref([0, 0, 0, 0, 0])
const progress = ref([
  { percent: 0, ifUp: 'true' },
  { percent: 0, ifUp: 'true' },
  { percent: 0, ifUp: 'true' },
  { percent: 0, ifUp: 'true' },
  { percent: 0, ifUp: 'true' },
])
const counter = ref(0)
const data = ref(true)
const major = ref('')
const store = useStore()

const studentInfo = computed(() => store.state.auth.studentInfo)

onMounted(async () => {
  await getUnit()

  major.value = JSON.parse(localStorage.getItem('studentInfo') || '{}').majorCode

  setProgress()

  processInterval()
})

function processInterval() {
  const timer = setInterval(() => {
    initProgress.value = initProgress.value.map((item, index) => {
      if (counter.value === 300) {
        clearInterval(timer)
      }
      if (item >= progress.value[index].percent) {
        progress.value[index].ifUp = 'false'
        counter.value += 1
        return item
      }
      if (progress.value[index].ifUp === 'true') {
        return item + 1
      }
      return item
    })
  }, 20)
}

function setProgress() {
  units.value.forEach((item, index) => {
    if (item.need == 0) data.value = false
    else if (item.done < item.need) {
      progress.value[index].percent = (parseInt(item.done) / parseInt(item.need)) * 100
    } else {
      progress.value[index].percent = 100
    }
  })
}

async function getUnit() {
  loading.value = true
  try {
    const data = await getUnitData({
      stdCode: studentInfo.value.stdCode,
      majorCode: studentInfo.value.majorCode,
    })

    unitYear.value = data.unitYear
    units.value.push(data.Wellness)
    units.value.push(data.Entrepreneurship)
    units.value.push(data.Thai_Citizen_and_Global_Citizen)
    units.value.push(data.Language_and_Communication)
    units.value.push(data.Aesthetics)
  } catch (error) {
    store.commit('auth/clearAuthData')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container mx-auto items-center overflow-y-auto my-4 mt-10">
    <div class="flex flex-wrap items-baseline mb-2 space-x-2">
      <h1 class="font-bold text-4xl inline-block">KU GenEd</h1>
      <h1 v-if="!loading" class="text-4xl font-bold inline-block">({{ major }})</h1>
      <p class="mb-2">
        **กำลังแสดงหลักสูตรปี {{ unitYear }} หากจำนวนหน่วยกิตไม่ถูกต้อง โปรด
        <a class="underline" href="https://forms.gle/HJw8KFbKpuN3RrxE6">กรอกฟอร์ม</a>
        เพื่อแจ้งให้เพิ่ม
      </p>
    </div>
    <div class="container text-sm font-bold mx-auto p-2 text-red-500">
      <div v-if="major" class="mb-2">
        <span v-if="lang" class="text-center">
          **Sorry, we don't have information about your faculty department. you can
          <a class="underline" href="https://forms.gle/xPs2cc2xxWnGiTvY6">fill form here.</a>
        </span>
        <span v-else class="text-center">
          **ขออภัย ทางเรายังไม่มีข้อมูลเกี่ยวกับคณะ ({{ major }}) ของท่าน กรุณากรอก
          <a class="underline" href="https://forms.gle/xPs2cc2xxWnGiTvY6">ฟอร์มขอเพิ่มหมวด</a>
        </span>
      </div>

      <span v-if="!lang">
        **โปรดตรวจสอบข้อมูลเงื่อนไขการลงทะเบียนของท่านอีกครั้ง
        อาจมีเงื่อนไขแตกต่างกันออกไปในแต่ละสาขาและชั้นปีครับ</span
      >
      <span v-else>
        **Please check your registration conditions again. There may be different conditions for
        each department and year.</span
      >
    </div>
    <spin-table-vue v-if="loading" />
    <div class="space-y-3 text-lg container mx-auto">
      <div v-for="(item, index) in units" :key="index" class="border-2 m-1 p-3 rounded-md">
        <div class="flex flex-col md:flex-row justify-between text-2xl">
          <span v-if="lang">{{ unitsName.en[index] }}</span>
          <span v-else>{{ unitsName.th[index] }}</span>
          <span class="text-lg">{{ item.done }}/{{ item.need }} units</span>
        </div>
        <k-progress
          class="no-gap text-xl dark:text-gray-300"
          :percent="initProgress[index]"
          :status="initProgress[index] === 100 ? 'success' : 'warning'"
        />
        <table class="table-auto space-x-2 w-full mr-3">
          <tbody>
            <tr
              v-for="(sub, bodyIndex) in item.subjects"
              :key="bodyIndex"
              class="text-base md:text-lg"
            >
              <td class="w-1/12 pr-2">
                {{ sub.subject_code }}
              </td>
              <td v-if="lang" class="w-10/12">
                {{ sub.subject_name_en }}
              </td>
              <td v-else class="w-10/12">
                {{ sub.subject_name_th }}
              </td>
              <td class="w-1/12 text-right">
                {{ sub.credit }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="container mx-auto flex text-center pl-2 text-xs md:text-lg">
        <span v-if="lang" class="">More information: </span>
        <span v-else class="">หมายเหตุ: </span>
        <a
          class="text-blue-700 dark:text-gray-200 pl-1 underline"
          href="https://www.ku.ac.th/th/bachelor-degree"
          >https://www.ku.ac.th/th/bachelor-degree</a
        >
        หรือ
        <a class="text-blue-700" href="https://registrar.ku.ac.th/cur/all"
          >https://registrar.ku.ac.th/cur/all</a
        >
      </div>
    </div>
    <div />
  </div>
</template>

<style></style>
