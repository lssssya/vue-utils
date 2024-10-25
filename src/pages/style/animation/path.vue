<template>
  <div class="container">
    <div class="wrap">
      <div
        ref="itemRef"
        class="item"
      ></div>
      <h-svg-icon
        style="width: 100%;height: 100%"
        :svgs="[SvgPath]"
      />
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import MotionPathPlugin from 'gsap/dist/MotionPathPlugin'

/* ref */
const itemRef = ref('itemRef')
const SvgPath = require('!raw-loader!./svg-path/raw.svg')

/* 创建动画 */
const setGsapAnimation = (config) => {
  return gsap.to(
    itemRef.value,
    {
      duration: 10,
      ease: 'none',
      motionPath: {
        path: config.pathId, // you probably want more points here...or just use an SVG <path>!
        autoRotate: true, // 盒子是否根据当前的svg路线切线改变朝向
        align: config.pathId,
        alignOrigin: [0.5, 0.5]
      }
    }
  )
}
const createTimeLine = () => {
  return gsap.timeline({
    repeat: -1,
    delay: 1
  }).add(setGsapAnimation({
    pathId: '#path'
  }), 0)
}

const timeLine = ref(null)
onMounted(() => {
  gsap.registerPlugin(MotionPathPlugin)
  timeLine.value = createTimeLine()
})

</script>
<style
  lang="scss"
  scoped
>
.container {
  width: 1400px;
  height: 800px;
  position: relative;

  .wrap {
    position: absolute;
    //top: 24px;
    //left: 24px;
    width: 100%;
    height: 100%;

    .item {
      position: absolute;
      width: 48px;
      height: 48px;

      background: rgba(0, 128, 255);
      border-radius: 50%;

      > img {
        width: 48px;
        height: 48px;
      }
    }
  }

  svg {
    position: absolute;
    top: 0px;
    left: 0px;
  }
}
</style>
