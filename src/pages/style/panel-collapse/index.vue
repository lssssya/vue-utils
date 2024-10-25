<template>
  <div class="collapse-container">
    <collapse-item
      v-for="(row,index) in tableData"
      :key="row.id"
      :visible="currentRow === row.id"
      :item="row"
      :index="row.id"
      :color="colors[index % colors.length]"
      @row-click="handleRowClick(row)"
    >
      <div class="main-wrap">
        <ul>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
        </ul>
      </div>
      <template #header>
        <div v-ellipsis>
          {{ row.name }}
        </div>
      </template>
    </collapse-item>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import CollapseItem from './CollapseItem.vue'

const props = defineProps({})

const tableData = ref([])
const getData = async () => {
  tableData.value = Array.from({ length: 10 }).map((e, i) => {
    return {
      id: i,
      name: i + 'rowrowrowrowrowrowrowrowrowrowrowrowrowrowrowrowrowrowrowrowrowrow'
    }
  })
}
onMounted(() => {
  getData()
})

/* 手风琴版本 展开 */
const currentRow = ref('')
const handleRowClick = (current) => {
  currentRow.value = currentRow.value === current.id ? '' : current.id
}

const colors = [
  '#2490FD',
  '#3FCF8E',
  '#FF8D58',
  '#FB3C06',
  '#2436FD',
  '#249A99',
  '#D49C7C',
  '#F7BD18',
  '#5C7191',
  '#FE9AC4'
]

</script>

<style
  lang="scss"
  scoped
>
.collapse-container {
  width: 340px;
  background: #FFFFFF;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  border-radius: 2px;

  .main-wrap {
    ul > li {
      height: 24px;
      line-height: 24px;
    }
  }
}
</style>
