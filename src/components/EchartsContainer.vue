<template>
  <div
    class="echarts-container"
    :style="{
      'width': width ? `${width}px` : '100%',
      'height':height ? `${height}px` : '100%'
    }"
  >
    <div
      ref="echartsWrapRef"
      class="chart-wrap"
    ></div>
    <div
      ref="echartsImageRef"
      class="image-wrap"
    ></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import 'echarts-gl'
import { onBeforeUnmount, onMounted, ref, toRefs, watch } from 'vue'


const props = defineProps({
  options: { type: Object, default: () => ({}) },
  width: { type: Number, default: 0 },
  height: { type: Number, default: 0 }
})
const { options, width, height } = toRefs(props)


const echartsInstance = ref(null)
watch(() => options.value, (value) => {
  if (echartsInstance.value) {
    setInstanceOption(value)
  }
})
const setInstanceOption = (newOption) => {
  echartsInstance.value.setOption(newOption)
}

/* init */
const echartsWrapRef = ref('echartsWrapRef')
const echartsImageRef = ref('echartsImageRef')
const init = () => {
  const _param = {
    width: echartsWrapRef.value.offsetWidth,
    height: echartsWrapRef.value.offsetHeight
  }
  if (width.value) {
    _param.width = width.value
  }
  if (height.value) {
    _param.height = height.value
  }
  echartsInstance.value = echarts.init(echartsWrapRef.value, '', _param)
  if (options.value) {
    echartsInstance.value.setOption(options.value, true)
  }
}
const resize = () => {
  setTimeout(() => {
    echartsInstance.value && echartsInstance.value.resize({
      width: echartsWrapRef.value.offsetWidth,
      height: echartsWrapRef.value.offsetHeight
    })
  })
}


onMounted(() => {
  init()
  window.addEventListener('resize', resize)
})
onBeforeUnmount(() => {
  if (echartsInstance.value) {
    const _img = echartsInstance.value.getDataURL({
      type: 'png'
    })
    echartsImageRef.value.style['background-image'] = `url("${ _img }")`
    echartsInstance.value.dispose()
  }
  window.removeEventListener('resize', resize)
})

/* 对外提供 */
const getInstance = () => {
  return echartsInstance.value
}
const updateOptions = (newOptions) => {
  return echartsInstance.value.setOption(newOptions)
}
defineExpose({ getInstance, updateOptions })
</script>

<style
  lang="scss"
  scoped
>
.echarts-container {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 100;

  .chart-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 101;
  }

  .image-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    position: absolute;
  }
}
</style>
