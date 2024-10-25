<template>
  <div>
    <div class="table-list-container">
      <div class="table-wrap">
        <div class="table-title">
          <div>文本文本</div>
          <div>文本文本</div>
          <div>文本文本</div>
          <div>文本文本</div>
        </div>
        <div
          class="table-main"
          @mouseenter="handleMouseEnter"
          @mouseout="handleMouseOut"
        >
          <el-scrollbar wrap-class="com-scrollbar-wrap-class">
            <div class="common-scrollbar-class">
              <transition-group :name="direction">
                <div
                  v-for="(item) in tableAllList"
                  :key="item.id"
                  class="table-list-item"
                >
                  <div>{{ item.calculateName || '--' }}</div>
                  <div>{{ item.vendorName || '--' }}</div>
                  <div>{{ item.cpuUsed || '--' }}</div>
                  <div>{{ item.cameraNum || '--' }}</div>
                </div>
              </transition-group>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>
    <div>
      <p>
        <el-button @click="handleClick">插入推送数据</el-button>
        一般如果是告警数据的，都是那种有时间顺序的，接口获取的数据新的放前面，旧的放后面
        所以 direction 是 forward
      </p>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'

const tableAllList = ref([
  { id: '1', calculateName: '1', vendorName: '123123', cpuUsed: 123, cameraNum: 123 },
  { id: '12', calculateName: '2', vendorName: '123123', cpuUsed: 123, cameraNum: 123 },
  { id: '134', calculateName: '3', vendorName: '123123', cpuUsed: 123, cameraNum: 123 },
  { id: '1123', calculateName: '4', vendorName: '123123', cpuUsed: 123, cameraNum: 123 },
  { id: '11234', calculateName: '5', vendorName: '123123', cpuUsed: 123, cameraNum: 123 },
  { id: '123411', calculateName: '6', vendorName: '123123', cpuUsed: 123, cameraNum: 123 },
  { id: '12342134', calculateName: '7', vendorName: '123123', cpuUsed: 123, cameraNum: 123 }
])

/* queen */
const direction = ref('forward') // forward back

const queenSwitch = () => {
  if (direction.value === 'forward') {
    const temp = tableAllList.value.shift()
    tableAllList.value.push(setRandomKey(temp))
  }
  if (direction.value === 'back') {
    const temp = tableAllList.value.pop()
    tableAllList.value.unshift(setRandomKey(temp))
  }
}
const setRandomKey = (temp) => {
  temp.id = String(Date.now())
  return temp
}

/* timer */
let timer = null
const loop = 2 * 1000
const initAnimation = () => {
  timer && clearTimeout(timer)
  timer = setTimeout(() => {
    if (tableAllList.value.length) {
      queenSwitch()
      initAnimation()
    }
  }, loop)
}
onMounted(() => {
  initAnimation()
})
onBeforeUnmount(() => {
  clearTimeout(timer)
})

/* action */
const handleMouseEnter = () => {
  clearTimeout(timer)
}
const handleMouseOut = () => {
  initAnimation()
}

/* demo */
const handleClick = () => {
  tableAllList.value.unshift({
    id: '1', calculateName: 'new 1', vendorName: '123123', cpuUsed: 123, cameraNum: 123
  })
}

</script>
<style
  lang="scss"
  scoped
>
/* up */
.forward-move {
  transition: all 1s;
}

@keyframes forwardFadeOut {
  from {
    position: absolute;
  }

  to {
    position: absolute;
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
}

.forward-leave-active {
  animation: forwardFadeOut 1s;
}

@keyframes forwardFadeIn {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.forward-enter-active {
  animation: forwardFadeIn 1s;
}

/* back */
.back-move {
  transition: all 1s;
}

@keyframes backFadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

.back-leave-active {
  animation: backFadeOut 1s;
}

@keyframes backFadeIn {
  from {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.back-enter-active {
  animation: backFadeIn 1s;
}


/* style */
.table-list-container {
  background: #06444e;
  width: 400px;

  .table-wrap {
    width: 100%;
    overflow: hidden;

    //.table-title > div:nth-child(1),
    //.table-list-item > div:nth-child(1) {
    //  padding: 0 12px;
    //  width: 110px;
    //}

    .table-title > div,
    .table-list-item > div {
      padding: 0 12px;
      width: 25%;
    }
  }

  .table-title {
    width: 100%;
    height: 32px;
    display: flex;
    align-items: center;
    background: rgba(22, 227, 242, 0.30);

    > div {
      opacity: 0.8;
      font-family: PingFangSC-Semibold;
      font-size: 12px;
      color: #FFFFFF;
      letter-spacing: 0;
      font-weight: 600;
    }
  }

  .table-main {
    position: relative;
    width: 100%;
    height: 210px;
    padding: 8px 0;
    overflow: hidden;

    .table-list-item {
      width: 100%;
      height: 32px;
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      background: rgba(24, 234, 247, 0.1);

      > div {
        height: 32px;
        line-height: 32px;
        font-size: 16px;
        color: #DBFAFF;
        letter-spacing: 0;
        text-shadow: 0 2px 4px rgba(0, 133, 176, 0.50);
        font-weight: 400;
        font-family: PingFangSC-Semibold;

        &.count {
          font-family: PangMenZhengDao;
          font-size: 16px;
        }
      }
    }
  }
}

</style>
<style lang="scss">
.com-scrollbar-wrap-class {
  height: 100%;
  overflow-x: hidden !important;
}

.common-scrollbar-class {
  position: relative;
  height: 100%;
  overflow: hidden;
}
</style>
