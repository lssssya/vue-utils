import { computed, onMounted, ref } from 'vue'

export function useDict () {
  /* 异常操作分析 */
  const alarmEventTypeData = ref([])
  const fetchGetLogAlarm = async () => {
    const { data } = await API()
    alarmEventTypeData.value = data
  }
  onMounted(() => {
    fetchGetLogAlarm()
  })
  /* 正报误报 */
  const alarmEventStatusData = ref([
    { value: 0, label: '未处置' },
    { value: 1, label: '正报' },
    { value: 2, label: '误报' }
  ])
  /* 启用状态 */
  const enableStatusData = ref([
    { value: 1, label: '启用' },
    { value: 0, label: '未启用' }
  ])
  /* 性别 */
  const genderData = ref([
    { value: 1, label: '男' },
    { value: 2, label: '女' },
    { value: 0, label: '未知' }
  ])

  const dictCollection = {
    GENDER_DICT: {
      sourceRef: genderData,
      options: { key: 'value', value: 'label' }
    },
    ENABLE_STATUS_DICT: {
      sourceRef: enableStatusData,
      options: { key: 'value', value: 'label' }
    },
    ALARM_EVENT_TYPE_DICT: {
      sourceRef: alarmEventTypeData,
      options: { key: 'dicCode', value: 'dicName' }
    },
    ALARM_EVENT_STATUS_DICT: {
      sourceRef: alarmEventStatusData,
      options: { key: 'value', value: 'label' }
    }
  }

  return createOutput(dictCollection)
}

/* 字典工具 */
// 字段转对象
const _dictConvertObject = (array, { key, value }) => Object.fromEntries(array.map((item, index) => [key ? item[key] : index, value ? item[value] : item]))
// 字段转数组
const _dictConvertArray = (array, { key, value }) => array.map((item, index) => ({ value: key ? item[key] : index, label: value ? item[value] : item }))
// 输出
const createOutput = (collection) => {
  const result = {}
  for (const key in collection) {
    result[key] = computed(() => {
      const source = collection[key].sourceRef.value
      const options = collection[key].options
      return {
        list: _dictConvertArray(source, options),
        object: _dictConvertObject(source, options)
      }
    })
  }
  return result
}
