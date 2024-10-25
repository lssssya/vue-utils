<route lang="yaml">
meta:
  layout: layoutMenu
  group: ['PieChart','GL']
</route>
<template>
  <div class="container">
    <component
      :is="currentComponent"
      v-bind="currentProps"
    ></component>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import PieChart from '@/pages/echarts/components/PieChart.vue'
import Gl from '@/pages/echarts/components/GL.vue'
import { useMenu } from '@/layouts/useMenu.js'

const props = defineProps({
  current: String
})

const components = ref([
  {
    component: PieChart,
    props: {
      colors: ['red', 'blue'],
      data: [{ value: 1, name: 3 }, { value: 3, name: 314 }]
    }
  },
  {
    component: Gl,
    props: {}
  }
])

const { currentComponent, currentProps } = useMenu(components, props)


</script>
<style
  lang="scss"
  scoped
>
.container {
  width: 100%;
  height: 100%;
}
</style>


