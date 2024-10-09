import http from '../httpInstance'

const COMMON_PREFIX = ''
// 获取报警列表
export const getClassicList = params => {
  return http({
    method: 'get',
    url: '/getClassicList',
    params
  })
}
