/**
 * 可以给img标签统一自定义属性src="default.png"，当检测图片出现在在窗口之后再补充src属性，此时才会进行图片资源加载
 */

function lazyLoad() {
  const imgs = document.getElementsByName('img')
  const len = imgs.length
  // 视口高度
  const vHeight = document.documentElement.clientHeight
  // 滚动条高度
  const scrollHeight =
    document.documentElement.scrollTop || document.body.scrollTop
  for (let i = 0; i < len; i++) {
    const offsetHeight = imgs[i].offsetTop
    if (offsetHeight < vHeight + scrollHeight) {
      const src = imgs[i].dataset.src //这个是获取html上自定义属性 <img src="" alt="" data-src='真实图片地址' src='default.png'/>
      imgs[i].src = src
    }
  }
}

// 可以使用 节流 优化一下  具体参考throttle.js
window.addEventListener('scroll', lazyload)
