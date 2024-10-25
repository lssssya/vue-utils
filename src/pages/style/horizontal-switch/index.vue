<template>
  <h-page-container>
    <h-page-header
      slot="pageHeader"
      :breadcrumb="['横向切换']"
    />
    <h-page-content>
      <div style="height: 100px;width: 1000px;">
        <horizontal-switch
          v-model="currentSelect"
          :rows="switchList"
          active-class="active"
          node-key="id"
          @change="handleSwitchChange"
        >
          <template slot-scope="scope">
            <div class="item">{{ scope.item.id }}</div>
          </template>
        </horizontal-switch>
      </div>
    </h-page-content>
  </h-page-container>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import HorizontalSwitch from './HorizontalSwitch.vue'

const switchList = ref(Array.from({ length: 10 }, (e, i) => ({ id: i })))
const currentSelect = ref({
  id: 0
})
const handleSwitchChange = () => {
  /* do something */
}

onMounted(() => {
  currentSelect.value.id = 6
})

</script>
<style
  lang="scss"
  scoped
>
.item {
  width: 300px;
  height: 100px;
  border: 1px solid crimson;
}

.active {
  .item {
    border: 1px solid blue;
  }
}
</style>
