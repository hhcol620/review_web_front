// 渲染大量数据时,合理使用createDocumentFragment和requestAnimationFrame,将操作切分为一小段执行

// 插入100000条数据
const total = 100000
// 一次插入的数据条数
const once = 20
// 插入数据需要次数
const loopCount = Math.ceil(total / once)
let countOfRender = 0

const ulEle = document.querySelector('ul')
// 添加数据的方法
function add() {
  const fragment = document.createDocumentFragment() //创建判断
  for (let i = 0; i < once; i++) {
    const li = document.createElement('li')
    li.innerText = Math.floor(Math.random() * total)
    fragment.appendChild(li)
  }
  ul.appendChild(fragment)
  countOfRender += 1
  loop()
}
function loop() {
  if (countOfRender < loopCount) {
    window.requestAnimationFrame(add)
  }
}

loop()
