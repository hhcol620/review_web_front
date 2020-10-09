// 4、实现一个findStr函数，接受一个字符串数组，返回最长的重复字符串
findStr(['aecb', 'dcbc', 'fcbg']) // 返回值为 'cb'

// console.log('aaa'.split(''))

function findStr(arr) {
  let t_arr = [] //二维数组
  let long_arr = [] //记录以下t_arr  中最长的成员项
  let num = 0 //记录以下t_arr  中最长的成员项下标
  arr.forEach((item) => {
    t_arr.push(item.split(''))
  })
  t_arr.forEach((item, index) => {
    if (item.length > long_arr.length) {
      long_arr = item
      num = index
    }
  })
  let len = t_arr.length

  long_arr.forEach((item, index) => {
    for (let i = 0; i < len; i++) {
      if (i !== num) {
        // t_arr[i]
        t_arr.forEach((v, i) => {
          if (v === item) {
          }
        })
      }
    }
  })
  // 递归
}
