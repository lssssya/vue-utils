<template>
  <el-dialog
    :title="title"
    :visible.sync="proxy"
    :area="[600,480]"
    @close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-position="top"
      style="width: 480px;margin: 40px auto 0;padding-bottom: 64px;"
    >
      <el-form-item
        label="设备名称"
        prop="envDeviceName"
      >
        <el-input
          readonly
          v-model="form.envDeviceName"
          :maxlength="32"
        />
      </el-form-item>
      <el-form-item
        label="设备Key"
        prop="key"
      >
        <el-input
          v-model="form.key"
          :maxlength="32"
        />
      </el-form-item>
      <el-form-item
        label="设备Secret"
        prop="secret"
      >
        <el-input
          v-model="form.secret"
          :maxlength="32"
        />
      </el-form-item>
    </el-form>
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
import { computed, ref } from 'vue'
import { Message } from 'hui'

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
    if (v) {
      form.value = formReset()
      switch (currentComponentMode.value) {
        case 'add':
          break
        case 'edit':
          fetchGetDetail()
          break
      }
      setTimeout(() => {
        formRef.value.resetValidates()
      })
    }
    // 这里由于是vue2, v-model的本质 还是 value 和 input 事件
    // vue3 可以改写成 modelValue 和 update:modelValue
    emit('input', v)
  }
})

const currentComponentMode = computed(() => {
  return props.current?.id ? 'edit' : 'add'
})

const title = computed(() => {
  const set = { add: '新增', edit: '编辑' }
  return `${ set[currentComponentMode.value] }设备`
})

/* form */
const rules = {
  key: [
    { required: true, message: '请输入设备Key', trigger: 'blur, change' }
  ],
  secret: [
    { required: true, message: '请输入设备Secret', trigger: 'blur, change' }
  ]
}
const formRef = ref('formRef')
const formReset = () => ({
  envDeviceName: '',
  envDeviceIndexCode: '',
  key: '',
  secret: ''
})
const form = ref(formReset())

const fetchGetDetail = () => {
  form.value.envDeviceName = props.current.envDeviceName
  form.value.envDeviceIndexCode = props.current.envDeviceIndexCode
  form.value.secret = props.current.secret
  form.value.key = props.current.key
}

/* loading */
const loading = ref({
  save: false
})

const handleConfirm = async () => {
  formRef.value.validate(async valid => {
    if (valid) {
      loading.value.save = true
      const params = {
        envDeviceIndexCode: form.value.envDeviceIndexCode,
        key: form.value.key,
        secret: form.value.secret
      }

      const { code } = await (currentComponentMode.value === 'add' ? rulePersonListAdd : rulePersonListUpdate)(params).finally(() => {
        loading.value.save = false
      })
      if (code === '0') {
        Message.success('保存成功！')
        emit('success')
        proxy.value = false
      }
    }
  })
}
const handleClose = () => {

}
</script>
<style
  lang="scss"
  scoped
>
</style>
