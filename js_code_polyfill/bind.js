/**
 * 绑定this指向
 */
// 这里面使用了闭包 返回一个函数
Function.prototype.bind = function (context, ...args) {
  if (typeof this !== 'function') {
    console.log(this)
    throw new TypeError('caller is not function')
  }
  let self = this // 这个指向调用者-方法

  return function F(...argss) {
    if (this instanceof F) {
      return new self(...args, ...argss)
    }
    return self.call(context, ...args, ...argss)
  }
}

function Point(x, y) {
  this.x = x
  this.y = y
}

Point.prototype.toString = function () {
  return this.x + ',' + this.y
}

var emptyObj = {}
var YAxisPoint = Point.bind(emptyObj, 0 /*x*/)

var axisPoint = new YAxisPoint(5)
axisPoint.toString() // '0,5'
