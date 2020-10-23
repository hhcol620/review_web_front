// reduce两个参数  reducer回调必选 initVal可选

Array.prototype.reduce = function (reducer, initVal = 0) {
  /**
   * reducer 回调函数接收4个参数:
   * Accumulator (acc) (累计器)
   * Current Value (cur) (当前值)
   * Current Index (idx) (当前索引)
   * Source Array (src) (源数组)
   *
   */
  // reducer  (x,y)=>x+y
  // reducer (Accumulator,CurrentVal,CurrentIdx,array)
  // 首先检测调用的this是否为空
  if (this === null) {
    throw new TypeError(
      'Array.prototype.reduce ' + 'called on null or undefined'
    )
  }
  // 检测回调
  if (typeof reducer !== 'function') {
    throw new TypeError(reducer + ' is not a function')
  }
  let len = this.length
  let acc = this[0] || 0
  // 标识调用者数组长度大于2
  for (let i = 1; i < len; i++) {
    acc = reducer(acc, this[i], i, this)
  }
  return acc
}

let arr = []
let num = arr.reduce((acc, cur, i, T) => acc + cur)
console.log(num)
