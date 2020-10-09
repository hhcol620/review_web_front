/* 实现一个group函数，将所有id根据value进行分组返回
group(); // 返回数组 [[a],[b],[c,f],[d,g],[e,h]] */

Array.prototype.group = function () {
  var arr = this
  var res = []
  var resMap = new Map()
  function recursion(arr) {
    arr.map((item) => {
      res.push(item)
      if (item.children) {
        recursion(item.children)
        delete item.children
      }
    })
  }
  recursion(arr)
  // res.map((item) => {
  //   if (!values.includes(item.value)) {
  //     // 表述该项数组中没有
  //     ids.push([item.id])
  //   } else {
  //     ids.push()  // 不能这种方式  这种放到两个数组中在两个value相同的情况下  无法存id   采用其他的办法map??  数组里面的value=> key       数组里面ids=>value  查找的时候使用has
  //   }
  // })
  /* res
    [
  { id: 'a', value: 1 },
  { id: 'b', value: 2 },
  { id: 'c', value: 3 },
  { id: 'd', value: 4 },
  { id: 'e', value: 5 },
  { id: 'f', value: 3 },
  { id: 'g', value: 4 },
  { id: 'h', value: 5 }
]
  
  */
  res.map((item) => {
    // resMap.set(item.value, [item.id])
    if (resMap.has(item.value)) {
      // resMap.set(item.value, resMap.get(item.value).push(item.id))
      resMap.set(item.value, resMap.get(item.value).concat(item.id))
      // console.log(resMap.get(item.value).concat(item.id))
    } else {
      resMap.set(item.value, [item.id])
    }
  })

  return [...resMap.values()]
}

var arr = [
  {
    id: 'a',
    value: 1,
    children: [
      {
        id: 'b',
        value: 2,
        children: [
          {
            id: 'c',
            value: 3,
          },
          {
            id: 'd',
            value: 4,
          },
          {
            id: 'e',
            value: 5,
          },
        ],
      },
    ],
  },
  {
    id: 'f',
    value: 3,
  },
  {
    id: 'g',
    value: 4,
    children: [
      {
        id: 'h',
        value: 5,
      },
    ],
  },
]

console.log(arr.group())
