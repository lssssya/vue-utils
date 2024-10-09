export function useSmartPromiseInterval () {
  const runningTasks = new Set()
  const runningHandlers = new Map()

  let id = 0
  const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  const run = async (
    id,
    ...[handler, interval = 0]
  ) => {
    while (runningTasks.has(id)) {
      const startTime = new Date().getTime()
      runningHandlers.set(id, handler())
      try {
        await runningHandlers.get(id)
      } catch (e) {
        throw e
      } finally {
        runningHandlers.delete(id)
      }
      await delay(interval - new Date().getTime() + startTime)
    }
  }

  const clearPromiseInterval = async (intervalId) => {
    if (typeof intervalId === 'number' && runningTasks.has(intervalId)) {
      if (runningHandlers.has(intervalId)) {
        await runningHandlers.get(intervalId)
      }
      runningTasks.delete(intervalId)
    }
  }

  const setPromiseInterval = (
    handler,
    interval
  ) => {
    id += 1
    runningTasks.add(id)
    run(id, handler, interval)
    return id
  }

  return {
    clearPromiseInterval,
    setPromiseInterval
  }
}

const {setPromiseInterval} = useSmartPromiseInterval()
setPromiseInterval(()=>{}, 1000)
