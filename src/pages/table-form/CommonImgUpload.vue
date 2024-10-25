<template>
  <div class="container">
    <el-upload
      class="upload-image"
      :accept="acceptType.join(',')"
      :action="action"
      list-type="picture-card"
      :limit="limit"
      :single-file="limit === 1"
      :file-list="proxy"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-upload="handleBeforeUpload"
      :on-exceed="handleUploadExceed"
      :on-success="handleUploadSuccess"
      :on-error="handleUploadError"
      :on-change="handleUploadChange"
      :on-progress="handleUploadProgress"
    >
      <i
        class="h-icon-add"
        style="margin-top: 24px;"
      ></i>
      <div class="upload-img-text">上传</div>
    </el-upload>
    <h-img-preview
      ref="previewRef"
      theme="light"
      :visible.sync="previewVisible"
      :data="proxy"
      show-album
    >
      <template slot="btnGroup">
        <el-button
          icon="h-icon-search"
          @click="prev"
        >
          上一个
        </el-button>
        <el-button
          icon="h-icon-search"
          @click="next"
        >
          下一个
        </el-button>
        <el-button
          icon="h-icon-search"
          @click="reset"
        >
          适当尺寸
        </el-button>
      </template>
    </h-img-preview>
  </div>
</template>
<script setup>
import { ref, nextTick, computed } from 'vue'
import { Message } from 'hui'

/* model */
const emit = defineEmits()
const props = defineProps({
  value: { type: Array, default: () => [] },
  action: { type: String, default: '' },
  limit: { type: Number, default: 3 }
})
const proxy = computed({
  get () {
    return props.value
  },
  set (v) {
    // 这里由于是vue2, v-model的本质 还是 value 和 input 事件
    // vue3 可以改写成 modelValue 和 update:modelValue
    emit('input', v.map(e => e.response.data))
  }
})


/* action */
const acceptType = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/bmp'
]
const acceptTypeName = [
  'jpg',
  'jpeg',
  'png',
  'bmp',
]
const maxSize = 5
const handleBeforeUpload = (file) => {
  let { size, type } = file

  const isRightType = acceptType.includes(type)
  const isRightSize = size / 1024 / 1024 <= maxSize

  if (!isRightType) {
    Message.error('图片类型错误')
  }
  if (!isRightSize) {
    Message.error('图片大小错误')
  }
  return isRightType && isRightSize
}
const handleUploadSuccess = (response, file, fileList) => {
  emit('progress', false)
  if (response.code === '0') {
    proxy.value = fileList
  } else {
    Message.error(response.msg)
  }
}
const handleUploadError = () => {
  emit('progress', false)
  Message.error('图片上传失败')
}
const handleUploadExceed = () => {
  Message.error(`图片限制在${ props.limit }个以内`)
}
const handlePreview = (file) => {
  const select = proxy.value.findIndex(e => e.uid === file.uid)
  previewVisible.value = true
  nextTick(() => {
    previewRef.value.$selected(select)
  })
}
const handleRemove = (file, fileList) => {
  proxy.value = fileList
}
const handleUploadChange = () => {

}
const handleUploadProgress = (event, file, fileList) => {
  emit('progress', true)
}


/* img preview */
const previewRef = ref('previewRef')
const previewVisible = ref(false)
const prev = () => {
  previewRef.value.$prev()
}
const next = () => {
  previewRef.value.$next()
}
const reset = () => {
  previewRef.value.$resetImgView()
}
</script>
<style
  lang="scss"
  scoped
>
</style>
