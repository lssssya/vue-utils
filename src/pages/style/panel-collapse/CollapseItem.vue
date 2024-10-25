<template>
  <div class="collapse-item-container">
    <div
      :class="{ 'is-active': visible }"
      class="collapse-item"
      :style="{
        'background-image': `linear-gradient(${color}, ${color})`,
        'background-size': `${visible ? '100%' : '6px'} 100%`,
        'background-repeat': 'no-repeat'
      }"
      @click="handleRowClick"
    >
      <div class="collapse-item-content">
        <slot name="header"></slot>
      </div>
      <div class="collapse-item-action">
        <i
          :class="{ 'is-active': visible}"
          class="el-collapse-item__arrow h-icon-angle_right_sm on-right"
        />
      </div>
    </div>
    <collapse-transition>
      <div
        v-show="visible"
        class="collapse-main"
      >
        <div class="collapse-main-content">
          <el-scrollbar wrap-class="collapse-scrollbar-wrap-class">
            <slot></slot>
          </el-scrollbar>
        </div>
      </div>
    </collapse-transition>
  </div>

</template>
<script setup>
/* model */
import CollapseTransition from './CollapseTransition.js'

const emit = defineEmits(['update:value'])
const props = defineProps({
  visible: Boolean,
  color: String,
  index: Number,
  item: Object
})

/* 展开 */
const handleRowClick = () => {
  emit('row-click')
}
</script>
<style lang="scss">
.collapse-scrollbar-wrap-class {
  max-height: 180px;
  overflow-x: hidden !important;
}

</style>
<style
  lang="scss"
  scoped
>
.h-icon-location {
  &:hover {
    color: rgb(79, 168, 255);
  }
}

.collapse-item {
  width: 100%;
  height: 36px;
  font-size: 14px;
  position: relative;
  display: flex;
  align-items: center;
  color: #4d4d4d;
  background: #FFFFFF;
  cursor: pointer;
  transition: background-size 0.3s;

  &.is-active {
    color: #FFFFFF !important;

    span, i {
      color: #FFFFFF !important;
    }
  }


  .collapse-item-action {
    width: 24px;
    position: absolute;
    right: 4px;
    display: flex;
    align-items: center;

    > i {
      cursor: pointer;
    }
  }

  .collapse-item-content {
    width: calc(100% - 32px);
    padding-left: 12px;
    overflow: hidden;
    font-size: 16px;
  }
}

.collapse-main {
  height: 100%;
}
</style>
