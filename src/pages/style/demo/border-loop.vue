<template>
  <div
    class="container"
    :style="{
      width: radius,
      height: radius
    }"
  >
    <div class="loop"></div>
  </div>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps({
  count: Number
})

const radius = computed(() => {
  if (props.count < 5) {
    return '24px'
  } else if (props.count < 10) {
    return '32px'
  } else if (props.count < 10) {
    return '48px'
  } else {
    return '60px'
  }
})

</script>
<style
  lang="scss"
  scoped
>
.container {
  box-sizing: content-box;
  width: 40px;
  height: 40px;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #fff;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.08);

  .loop {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    background: radial-gradient(closest-side, rgba(36, 144, 253, 0.9) 12px, transparent 13px),
    radial-gradient(closest-side, #64B1FF 16px, transparent 17px),
    radial-gradient(closest-side, #91C8FF 20px, transparent 21px),
    radial-gradient(closest-side, #C6E3FF 24px, transparent 25px),
    radial-gradient(closest-side, #E2F1FF 29px, transparent 30px);
  }
}
</style>
