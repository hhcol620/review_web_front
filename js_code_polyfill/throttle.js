// 函数节流
/**
 * 时间戳版
 */

function throttle(fn, wait = 300) {
  let lastTime = 0 // 这种的可以一开始就运行一次
  return function (...args) {
    let nowTime = new Date().getTime()
    if (nowTime - lastTime >= wait) {
      lastTime = nowTime
      fn.apply(this, args)
    }
  }
}

// 需要节流的方法
function test() {
  console.log('ok1')
}

let map = new Map()

function throttleFunc(fn) {
  if (map.has(fn)) return map.get(fn)
  map.set(fn, throttle(fn))
  return map.get(fn)
}
throttleFunc(test)()
for (let i = 0; i < 1000; i++) {}
throttleFunc(test)()

// 第二个肯定会被稀疏掉  只能打印一个
