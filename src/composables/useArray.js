export function useArray () {
  // 判断 数组是否包含某个元素
  const checkArrayIncludes = (array, value, key) => {
    return array.map(item => item[key]).includes(value[key])
  }

  return {
    checkArrayIncludes
  }
}
