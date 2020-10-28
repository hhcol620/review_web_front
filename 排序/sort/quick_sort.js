// 快速排序
function quickFunc(arr) {
  // 递归出口
  if (arr.length <= 1) {
    return arr
  }
  let left = []
  let right = []
  let middleIdx = Math.floor(arr.length / 2) // 中间位置下标
  let middle = arr.splice(middleIdx, 1)[0] // 中间位置的数字作为参考数 比这个数字小的放在右边  比这个数字大的放在左边
  for (let i = 0; i < arr.length; i++) {
    arr[i] < middle ? left.push(arr[i]) : right.push(arr[i])
  }
  return quickFunc(left).concat(middle, quickFunc(right))
}

let arr = [1, 2, 4, 8, 0, 4, 32, 99, 88, 33]

console.log(quickFunc(arr))
