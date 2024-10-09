import { reactive, toRefs } from 'vue'

export function usePagination ({
  fetchCallback,
  config
}) {
  const pageReset = () => {
    return {
      pageNo: 1,
      pageSize: config?.pageSize || 20,
      pageSizes: config?.pageSizes || [10, 20, 50, 100],
      total: 0
    }
  }
  const pageState = reactive({
    page: pageReset()
  })
  const handleSizeChange = val => {
    pageState.page.pageSize = val
    if (pageState.page.pageNo === 1) {
      fetchCallback()
    }
    pageState.page.pageNo = 1
  }
  const handleCurrentChange = val => {
    pageState.page.pageNo = val
    fetchCallback()
  }
  const resetPage = () => {
    pageState.page = pageReset()
  }
  return {
    ...toRefs(pageState),
    handleCurrentChange,
    handleSizeChange,
    resetPage
  }
}
