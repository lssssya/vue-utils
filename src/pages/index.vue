<template>
  <div class="list-wrap">
    <el-button
      v-for="(item, index) in list"
      :key="index"
      type="link"
      @click="handleGo(item)"
    >
      {{ item.name }}
    </el-button>
  </div>
</template>
<script setup>
const list = ref([
  { name: '去看看经典页面', path: '/classic' },
  { name: '访问没有权限的页面', path: '/auth' },
  { name: '访问不存在的页面', path: '/fake' }
])
const router = useRouter()
const handleGo = item => {
  router.push({
    path: item.path
  })
}
</script>
<style lang="scss" scoped>
.list-wrap {
  width: 100%;
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .el-button {
    display: block;
    margin: 0;
  }
}
</style>
