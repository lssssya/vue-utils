<template>
  <div class="rank-chart-container">
    <el-scrollbar wrap-class="com-scrollbar-wrap-class">
      <div
        class="view-data-item"
        v-for="(item,index) in data"
        :key="index"
      >
        <div :class="['icon', {'top3': index < 3}]">{{ index + 1 }}</div>
        <template v-if="showBar">
          <div class="view">
            <div
              class="label"
              v-ellipsis
            >
              {{ item.name }}
            </div>
            <div class="progress-wrap">
              <div class="trend">
                <div
                  class="trend-progress"
                  :style="{ width: `${Math.round(item.value / (max * 1.2) * 100)}%` }"
                ></div>
              </div>
            </div>
            <div class="value">{{ item.value }}</div>
          </div>
        </template>
        <template v-else>
          <div class="view">
            <div
              class="label"
              style="flex: 1"
              v-ellipsis
            >
              {{ item.name }}
            </div>
            <div class="value">{{ item.value }}</div>
          </div>
        </template>
      </div>
    </el-scrollbar>
  </div>
</template>
<script setup>
import { computed, watch } from 'vue'

const props = defineProps({
  showBar: Boolean,
  data: Array
})

watch(() => props.data, (v) => {
})

const max = computed(() => {
  return Math.max(...props.data.map(e => e.value))
})


</script>
<style
  lang="scss"
  scoped
>
.rank-chart-container {
  width: 100%;
  height: 100%;

  .view-data-item {
    padding-right: 16px;

    box-sizing: border-box;
    width: 100%;
    height: 28px;
    display: flex;
    align-items: center;
    margin-bottom: 16px;

    .icon {
      width: 28px;
      height: 28px;
      border-radius: 2px;
      font-family: Microsoft YaHei UI;
      font-size: 14px;
      line-height: 28px;
      text-align: center;

      background: rgb(204, 233, 253);
      color: #000000;

      &.top3 {
        background: rgb(32, 128, 247);
        color: #ffffff;

      }
    }

    .view {
      margin-left: 16px;
      flex: 1;
      display: flex;
      align-items: center;

      .label {
        flex-shrink: 0;
        width: 96px;
        color: rgba(0, 0, 0, 0.7);
        font-family: Microsoft YaHei UI;
        font-size: 14px;
      }

      .value {
        margin-left: auto;
        min-width: 80px;
        width: 80px;
        color: rgba(0, 0, 0, 0.9);
        font-family: HIK朗定黑体数字;
        font-size: 16px;
        text-align: right;
      }

      .progress-wrap {
        width: 100%;
        height: 10px;

        .trend {
          position: relative;
          width: 100%;
          height: 10px;
          background-color: #ebebeb;

          .trend-progress {
            position: absolute;
            top: 0;
            left: 0;
            height: 10px;
            background: rgb(80, 162, 249);
            min-width: 10px;
          }
        }
      }
    }

  }
}
</style>
