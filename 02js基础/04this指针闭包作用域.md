### this指针

this对象是运行时基于函数的执行环境绑定的..

在全局函数中,   this等于window,而当 this等于这个对象,,,,,,

如果是一个匿名函数的话,其执行环境具有全局性,因此其this对象指向window    (历史遗留问题,解决方案就是使用匿名函数的时候使用箭头函数)



```  javascript
var name = 'lisi'

var object = {
    name: 'zhangsan',
     getNameFunc: function(){
	return function(){
		return this.name
    	
    	}
     }
}



console.log(object.getNameFunc()());       //   这步操作直接调用getNameFunc这个函数返回的函数    又因为其是匿名函数,所以其中的this指向为window   打印出来的值也就是lisi


//  为了解决这个问题 可以使用=>   箭头函数来处理
var name = 'lisi'

var object = {
    name: 'zhangsan',
     getNameFunc: function(){
	return ()=>{
		return this.name       //使用箭头函数    其中的this就是外层函数中的this  也就是和getNameFunc函数中的this一致,   this.name   也就是zhangsan
    	}
     }
}
```

`JAVAScript中this指向的4中规则,   默认绑定规则    隐式绑定规则    显式绑定规则    new绑定规则`

* 默认绑定规则

  ``` javascript
  console.log(this===window)     //true
  ```

* 隐式绑定规则

  ``` javascript
  //  谁调用就指向谁     (隐式丢失   参数赋值)
  ```

  ``` javascript
  var a = 0;
  var obj = {
   a:2,
      foo:function(){
          console.log(this);   //    this指向obj
          function test(){
  	console.log(this);    //指向window
          
          }
          test();   //独立调用执行    其中的this应该就是window
      }
      
  }
  
  
  //调用的时候
  obj.foo();
  ```

  下面是代码执行结果:

  ![image-20200816204323274](C:\Users\L\AppData\Roaming\Typora\typora-user-images\image-20200816204323274.png)



下面这个代码执行应该是什么呢??

``` javascript
//隐式丢失

var a = 0;
function foo(){   //函数声明
	console.log(this);
}
var obj = {
    a:0,
    foo:foo
}
obj.foo();    ///   这个时候打印的this指向obj   因为是obj调用的foo方法
var bar  = obj.foo;     //隐式丢失(变量赋值)使下面的代码执行 其中的this指向window    
bar();          ////   这个时候bar上面就是foo这个方法     在全局调用则其中的this指向window  
```

``` javascript
//   参数赋值
var a= 0;
function foo(){
	console.log(this);   // 
}
function bar(fn){
    fn()
}
var obj = {
    a:2,
    foo:foo
}

bar(obj.foo)   ///   预编译的过程中,实参被赋值给形参(值的拷贝过程,浅拷贝)     其中实参就是foo这个函数  将这个函数传入bar函数内部  并直接调...   那么foo中的this指向就是window
```

` 父函数有能力决定子函数的this指向`



* new绑定规则

  ``` javascript
  function Person(){
  
   this.a = 1;
      // return {};         // 如果返回值为引用类型的   则实例化之后的this指向这个引用类型数据
  }
   var person = new Person();
  console.log(person);    //  如果默认的话  Person中的this指向这个实例化对象person
  ```

  

  

​			

* 显式绑定   

  ` call   apply    bind`

  ``` javascript
  //  上面这三个东西怎么使用的呢??
  var a= 0;
  function foo(a,b,c,d,e){
  	console.log(a,b,c,d,e)
  }
  var obj = {
      a:2,
      foo:foo
  }
  
  var bar = obj.foo;
  
  obj.foo(1,2,3,4,5);
  bar.call(obj,1,2,3,4,5);
  bar.apply(obj,[1,2,3,4,5]);
  bar.bind(obj)(1,2,3,4,5);    
  // 上面四句代码执行结果一致     且this都指向obj
  ```

  



### 闭包

有权访问另一个函数作用域中的变量的函数,创建闭包的常见方式,就是在一个函数A内部创建另一个函数B,在这个B函数中使用函数A中的变量,在函数A被销毁,函数B依旧可以访问到函数A中的变量





当函数执行的时候,导致函数被定义,并抛出;    (不太官方)





### 作用域

每个函数都有自己的执行环境,  当执行流入下一个函数时,函数的环境就会被推入一个环境栈中.而在函数执行之后,栈将其环境弹出,把控制权返回给之前的执行环境.....

当代码在一个环境中执行时,  会创建变量对象的一个作用域链,作用域链的用途是保证对执行环境有权访问所有变量和函数的有序访问,作用域链前端始终都是当前执行的代码所在环境的变量对象,如果这个环境是函数,则将其活动对象作为变量对象....