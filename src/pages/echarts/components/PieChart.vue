<template>
  <div class="bar-chart-container">
    <echarts-container
      ref="echartsContainerRef"
      :options="chartOptions"
    ></echarts-container>
    <div class="legend-container">
      <el-scrollbar
        class="scrollbar-container"
        ref="scrollbarRef"
        wrap-class="legend-scrollbar-wrap-class"
        view-class="view-class"
      >
        <div class="legend-wrap">
          <div
            class="legend-item"
            v-for="(item,index) in data"
            :key="item.name"
          >
            <div
              class="icon"
              :style="{'background-color': colors[index % colors.length]}"
            ></div>
            <div class="label">{{ item.name }}</div>
            <div class="value">{{ item.value }}</div>
            <div class="percent"> {{ 100 }}%</div>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import EchartsContainer from '@/components/EchartsContainer.vue'

const props = defineProps({
  colors: Array,
  data: Array
})

watch(() => props.data, (v) => {
  setChart(v)
})
onMounted(() => {
  setChart([])
})

const total = computed(() => {
  return props.data.reduce((sum, cur) => sum + cur.value, 0)
})

/* echarts */
const echartsContainerRef = ref('echartsContainerRef')
const chartOptions = ref({})
const setChart = (data) => {
  const color = {
    colors: props.colors,
    text: 'rgba(0, 0, 0, 0.7)',
    axis: 'rgba(0, 0, 0, 0.5)'
  }
  const options = {
    dataset: {
      source: data
    },
    color: color.colors,
    grid: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    },
    series: [{
      silent: true,
      type: 'pie',
      encode: {
        value: 'value'
      },
      center: ['50%', '50%'],
      radius: [72, 72 + 12],
      label: {
        position: 'center',
        formatter: () => `{num|${ total.value.toLocaleString() }}\n{text|总数}`,
        rich: {
          num: {
            fontSize: 32,
            color: color.text,
            lineHeight: 36,
            align: 'center'
          },
          text: {
            fontSize: 14,
            color: color.axis,
            lineHeight: 20,
            align: 'center'
          }
        }
      }
    }]
  }
  chartOptions.value = options
}
</script>
<style lang="scss">
.scrollbar-container {
  display: flex;
  height: fit-content;
  max-height: 70%;
  width: 100% !important;
}

.legend-scrollbar-wrap-class {
  flex: 1;
}
</style>
<style
  lang="scss"
  scoped
>
.bar-chart-container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;

  .legend-container {
    display: flex;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: 100%;

    .legend-wrap {
      box-sizing: border-box;
      padding-right: 14px;
      width: 100%;
      height: 100%;

      .legend-item {
        display: flex;
        align-items: center;

        & + .legend-item {
          margin-top: 12px;
        }

        .icon {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 6px;
        }

        .label {
          flex: 1;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #000000;
          font-weight: 400;
        }

        .value {
          margin-left: auto;
          opacity: 0.9;
          color: #000000;
          font-family: PangMenZhengDao;
          font-weight: 400;
        }

        .percent {
          position: relative;
          width: 56px;
          min-width: 56px;
          color: rgba(0, 0, 0, 0.7);
          font-family: Microsoft YaHei UI;
          text-align: right;

          &::before {
            content: '';
            position: absolute;
            top: 5px;
            left: 9px;
            width: 1px;
            height: 8px;
            background: rgba(0, 0, 0, 0.2);
          }
        }

      }
    }
  }

}
</style>
