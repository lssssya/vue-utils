import axios from 'axios'
const REQUEST_SUCCESS = '0'

const env = import.meta.env
const http = axios.create({
  timeout: 20000,
  withCredentials: true,
  baseURL: `/${env.VITE_APP_SERVICE}/${env.VITE_APP_SERVICE_PREFIX}`
})

// 相应拦截器
http.interceptors.response.use(
  function (response) {
    // 请求多语言的json文件
    if (/.*\.json$/.test(response.config.url)) {
      return response
    }
    // 对错误进行统一处理
    if (response.data.code !== REQUEST_SUCCESS) {
      if (response.data.msg) {
        // Message.error(response.data.msg)
      }
      return Promise.reject(response)
    }
    return Promise.resolve({
      code: response.data.code,
      msg: response.data.msg,
      data: response.data.data,
    })
  },
  function (error) {
    if (error.message.includes('timeout')) {
      // 多语言需要自己在项目中配置
      // Message.error('请求超时，请重试！')
    }
    return Promise.reject(error)
  },
)

// 请求拦截器
http.interceptors.request.use(
  function (config) {
    if (config.method === 'get') {
      // get请求加上时间戳
      config.params = { ...config.params, _t: Date.now() }
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

export default http
