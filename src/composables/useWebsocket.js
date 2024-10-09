import { ref } from 'vue'

export const useWebsocket = (
  url,
  options
) => {

  const {
    handler = () => {},
    wsHeartBeatTime =  20 * 1000
  } = options

  /* websocket */
  let websocketInstance = null
  let wsLockReconnect = false
  const wsIntervalTimer = ref(null)
  const wsReconnectTimer = ref(null)

  // 创建ws
  const wsCreate = () => {
    if ('WebSocket' in window) {
      websocketInstance = new WebSocket(url)
      websocketInstance.onopen = () => {
        wsResetHeart()
        wsStartHeart()
        clearTimeout(wsReconnectTimer.value)
        console.log('WebSocket启动成功！')
      }
      websocketInstance.onmessage = res => {
        if (res && res.data !== 'ping') {
          const data = JSON.parse(res.data)
          /* 处理逻辑 */
          handler(data)
        }
      }
      websocketInstance.onerror = err => {
        wsReconnect(url)
      }
      websocketInstance.onclose = res => {
        wsReconnect(url)
      }
    } else {
      console.log('当前浏览器 Not support websocket')
    }
  }
  // 重连机制
  const wsReconnect = () => {
    if (wsLockReconnect) return
    wsLockReconnect = true
    wsCreate()
    wsReconnectTimer.value = setTimeout(() => { // 没连接上会一直重连，设置延迟避免请求过多
      wsLockReconnect = false
      wsReconnect()
    }, 10 * 1000)
  }
  // 重置定时
  const wsResetHeart = () => {
    // 重置定时
    wsIntervalTimer.value && clearInterval(wsIntervalTimer.value)
  }
  // 开始Ws
  const wsStartHeart = () => {
    // 开启定时
    wsIntervalTimer.value = setInterval(() => {
      // 心跳时间内收不到消息，开始重连
      websocketInstance && websocketInstance.send('ping')
    }, wsHeartBeatTime)
  }

  return {
    wsCreate
  }
}
