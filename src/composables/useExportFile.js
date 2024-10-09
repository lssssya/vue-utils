export function useExportFile (fetchFunction) {
  const setBlob = async () => {
    fetchFunction.then((response) => {
      // 获取响应头
      const contentDisposition = response.headers['content-disposition'] || ''
      // 解析内容Disposition以获取文件名
      const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition)
      // 处理可能存在的URL编码问题
      const fileName = decodeURIComponent(matches && matches[1].replace(/['"]/g, ''))

      if ('msSaveOrOpenBlob' in navigator) {
        window.navigator.msSaveOrOpenBlob(response.data, fileName)
      } else {
        const blob = new Blob([response.data])
        const element = document.createElement('a')
        const href = window.URL.createObjectURL(blob) // 创建下载的链接
        element.href = href
        element.download = fileName
        document.body.appendChild(element)
        element.click() // 点击下载
        document.body.removeChild(element) // 下载完成移除元素
        window.URL.revokeObjectURL(href) // 释放掉blob对象
      }
    })
  }
  return {
    setBlob
  }
}
