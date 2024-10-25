<template>
  <div class="container">
    <el-upload
      drag
      class="upload-image"
      :accept="acceptType.join(',')"
      :action="action"
      :limit="limit"
      :file-list="files"
      :on-remove="handleRemove"
      :before-upload="handleBeforeUpload"
      :on-exceed="handleUploadExceed"
      :on-success="handleUploadSuccess"
      :on-error="handleUploadError"
      :on-change="handleUploadChange"
      :on-progress="handleUploadProgress"
    >
      <div class="upload-drag-picture">
        <div class="single-arrow" />
      </div>
      <div class="upload-drag-title">
        点击或拖拽文件至此处
      </div>
      <div class="upload-drag-text">
        支持格式{{ acceptType.join('/') }}，文件大小在{{ maxSize }}MB以内
      </div>
    </el-upload>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import { Message } from 'hui'

/* model */
const emit = defineEmits()
const props = defineProps({
  value: { type: Array, default: () => [] },
  action: { type: String, default: '' },
  limit: { type: Number, default: 1 }
})
const proxy = computed({
  get () {
    return props.value
  },
  set (v) {
    emit('input', v)
  }
})

/* 内部的文件对象 */
// const files = ref([])
const files = computed({
  get () {
    /* 组装对内的 file-list */
    return proxy.value.map(e => ({
      uid: new Date().getTime(),
      name: e.fileName,
      response: {
        data: e
      }
    }))
  },
  set (v) {
    /* 组装对外的接口数据 */
    proxy.value = v.map(e => ({
      fileKey: e.response.data,
      fileName: e.name
    }))
    return v
  }
})


/* action */
const acceptType = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
]
const acceptTypeName = [
  'xlsx',
  'xls',
]
const maxSize = 10
const handleBeforeUpload = (file) => {
  let { size, type } = file
  const isRightType = acceptType.includes(type)
  const isRightSize = size / 1024 / 1024 <= maxSize

  if (!isRightType) {
    Message.error('文件类型错误')
  }
  if (!isRightSize) {
    Message.error('文件大小错误')
  }
  return isRightType && isRightSize
}
const handleUploadSuccess = (response, file, fileList) => {
  emit('progress', false)
  if (response.code === '0') {
    files.value = fileList
    emit('success')
  } else {
    Message.error(response.msg)
  }
}
const handleUploadError = () => {
  emit('progress', false)
  Message.error('文件上传失败')
}
const handleUploadExceed = () => {
  Message.error(`文件限制在${ props.limit }个以内`)
}
const handleRemove = (file, fileList) => {
  files.value = fileList
}
const handleUploadChange = () => {
  emit('change')
}
const handleUploadProgress = (event, file, fileList) => {
  emit('progress', true)
}
</script>
<style
  lang="scss"
  scoped
>
.container {
  width: 480px;

  ::v-deep .el-upload-dragger {
    width: 480px;
  }
}

.upload-drag-picture {
  position: relative;
  margin: 0 auto 0;
  width: 48px;
  height: 62px;
  border-radius: 4px;
  background: linear-gradient(225deg, transparent 50%, #00000014 50%, #00000014) no-repeat 100% 0 / 18px 18px,
  linear-gradient(225deg, transparent 12.75px, #00000014 0);

  .single-arrow {
    width: 6px;
    height: 10px;
    background-color: #00000052;
    position: absolute;
    left: 50%;
    margin-left: -3px;
    top: 50%;
    /* transform: rotate(-40deg); */
    /* 旋转角度 */
  }

  .single-arrow::after {
    content: '';
    display: block;
    position: absolute;
    top: -10px;
    left: -6px;
    border-bottom: 10px solid #00000052;
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
  }
}

.upload-drag-title {
  margin-top: 12px;
  font-size: 16px;
  font-weight: 500;
  color: var(--h-color-text-caption); /* text/text-caption */
}

.upload-drag-text {
  margin-top: 4px;
  color: var(--h-color-text-tertiary); /* text/text-tertiary */
}
</style>
