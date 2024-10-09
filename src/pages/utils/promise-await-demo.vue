<template>
  <div class="container">
    promise
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue'


/* 场景
*
* 比如地图数据从外部接口传入，每次都是需要走props和watch做变更的，保证逻辑的流畅性：接口->数据传递->地图组件接收->渲染
* 但是地图在mounted（哪怕是created）加载时，数据进入就有先后的不确定性你也不知道谁先谁后。接口->数据传递->地图组件接收（地图这时候加载好了吗？）->渲染
* 可能数据进入了，watch监听了结果执行回调，但是地图还没好，调用上图之类的api直接报错。
*
* 常规做法：在watch判断，如果没有地图实例，那就return。然后在地图渲染之后主动获取一次props的数据，这样需要做处理的地方就有两份了，一个是watch到数据后常规处理，另一个就是地图渲染后，做跟watch一样的数据处理，比较冗余。
* 如果能让他在watch里等一等地图渲染就好了。
* 思路来了：目标是在一个异步函数在多个作用域进行同步串行
*
*  */

const getRandom = () => {
  const result = Math.floor(Math.random() * 1000 * 5)
  console.log('本次random的时间', result)
  return result
}

const variableAFromProps = ref('')

// 模拟随机Prop进入
setTimeout(() => {
  variableAFromProps.value = 'init props'
  /* 数据第二次进入 */
  setTimeout(() => {
    console.log('数据变化第二次进入')
    variableAFromProps.value = 'new props'
  }, getRandom())
}, getRandom())

/* watch 监听外部修改的结果 */
watch(() => variableAFromProps.value, async (value) => {
  console.log(`数据进入，props值为${ value }，等待初始化`)
  /* 关键处理： 数据进入需等待 init 做完 */
  await initPromise
  console.log(initPromise)
  console.log(`数据监听已初始化结束，执行props值为${ value }后续逻辑`)
  instance.value.api()
})

const instance = ref({})
const init = async () => {
  console.log('初始化')
  const { data } = await fetchFunction()
  console.log(`初始化结束，值为：${ data }，赋予instance.api方法`)
  instance.value.api = () => {
    console.log('调用能力')
  }
}
const fetchFunction = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: 'done' })
    }, getRandom())
  })
}
let initPromise = null
onMounted(() => {
  /* 页面初始化加载 */
  initPromise = init()
  console.log(initPromise)
})

// const init = async () => {
//   return new Promise((resolve,reject)=>{
//     /* 做逻辑 */
//     fun2()
//
//     /* 关键api已经完备后， */
//     resolve()
//
//     /* 接着做后续的异步逻辑，不影响外部数据传入，两边同时进行 */
//     fun2()
//   })
// }

</script>
<style
  lang="scss"
  scoped
>
</style>
