/**
 * Object.assign()  方法用于将所有可枚举属性的值从一个或多个源对象赋值到目标对象.  将返回目标对象(这个过程是一个浅拷贝)
 */

Object.defineProperty(Object, 'assign', {
  value: function (target, ...args) {
    if (target === null || target === undefined) {
      return new TypeError('Cannot convert undefined or null to object')
    }
    // 目标对象需要统一是引用数据类型,若不是自动转换
    const to = Object(target)
    for (let i = 0; i < args.length; i++) {
      // 使用for in循环需要配合hasOwnProperty双重判断,确保只拿到本身的属性,方法(不包含继承的属性)
      const nextSource = args[i]
      if (nextSource !== null) {
        for (const itemKey in nextSource) {
          if (Object.prototype.hasOwnProperty.call(nextSource, itemKey)) {
            to[itemKey] = nextSource[itemKey]
          }
        }
      }
    }
    return to
  },
  enumerable: false,
  writable: true,
  configureable: true
})

let o1 = { a: 1, b: 2 }
let o2 = { c: 3, b: 7 }

let c = Object.assign(o1, o2, o2, o2, o2) //  因为是放到了一个对象里面,key是字符串,所以相等的key值的话,后面的val就会覆盖前面的val

console.log(o1)
