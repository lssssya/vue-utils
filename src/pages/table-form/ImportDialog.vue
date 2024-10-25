<template>
  <el-dialog
    title="导入"
    :visible.sync="proxy"
    :area="[480,240]"
    :show-close="false"
    @close="handleClose"
  >
    <div class="upload-wrap">
      <el-upload
        style="width: 100%"
        ref="uploadRef"
        :data="data"
        :headers="headers"
        :accept="acceptType.join(',')"
        :action="uploadUrl"
        :show-file-list="false"
        :before-upload="handleBeforeUpload"
        :on-success="handleUploadSuccess"
        :on-error="handleUploadError"
        :on-change="handleUploadChange"
        :on-progress="handleUploadProgress"
        name="file"
        :auto-upload="false"
      >
        <el-input
          style="width: 256px"
          v-model="form.fileName"
          placeholder="选择导入文件"
          readonly
        >
          <el-button
            slot="append"
            icon="h-icon-folder"
          />
        </el-input>
      </el-upload>
      <div class="tips-wrap">
        <a
          class="download-template"
          :href="downloadTemplateUrl"
        >
          下载模板
        </a>
        <div class="tips">
          支持导入文件大小在{{ maxSize }}M以内的 .xlsx .xls 格式文件。
        </div>
      </div>
    </div>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        type="primary"
        :disabled="!(form.fileName)"
        @click="handleConfirm"
        :loading="loading.save"
      >确 定
      </el-button>
      <el-button @click="handleCloseClick">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script setup>
import { computed, nextTick, ref } from 'vue'
import { Message, MessageBox } from 'hui'
import { getToken } from '@/api/httpInstance'

const headers = {
  'X-CSRF-TOKEN': getToken()
}

/* model */
const emit = defineEmits(['update:value'])
const props = defineProps({
  value: Boolean,
  downloadTemplateUrl: String,
  uploadUrl: String,
  data: {
    type: Object,
    default: () => ({})
  }
})
const proxy = computed({
  get () {
    return props.value
  },
  set (v) {
    if (form.value.fileName) {
      reset()
    }
    // 这里由于是vue2, v-model的本质 还是 value 和 input 事件
    // vue3 可以改写成 modelValue 和 update:modelValue
    emit('input', v)
  }
})

/* form */
const formReset = () => ({
  fileName: ''
})
const form = ref(formReset())
const uploadButtonRef = ref('uploadButtonRef')
const handleInputClick = (event) => {
  if (event.target.className === 'el-input__inner') {
    uploadButtonRef.value.$el.click()
  }
}

/* upload */
const acceptType = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel'
]
const maxSize = 5
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
  loading.value.save = false
  emit('progress', false)
  if (response.code === '0') {
    emit('success')
    Message.success('导入成功！')
    proxy.value = false
  } else {
    reset()
    MessageBox({
      title: '导入失败',
      type: 'error',
      message: response.msg,
      confirmButtonText: '关闭',
      dangerouslyUseHTMLString: true
    })
  }
}
const handleUploadError = () => {
  loading.value.save = false
  emit('progress', false)
  Message.error('文件上传失败')
  reset()
}
const handleUploadChange = (file) => {
  form.value.fileName = file.name
}
const handleUploadProgress = (event, file, fileList) => {
  loading.value.save = true
}
const reset = () => {
  nextTick(() => {
    form.value.fileName = ''
    uploadRef.value.clearFiles()
  })
}

/* loading */
const loading = ref({
  save: false
})
const uploadRef = ref('uploadRef')
const handleConfirm = async () => {
  if (form.value.fileName) {
    uploadRef.value.submit()
  } else {
    Message.error('请选择上传文件')
  }

}
const handleCloseClick = () => {
  uploadRef.value.abort()
  proxy.value = false
}
const handleClose = () => {

}
</script>
<style
  lang="scss"
  scoped
>
.upload-wrap {
  margin-top: 16px;
}

.tips-wrap {
  margin-top: 16px;

  .download-template {
    font-size: 14px;
    color: #2196f3;
    text-decoration: none;
  }

  .tips {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.40);
    letter-spacing: 0;
    line-height: 18px;
  }
}
</style>
