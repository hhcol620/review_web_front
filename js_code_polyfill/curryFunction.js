/**
 * 柯里化函数
 * 指的就是将一个接收多个参数的函数变为接收一个参数返回一个函数的固定形式,这样便于再次调用(链式调用)
 */

//  常见面试题  add(1)(2)(3)(4)

function add(...args) {
  let ans = []
  ans.push(...args) // 将第一个的参数存入ans数组里面
  function fn(...args) {
    ans.push(...args)
    return fn
  }
  fn.toString = function () {
    return ans.reduce((accVal, curVal) => accVal + curVal)
  }
  return fn
}

let num = add(1)(2)(3)(4)
console.log(num) // node 环境执行不会自动的调用这个方法 toString()
// 浏览器环境会直接获取调用toString方法

// 所以node 环境下需要 下面这种方式
//num.toString();
