<template>
  <div class="container">
    <div class="list">
      <div
        v-for="item in components"
        class="item"
      >
        <div
          class="button"
          @click="current = item"
        >{{ item }}
        </div>
      </div>
    </div>
    <router-view :current="current" style="flex: 1;"></router-view>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const components = computed(() => route.meta.group)
const current = ref('')

onMounted(() => {
  current.value = components.value[0]
})
</script>
<style
  lang="scss"
  scoped
>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .list {
    height: 32px;
    line-height: 32px;
    display: flex;

    .item {
      & + .item {
        margin-left: 16px;
        cursor: pointer;
      }
    }
  }
}
</style>
