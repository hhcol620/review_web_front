### VIPKID面试题

* undefined和null的区别

  * ``` javascript
    undefined 
    1、已声明但未初始化或定义的对象
    
    2、不存在的数组索引或对象属性
    
    3、未提供的功能参数
    
    4、必须但不返回值的函数的返回值
    
    null
    是JavaScript中的一个关键字，表示没有值或者是任何值都不存在。
    
    ```

  * 二者类型不同   前者为undefined  后者却是object   (undefined派生自null值)

    * ![image-20200825220158054](C:\Users\L\AppData\Roaming\Typora\typora-user-images\image-20200825220158054.png)

  * 转换为原始类型的方式不同

    * ![image-20200825220816418](C:\Users\L\AppData\Roaming\Typora\typora-user-images\image-20200825220816418.png)
    * ![image-20200825220840395](C:\Users\L\AppData\Roaming\Typora\typora-user-images\image-20200825220840395.png)
  
* NaN是什么类型
  * 答案是number
  * ![image-20200825221216210](C:\Users\L\AppData\Roaming\Typora\typora-user-images\image-20200825221216210.png)

* class函数里面的super什么作用
  * ES6里面一个语法,class语法使原型的写法更加清晰,更加像面向对象编程的语法..
  
  * 在类的实例上调用方法,其实就是调用原型上的方法.
  
    * ![image-20200825211544194](C:\Users\L\AppData\Roaming\Typora\typora-user-images\image-20200825211544194.png)
  
    * b.constructor其实就是和B.prototype.constructor是一样的.  后面这个指向当前的构造函数
  
      * ``` javascript
        class Point(){
            construcor(){}
            toString()
            toValue()
        }
        
        //上面的写法相当于
        function Point(){}
        Point.prototype= {
             construcor(){}
            toString()
            toValue()
        }
        
        //  在类的实例上调用方法,其实就是调用原型上面的方法
         如果a是A类的实例对象,a.出来的就是类原型上的属性或者方法,
            class B(){}
        let b = new B();
        b.constructor === B.prototype.constructor     //  true 
        ```
  
      *   ` super有什么作用???`
      
        * 首先在construcor中调用super方法,这是因为子类没有自己的this对象,而是继承父类的this对象,然后对其进行加工..
        
          * ``` javascript
            class Point{
              constructor(x,y){
            	this.x = x;
                      this.y = y
              }
            	toString(){
                	console.log('point')
                }
              toLog(){
              	return 'log'
              }
            }
            class ColorPoint extends Point{
                	constructor(x,y,color){
                        	super(x,y);   //这个位置调用了父类的constructor方法  继承父类的this对象  执行this.x =x   this.y = y
                        	this.color = color;
                    }
                toString(){
                  		console.log('ok')
                    	return this.color+' '+super.toLog();    /// 调用了父类的toLog方法    super作为对象在普通方法中指向父类的原型对象,,可以通过.的方式访问父类的原型上的方法(也就是constructor外面的定义的方法)  不能通过super的方式访问父类的实例属性(如果的打印super.x 或者是super.y的话,是undefined)     如果在静态方法上把super当作对象使用,则指向父类,这就意味着如果在子类静态方法中调用super.x  或者是super.method()     要求x和这个method必须是静态属性,  可以直接通过父类.访问得到
                    
                    //还有一个需要注意的就是需要显式的指定是作为函数还是作为对象使用
                }
                static toLog(){
                    
                    console.log(super.x)
                }
            }
            
            var point= new Point('y','p');
            var colorPoint = new ColorPoint('a','b','c')
            console.log(colorPoint.toString())
            ColorPoint.toLog()
            ```
        
          * super  两种用法:
        
            *  super作为函数调用时,代表父类的构造函数,ES6要求子类的构造函数必须执行一次super函数   super虽然代表了父类的构造函数,但是返回的是子类的实例,即内部的this还是指向子类,如果B继承了A,那么调用super方法就相当于调用了A.prototype.constructor.call(this)     这里面的this就是子类B的this了
            *  super作为对象使用,  在普通方法中指向父类的原型对象,在静态方法中指向父类
  
* 浏览器输入url,发生了什么??    大概分为6步

  * DNS域名解析
    * 在浏览器DNS缓存中搜索
    * 在操作系统DNS缓存中搜索
    * 读取系统hosts文件,查找其中是否有对应的
    * 向本地配置的首选DNS服务器发起域名解析请求
  * 建立TCP连接
    * TCP协议采用三次握手策略,发送端首先发送一个带SYN(synchroize) 标志的数据包给接收方,接收方收到后,回传一个带有SYN/ACK(acknowledgement)标志的数据包以示传达确认信息,最后发送方再回传一个带ACK标志的数据包,代表握手结束.在这个过程中若出现问题导致中断,TCP会再次发送相同的数据包.
    * TCP是一个端到端的可靠的面向连接的协议,所以HTTP基于传输层TCP协议不用担心数据传输的各种问题.
  * 发送HTTP请求,服务器处理请求,返回响应结果
    * 
  * 关闭TCP连接
  * 浏览器解析DOM树 css树 边解析边执行js等
    * 浏览器按顺序解析html文件,构建DOM树,在解析到外部的css和js文件时,向服务器发起请求下载资源,若是下载css文件,则解析器会在下载同时继续解析后面的html来构建DOM树, 则在下载js文件和执行它时,解析器会停止对html的解析,会出现阻塞问题...
    * 预加载器:  当浏览器被脚本文件阻塞时,预加载器(一个轻量级解析器)会继续解析后面的html,寻找需要下载的资源,如果发现有需要下载的资源,预下载器再开始接收这些资源.预加载器只能检索html标签中url,无法检测到使用脚本添加的url,脚本中的代码需要解析执行的时候才会获取到..           
    *  注: 预解析并不改变Dom树，它将这个工作留给主解析过程
    * 浏览器解析css，形成CSSOM树，当DOM树构建完成后，浏览器引擎通过DOM树和CSSOM树构造出渲染树。渲染树中包含可视节点的样式信息（不可见节点将不会被添加到渲染树中，如：head元素和display值为none的元素）
  * 浏览器渲染 
    * 布局：通过计算得到每个渲染对象在可视区域中的具体位置信息（大小和位置），这是一个递归的过程。
    * 绘制：将计算好的每个像素点信息绘制在屏幕上

* 原型和原型链

  * 原型
    * 每个函数都有prototype属性,该属性是一个对象(原型)
    * 通过构造函数创建的实例可以访问构造函数原型上任何成员
    * 任何对象都有proto属性,指向其构造函数的原型  prototype属性,也就是原型
    * constructor属性是原型自带属性,指向当前的构造函数
    * 类的prototype属性和_proto_属性
      * 子类的proto属性指向父类
      * 子类的prototype属性的proto属性表示方法的继承,总是指向父类的prototype属性
  * 原型链
    * 每个对象都有proto属性,这个属性指向原型对象,原型对象也是一个对象,也有proto属性且指向也是一个prototype原型对象,就这样形成的链式结构,叫做原型链...

* websoket怎么保持全双工通信的

  * 半双工和全双工的区别
    * 半双工   虽然数据可以在通信双方传送,但通信双方不能` 同时`收发数据.
    * 全双工    当数据的发送和接收分流,分别由两根不同的传输线传送时,通信双方都能在同一时刻进行发送和接收操作
    
  *  websocket特点:
    * 建立在TCP协议之上,服务器端的实现比较容易.
    * 与HTTP协议有着良好的兼容性,默认端口也是80和443,并且握手阶段采用HTTP协议因此握手时不容易被屏蔽,能通过各种HTTP代理服务器
    * 数据格式比较其轻量,性能开销小,通信高效
    * 可以发送文本,也可以发送二进制数据
    * 没有同源限制,客户端可以与服务器通信
    * 协议标识符是ws(如果加密,则为wss),服务器网址就是URL.
    
  * WebSocket就是基于TCP连接建立通讯的

    * 一旦WebSocket连接建立后，后续数据都以帧序列的形式传输。在客户端或Server端中断连接前，不需要客户端和服务端重新发起连接请求。

    * websocket与http同样建立于tcp传输协议之上，通过tcp传输层进行数据传输。

    * 使用websocket协议进行通信则首先要建立起websocket连接，这个连接的建立依赖于http。

    * 服务器响应：

      根据特殊的请求头进行了特殊响应，首先101返回码表明本次连接的通信协议经过了转换并成功握手成功建立起了通信。

      connection字段和upgrade字段则表明本次通信协议进行了升级转换，转换的是websocket协议。

* 事件绑定和事件监听什么区别

  * 事件绑定

    * DOM0级事件绑定

      * 语法:元素.on事件行为=function(){}
      * box.onclick = function(){console.log('这是绑定的点击事件')}
      * 给元素的私有属性赋值,当事件触发,浏览器会帮我们把赋的值执行,但是这样也导致只能给当前元素的某一个事件行为绑定一个方法.
      * 移除: box.onclick = function(){console.log('这是绑定的点击事件')  //  移除事件绑定,DOM0直接赋值为null即可 box.onclick=null

      

  * 事件监听

    * DOM2事件监听
      * 语法
        * 元素.addEventListener(事件行为比如click,function(){},false/true)     //第三个参数默认为false   第三个参数表示事件在哪个阶段执行  事件捕获  目标阶段 事件冒泡
        * IE6~8中  元素.attachEvent('on事件行为',function(){})
      * 原理
        * 基于原型链查找机制,找到EventTarget.prototype上的方法并且执行,此方法执行,会把当前元素某个事件行为绑定的所有方法,存放到浏览器默认的事件池中(绑定几个方法,会向事件池存储几个)
        * 当事件行为触发,会把事件池中存储的对应方法,依次按照顺序执行,(给当前元素某一个事件行为绑定的多个不同的方法)

* ES5和ES6继承有什么区别????

  * ES5继承的实质是创造子类的实例对象this,然后再将父类的方法添加到this上面(` Parent.apply(this)`)
  * ES6继承的实质是先创造父类实例对象this(所以必须先调用super方法),然后再用子类的构造函数修改this

