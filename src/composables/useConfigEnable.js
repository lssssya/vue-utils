import { Message } from 'hui'

export function useConfigEnable ({
  fetchCallback,
  config = {
    key: 'id'
  }
}) {
  /* enable */
  const handleNodeSwitchChange = (value, row) => {
    fetchUpdateStatus(value, row[config.key])
  }
  const fetchUpdateStatus = async (status, id) => {
    /* 根据具体接口自己写吧 */
    const { data } = await API({
      dataId: id,
      show: status
    })
    if (data) {
      fetchCallback()
      Message.success('修改成功')
    }
  }
  return {
    handleNodeSwitchChange
  }
}
