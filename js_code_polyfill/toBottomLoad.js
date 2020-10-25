//  触底加载

/**
 * 原理就是监听页面滚动的事件  分析clientHeight scrollTop scrollHeight 三者的属性关系
 */

window.addEventListener(
  'scroll',
  function () {
    const clientHeight = document.documentElement.clientHeight
    const scrollTop = document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    if (clientHeight + scrollTop >= scrollHeight) {
      // 此时已经触底 进行后续操作 比如加载下一页的内容
    }
  },
  false
)
