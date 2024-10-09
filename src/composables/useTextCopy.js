import { Message } from 'hui'

export function useCopy (text) {
  const setCopy = () => {
    const element = document.createElement('input')
    element.setAttribute('value', text)
    document.body.appendChild(element)
    element.select()
    document.execCommand('copy')
    document.body.removeChild(element)
    Message.success('复制成功')
  }
  return {
    setCopy
  }
}
