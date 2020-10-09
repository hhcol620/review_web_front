export { }
/* 
  Es5实现单例
*/

function Window() { }

Window.prototype.hello = function () { 
  console.log('hello')
}
// 静态方法       使用立即执行函数和闭包
Window.getInstance= (function () {
  let window: Window;  //下面使用一个闭包,用这个变量保存实例 
  return function () { 
    if (!window) { 
      window = new(Window as any)
    }
    return window
  }
})()
let w1 = Window.getInstance()
let w2 = Window.getInstance()
console.log(w1===w2)   //true