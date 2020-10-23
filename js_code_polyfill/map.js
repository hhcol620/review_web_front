/**
 * Array.prototype.map(callback,thisArg)
 * 方法的作用是将数组中每一项传入callback中并将执行结果放入到一个数组中 return出来
 * 慎用箭头函数
 */

Array.prototype.map = function (callback, thisArg) {
  // 判断调用者是否存在  这个里面应该是数组调用  还有就是回调函数是否是函数
  if (this === null) {
    throw new TypeError('this is null or not defined')
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + 'this callback is not Function ')
  }
  let ans = [] // 用来存返回的数组

  // 可以判断这个thisArg是否存在  这个参数不是必须存在的 两种情况分别执行不同的逻辑
  if (thisArg !== undefined) {
    for (let i in this) {
      // 此时i为下标
      if (this.hasOwnProperty(i)) {
        // 此时表明是自身的属性  不是来自原型的属性 for in 循环会带上原型属性
        ans.push(callback.call(thisArg, this[i], i, this))
      }
    }
  } else {
    for (let i in this) {
      // 此时i为下标
      if (this.hasOwnProperty(i)) {
        // 此时表明是自身的属性  不是来自原型的属性 for in 循环会带上原型属性
        ans.push(callback(this[i], i, this))
      }
    }
  }
  return ans
}

let arr = [1, 2, 2, 3, 4, 5, 6, 7]

console.log(arr.map((item) => item * 2))

/**
 * 匿名函数的this指向调用对象
 * 上面的map方法使用匿名函数  函数内部的this指向调用的数组
 *
 *
 * 箭头函数没有自己的this，绑定为函数词法作用域的this的指向，既o的this的指向，window
 */
