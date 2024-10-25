<template>
  <div
    class="container"
    @click="handleClick"
  >
    popup
  </div>
</template>
<script setup>
const props = defineProps({
  outer: String
})

const emit = defineEmits([])
const handleClick = () => {
  emit('event-success', 'event11')
}

</script>
<style
  lang="scss"
  scoped
>
.container {
  width: 100px;
  height: 100px;
  background: white;
}
</style>
