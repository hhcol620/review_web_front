export { }

class Star{
  name:string
  state:string
  observers: any
  constructor(name: string) { 
    this.name = name
    this.state = ''
    this.observers = []
  }
  getState(state:string):string { 
    return this.state
    
  }
  setState(state: string) { 
    this.state = state
    this.notifyAllObservers() 
  }
  // 增加新的观察者
  attach(observer: any) { 
    this.observers.push(observer)
  }
  // 通知所有的观察者更新自己
  notifyAllObservers() { 
    if (this.observers.length > 0) { 
      this.observers.forEach((observer: any) => observer.update())
    }
  }
}

class Fan { 
  name: string
  star:any
  constructor(name:string,star:any){ 
    this.name = name
    this.star = star
    this.star.attach(this)
  }
  update() { 
    console.log(`star喜欢${this.star.getState}`)
  }
}

let star = new Star('A');
let f1 = new Fan('zhangsan',star)

star.setState('绿色')
//  star喜欢绿色  
// 代码没问题 好像是这个文件夹有问题