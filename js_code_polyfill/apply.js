/**
 * 绑定this指向
 */
/**
 * @params : thisArg this指向   args 参数数组
 * @return :
 * @description :
 * @date : 2020-10-23 15:35
 * @author : hhcol_JS
 */

Function.prototype.apply = function (context = window, args) {
  // 此时的this应该为function
  if (typeof this !== 'function') {
    throw new TypeError('caller is not Function')
  }
  // 这个操作就是将this这个方法添加到context上面
  const fn = Symbol('fn')
  context[fn] = this

  const res = context[fn](...args)
  delete context[fn]
  return res
}

var array = ['a', 'b']
var elements = [0, 1, 2]
array.push.apply(array, elements)
console.info(array) // ["a", "b", 0, 1, 2]
