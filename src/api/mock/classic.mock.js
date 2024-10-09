import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

const COMMON_PREFIX = '/template/api'
const code = '0'
const mocks = [
  {
    url: `${COMMON_PREFIX}/getClassicList`,
    methods: 'get',
    timeout: 1000,
    response: ({ query }) => {
      const total = 111
      const { name, type, startTime, endTime, pageNo, pageSize } = query
      const num = Math.min(total - (pageNo - 1) * pageSize, 20)
      const times = dayjs.duration(
        dayjs(endTime).diff(dayjs(startTime))
      ).as('seconds')
      return {
        code,
        data: {
          total,
          list: Array(num).fill(0).map((i, ii) => {
            const id = (pageNo - 1) * pageSize + ii
            return {
              id,
              name: name ? name + id : 'test' + id,
              type: type ? '类型' + type : '类型'  + (ii % 3 + 1),
              time: startTime
                ? dayjs(startTime).add(Math.floor(times * Math.random()), 's').format('YYYY-MM-DD HH:mm:ss')
                : dayjs().format('YYYY-MM-DD HH:mm:ss')
            }
          })
        }
      }
    }
  }
]

export default mocks
