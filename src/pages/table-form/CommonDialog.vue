<template>
  <el-dialog
    :title="title"
    :visible.sync="proxy"
    size="small"
    @close="handleClose"
  >

    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        type="primary"
        @click="handleConfirm"
      >确 定
      </el-button>
      <el-button @click="proxy = false">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script setup>
import { computed } from 'vue'

/* model */
const emit = defineEmits(['update:value'])
const props = defineProps({
  value: Boolean,
  current: Object
})
const proxy = computed({
  get () {
    return props.value
  },
  set (v) {
    // 这里由于是vue2, v-model的本质 还是 value 和 input 事件
    // vue3 可以改写成 modelValue 和 update:modelValue
    if (v) {
      fetchGetDetail()
    }
    emit('input', v)
  }
})

const title = computed(() => {
  return '弹窗'
})

/* detail */
const fetchGetDetail = () => {

}

const handleConfirm = async () => {
  proxy.value = false
}
const handleClose = () => {

}
</script>
<style
  lang="scss"
  scoped
>
</style>
