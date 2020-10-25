// 主要解决的是
// +0===-0  返回为true  想返回为false
// NaN===NaN 返回为false  想返回为true
const is = (x, y) => {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y
  } else {
    return x !== x && y !== y
  }
}

console.log(is(NaN, NaN)) //true
