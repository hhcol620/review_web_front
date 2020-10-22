// 归并法排序
// 将数组分成左右两段,将两端分别排序,再根据大小合并到一起

let arr = [1, 2, 5, 7, 2, 0, 6, 4, 12, 56]

function mergeSort(arr) {
  let len = arr.length
  if (len < 2) return arr
  let mid = Math.floor(len / 2)
  let left = arr.slice(0, mid)
  let right = arr.slice(mid)
  return merge(mergeSort(left), mergeSort(right))
}

function merge(arr1, arr2) {
  if (arr1.length == 0) return arr2
  if (arr2.length == 0) return arr1
  let res = []
  let r1 = 0,
    r2 = 0,
    i = 0
  while (arr1[r1] !== undefined && arr2[r2] !== undefined) {
    res[i] = arr1[r1] < arr2[r2] ? arr1[r1++] : arr2[r2++]
    i++
  }
  let bool = arr1[r1]
  return res.concat(bool ? arr1.slice(r1) : arr2.slice(r2))
  // return res
}

let res = mergeSort(arr)
console.log(res)

// let res = merg([1, 4, 6], [0, 3, 4, 9])
// console.log(res)
