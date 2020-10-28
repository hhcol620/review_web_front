// 冒泡法排序
function bubbleSort(arr) {
  for (var j = 0; j < arr.length - 1; j++) {
    // 这里要根据外层for循环的 j，逐渐减少内层 for循环的次数   // 因为后面的是排好序的
    for (var i = 0; i < arr.length - 1 - j; i++) {
      if (arr[i] > arr[i + 1]) {
        var temp = arr[i]
        arr[i] = arr[i + 1]
        arr[i + 1] = temp
      }
    }
  }
  return arr
}

let arr = [1, 2, 4, 7, 8, 3, 0]

console.log(bubbleSort(arr))

function bubble_sort(arr) {
  let len = arr.length
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let tmp = arr[j + 1]
        arr[j + 1] = arr[j]
        arr[j] = tmp
      }
    }
  }
  return arr
}

console.log(bubble_sort(arr))
