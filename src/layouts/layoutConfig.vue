<template>
  <h-page-container flex>
    <h-page-header :breadcrumb="breadcrumb" :return-icon="showReturn" />
    <router-view />
  </h-page-container>
</template>
<script setup>
const route = useRoute()
const breadcrumb = computed(() => route.query.breadcrumb ?? route.meta.breadcrumb)
const showReturn = computed(() => route.meta.showReturn || false)
</script>
