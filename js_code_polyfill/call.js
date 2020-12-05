/**
 * 绑定this指向  和apply基本是一样的
 *
 */
Function.prototype.call = function (context = window, ...args) {
  //
  if (typeof this !== 'function') {
    throw new TypeError('caller is not function')
  }
  const fn = Symbol('fn')
  context[fn] = this
  const res = context[fn](...args)
  delete context[fn]
  return res
}

var array = ['a', 'b']
var elements = [0, 1, 2]
array.push.call(array, ...elements)
console.info(array) // ["a", "b", 0, 1, 2]

Function.prototype.call = function (context = window, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('call is not function')
  }
  const fn = Symbol('fn')
  context[fn] = this
  const res = context[fn](...args)
  delete context[fn]
  return res
}
