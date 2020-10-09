export { }

class Window {
  // 声明静态变量存放实例
  private static instance: Window;
  private constructor() { }
  public static getIntance() { 
    if (!Window.instance) {
      return Window.instance = new Window();
    } else { 
      return Window.instance;
    }
  }
}

// 现在Window 就是一个单例的
let w1 = Window.getIntance()
let w2 = Window.getIntance()
console.log(w1 === w2)