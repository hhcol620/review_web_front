/* 实现一个find函数，接收一个参数value，返回所有满足该值的id数组
find(3); // 返回数组[c,f] */

Array.prototype.find = function (value) {
  let arr = this
  let val = value
  let res = []
  function recursion(arr) {
    arr.map((item) => {
      if (item.value === val) {
        res.push(item.id)
      }
      if (item.children) {
        recursion(item.children)
      }
    })
  }
  recursion(arr)
  return res
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

console.log(arr.find(3))
