<template>
  <error-page :code="errorCode" :text="errorText[errorCode]" />
</template>
<script setup>
const route = useRoute()
const errorCode = computed(
  () => errorText.value[route.params.errorCode] ? route.params.errorCode : '404'
)
const errorText = ref({
  403: '您无权访问该页面',
  404: '您访问的页面不存在',
  500: '服务器异常，请联系管理员'
})
</script>
<style lang="scss" scoped></style>
