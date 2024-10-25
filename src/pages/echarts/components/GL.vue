<template>
  <div class="container">
    <echarts-container
      ref="echartsContainerRef"
      :options="options"
      :width="1300"
      :height="800"
    ></echarts-container>
  </div>
</template>
<script setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import EchartsContainer from '@/components/EchartsContainer.vue'
import CHANGSHA_MAP_JSON from './mapJson/changsha.json'
import GlOption from './options/gl'

const echartsContainerRef = ref('echartsContainerRef')

const options = ref({})
const setMap = () => {
  echarts.registerMap('changsha', CHANGSHA_MAP_JSON)
  options.value = GlOption
}
onMounted(() => {
  setMap()
})
</script>
<style
  lang="scss"
  scoped
>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
