// 实现lodash.get
// 实现一个get方法 这个方法调用方式为get(obj, 'a.b[0].c')

const x = {a: {b: [{c: 1}]}}


function get(obj, str, defaultValue = null) {
  const keyList = str.replace(/\[(\d+)\]/g, '.$1').split('.')
  const kL = str.replace(/\[(\d+)\]/g, '.$1').split('.');
  console.log(kL)

  const result = keyList.reduce((acc, cur) => {
    return acc == null ? null : acc[cur]
  }, obj)
  return result === null ? defaultValue : result
}

console.log(get(x, 'a.b[0].c'))
console.log(get(x, 'a.b[0][0][0].c'))