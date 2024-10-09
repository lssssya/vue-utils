export function useRouterPush () {
  const commonRouterPush = ({ path, query, name = '' }) => {
    let queryString = ''
    for (const queryKey in query) {
      queryString += `${ queryKey }=${ query[queryKey] }&`
    }
    if (self === top) {
      const url = `${ window.location.origin }${ path }?${ queryString }`
      window.open(url)
    } else {
      const url = `${ path }?${ queryString }`
      // const url = `${ window.location.origin }${ window.location.pathname }#${ path }?${ queryString }`
      /* 门户 跳转 */
      const message = JSON.stringify({
        method: 'goToApp', argument: {
          url: url + '&timeStamp=' + new Date().getTime(),
          name
        }
      })
      console.log(message)
      window.parent.postMessage(message, '*')
    }
  }

  return {
    commonRouterPush
  }
}
