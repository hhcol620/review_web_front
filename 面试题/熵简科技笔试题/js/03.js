// 实现一个replace函数，接收两个字符串，将第二个字符串中所有和第一个字符串相同的字符串套上span标签
replace('a', 'abcadefga') // 返回值为 '<span>a</span>bc<span>a</span>defg<span>a</span>'

function replace(s, str) {
  let res = ''
  for (let point of str) {
    if (point === s) {
      res += `<span>${point}<span>`
    } else {
      res += point
    }
  }
  return res
}

console.log(replace('a', 'abcadefga'))
