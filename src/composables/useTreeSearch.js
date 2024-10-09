import { watch } from 'vue'

export function useTreeSearch (
  treeSearchKey,
  options
) {

  const {
    treeRef,
    treeState
  } = options

  const filterNode = (value, data) => {
    if (!value) return true
    return data[treeState.map.label].indexOf(value) !== -1
  }
  const highlightRender = (h, { node }) => {
    const name = node.label
    if (treeSearchKey.value) {
      // 支持大小写模糊搜索
      // specialCharts：特殊字符集合，这些字符不能直接塞进正则里，需要先转译
      const specialCharts = [
        '(',
        ')',
        '\'',
        '\\',
        '$',
        '*',
        '+',
        '[',
        ']',
        '?',
        '^',
        '{',
        '}',
        '|',
        '.'
      ]
      let wordStr = ''
      for (let i = 0, len = treeSearchKey.value.length; i < len; i++) {
        if (specialCharts.includes(treeSearchKey.value[i])) {
          wordStr += '\\' + treeSearchKey.value[i]
        } else {
          wordStr += treeSearchKey.value[i]
        }
      }
      const wordReg = new RegExp(wordStr, 'ig')
      const keyWordArr = name.match(wordReg)
      const vNodeArr = name.split(wordReg).reduce((all, item, index, arr) => {
        item && all.push(h('span', {}, item))
        if (index !== arr.length - 1) {
          all.push(
            h(
              'span',
              {
                class: 'el-tree-node_highlight'
              },
              keyWordArr.shift()
            )
          )
        }
        return all
      }, [])
      return h('span', { class: 'el-tree-node__label' }, vNodeArr)
    } else {
      return h('span', { class: 'el-tree-node__label' }, name)
    }
  }
  watch(treeSearchKey, (val) => {
    treeRef.value.filter(val, !val)
  })


  return {
    highlightRender,
    filterNode
  }
}
