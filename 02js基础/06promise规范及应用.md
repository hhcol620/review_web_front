# promise基础



### 准备工作

####  回调函数的分类  

* 同步回调函数

  * ``` javascript
    //同步的回调函数
    const arr = [1,3,5];
    arr.forEach(item=>{                    ////   遍历回调,,,  同步回调函数          不放入队列,直接执行
        console.log(item);
    })
    console.log('forEach()之后')
    
    //上面的代码输出结果为  1   3    5     forEach()之后
    //打印结果如下
    ```

  * ![image-20200817102440127](C:\Users\L\AppData\Roaming\Typora\typora-user-images\image-20200817102440127.png)

* 异步回调函数

  * ``` javascript
    // 异步回调函数
    setTimeout(()=>{
        console.log('timeout callback()')                      //  回调事件会被放到异步任务队列     等待异步任务触发条件达成,将其回调事件添加到任务队列中等待,js引擎进程空闲,系统读取任务队列,将可运行的异步任务回调事件添加到执行栈开始执行....
    },0)
    console.log('setTimeout() 之后')
    
    
    //打印结果如下
    
    ```

  * ![image-20200817102405502](C:\Users\L\AppData\Roaming\Typora\typora-user-images\image-20200817102405502.png)

  

* 常见的内置错误
  * RegerenceError   引用变量不存在
  * TypeError   数据类型不正确的错误
  * RangeError   数据值不在其所允许的范围内
  * SyntaxError   语法错误

* 错误处理
  * 捕获错误  try   ...  catch
  * 抛出错误  throw    error
* 错误对象
  * message属性:  错误相关信息
  * stack属性:  函数调用栈记录信息



### promise是什么

* promise是js中进行异步编程的新的解决方案(旧的呢?? ---  回调机制)
* 从语法上说 :  promise是一个构造函数
* 从功能上说: promise对象用来封装一个异步操作并可以获取其结果

状态:  

三种状态    pending  未确定的  resolved 成功  rejected  失败  

状态只能修改一次并且不可逆





怎么使用呢??

``` javascript
const p = new Promise((resolve,reject)=>{
	//   比如这里判断数字是否为一个偶数   如果为偶数则resolve  否则reject
  setTimeout(()=>{
  	const time = Date.now()
    if(time%2===0){
		resolve('随机数是偶数');
    }else{
		reject('随机数是奇数')
    }
  },1000)

})

p.then(value=>{console.log(value)},reason=>{console.log(reason)})
```

![image-20200817113510469](C:\Users\L\AppData\Roaming\Typora\typora-user-images\image-20200817113510469.png)







`指定回调函数的方式更加灵活 `

`1.    旧的必须要启动异步任务之前指定   任务执行成功失败的回调函数`

`promise:  启动异步任务=>  返回promise对象=> 给promise对象绑定回调函数(甚至可以在异步任务结束前指定)`

`2.   promise 支持链式调用,可以解决回调地狱的问题 `

` 什么是回调地狱呢???      回调函数嵌套调用,外部回调函数异步执行的结果是嵌套的回调函数的执行条件`

`回调地狱的缺点:  不便于阅读/不便于异常处理`

`解决方案: promise链式调用   处理异常只需要在调用的最后添加一个.catch(错误处理的回调函数)`

`终极解决方案: async/await `