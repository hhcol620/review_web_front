export { }
/* 
  透明单例
  不需要调用特定的方法返回同一个实例
客户端或者使用者不许哟啊知道要按单例使用

*/

let Window = (function(){
  let window: Window;
  let Window = function (this: Window) { 
    if (window) { 
      return window
    } else {
      return (window=this)
    }
  }
  return Window;
})()
let w1 = new (Window as any)();
let w2 = new (Window as any)();
console.log(w1===w2)      /// true