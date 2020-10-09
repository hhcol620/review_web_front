export { }
/* 
  需要适配的类
*/
class Socket{
  output() { 
    return '220v'
  }
}

// 定义一个抽象类  其中有抽象方法
abstract class Power{
  abstract charge(): string;
}

class PowerAdaptor extends Power{
  constructor(public socket:Socket) {
    super()
  }
  charge(): string{   //必须实现抽象方法
    return this.socket.output()+'转换为了5v'
  }
}
let adaptor = new PowerAdaptor(new Socket())
console.log(adaptor.charge())