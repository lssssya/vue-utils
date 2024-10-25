<template>
  <div class="switch-container">
    <template v-if="rows.length > 1">
      <div
        class="switch-icon-wrap left"
        @click.stop="handleSwitchClick('left')"
      ></div>
      <div
        class="switch-icon-wrap right"
        @click.stop="handleSwitchClick('right')"
      ></div>
    </template>
    <div :class="['content',{'multi': rows.length > 1}]">
      <el-scrollbar
        style="height: calc(100% + 14px)"
        wrap-class="com-scrollbar-wrap-class"
        view-class="view-class"
        ref="scrollbarRef"
      >
        <div class="switch-wrap">
          <div
            v-for="item in rows"
            :key="item[nodeKey]"
            :class="[
              'switch-item',
              proxy[nodeKey] === item[nodeKey] && activeClass
            ]"
            @click="handleCurrentClick(item,$event)"
            ref="switchItemRef"
          >
            <slot :item="item"></slot>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  value: Object,
  rows: Array,
  activeClass: {
    type: String,
    default: 'active'
  },
  nodeKey: {
    type: String,
    default: 'id'
  }
})
const emit = defineEmits([])
const proxy = computed({
  get () {
    return props.value
  },
  set (v) {
    emit('input', v)
  }
})

/* scrollbar */
const scrollbarRef = ref('scrollbarRef')
const computeWidth = computed(() => {
  return switchItemRef.value[0].offsetWidth
})
const switchItemRef = ref('switchItemRef')
const currentIndex = computed(() => {
  return props.rows.findIndex(e => e[props.nodeKey] === proxy.value[props.nodeKey])
})
watch(() => currentIndex.value, (value) => {
  const position = value * computeWidth.value - (computeWidth.value / 2)
  scrollbarRef.value.setScroll(0, position < 0 ? 0 : position)
})

const handleCurrentClick = (item, $event) => {
  proxy.value = item
  eventEmit()
}
const handleSwitchClick = (type) => {
  let index = 0
  if (type === 'left') {
    index = currentIndex.value === 0 ? props.rows.length - 1 : currentIndex.value - 1
  }
  if (type === 'right') {
    index = currentIndex.value === props.rows.length - 1 ? 0 : currentIndex.value + 1
  }
  proxy.value = props.rows[index]
  eventEmit()
}

const eventEmit = () => {
  emit('change', proxy.value)
}

</script>

<style lang="scss">
.com-scrollbar-wrap-class {
  height: 100%;
  overflow-x: hidden !important;
}
</style>
<style
  lang="scss"
  scoped
>
.switch-container {
  width: 100%;
  height: 100%;
  position: relative;
  display: grid;
  grid-template-columns: 22px minmax(0, 1fr) 22px;

  .switch-icon-wrap {
    position: absolute;
    width: 22px;
    height: 100%;
    box-sizing: content-box;
    cursor: pointer;
    background: #8c939d;

    &.left {
      grid-column: 1 / 1;
      left: 0;
      //background: url("~@/assets/images/history/switch-left.png") no-repeat center/ 22px 86px;
    }

    &.right {
      grid-column: -1 / -1;
      right: 0;
      //background: url("~@/assets/images/history/switch-right.png") no-repeat center/ 22px 86px;
    }
  }

  .content {
    width: 100%;
    grid-column: 1 / -1;

    &.multi {
      grid-column: 2 / 2;
      padding: 0 8px;
    }
  }

  .switch-wrap {
    width: max-content;
    display: flex;
    flex-wrap: nowrap;

    .switch-item {
      cursor: pointer;

      & + .switch-item {
        margin-left: 8px;
      }
    }
  }
}
</style>
