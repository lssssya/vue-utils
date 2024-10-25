<template>
  <div class="container">
    <div
      id="hmap"
      v-loading="loading"
    >
      <div class="wrap">
        <el-button @click="handleAddPoint">点位</el-button>
        <el-button @click="handleAddBatchPoint">大规模点位</el-button>
        <el-button @click="handleAddBatchPopup">大规模点位+弹窗</el-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useMap } from './useMap'

const loading = ref(false)

let initMapPromise = null
const {
  initMap,
  mapViewerUtils,
  cameraUtils,
  popupUtils
} = useMap({ id: 'hmap' })

onMounted(() => {
  initMapPromise = initMap({}).then(() => {
    mapViewerUtils.addMapViewer('tms', {})
    // 触发响应式
    mapViewerUtils.mapViewer.order = 1
  })
})

/* button function */
const handleAddPoint = () => {

}
const handleAddBatchPoint = () => {
  const array = []
  const count = 100000
  for (let i = 0; i < count; i++) {
    const longitude = Number('112.' + Math.floor(Math.random() * 100000))
    const latitude = Number('28.' + Math.floor(Math.random() * 100000))
    array.push({ longitude, latitude })
  }

  cameraUtils.addCamera(array)
}
const handleAddBatchPopup = () => {
  const longitude = Number('112.' + Math.floor(Math.random() * 100000))
  const latitude = Number('28.' + Math.floor(Math.random() * 100000))

  popupUtils.addPopup(
    {
      id: '1',
      center: [longitude, latitude],
      props: {
        outer: '123'
      }
    },
    {
      'event-success': callback
    })
}
const callback = (data) => {
  console.log('event',data)
}

</script>
<style
  lang="scss"
  scoped
>
.container {
  width: 100%;
  height: 100%;
  position: relative;
}

#hmap {
  width: 100%;
  height: 100%;
}

.wrap {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}
</style>
