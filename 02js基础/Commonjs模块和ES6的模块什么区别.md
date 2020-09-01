### Commonjs模块 和 ES6模块

* Commonjs模块 

  * node应用是由模块组成的，遵从commonjs的规范

  * 使用:

    ``` javascript
    //  a.js
    
    function test(){
        console.log('zhangsan');
    }
    module.exports = {
        test                      ///  导出test方法     如果属性和属性值一样的话,可以按照前面这种方式写
    }
    
    //   b.js      使用a.js中的方法
    var {test} = require('./a.js')
    test();   //  直接调用方法  打印zhangsan 
    
    //    这个require('./a.js')   就是等于a.js里面向外暴露的exports对象,通过es6里面的解构赋值,test就有a.js里面的方法了 
    
    ```

    

* ES6模块

  * import是es6为js模块化提出的新的语法，import （导入）要与export（导出）结合使用

    ``` javascript
    // a.js
    export function test(){
        console.log('zhangsan')
    }
    
    // 默认导出模块，一个文件中只能定义一个
    export default function() {...};
    //  还能导出常量
    export const name = "zhangsan";
    
                               
     //   b.js
             
    // _代表引入的export default的内容
    import _, { test, name } from './a.js';                   //   _ 标识export default 暴露的内容  test name 分别表示暴露的方法和常量
    ```

  ## commonjs模块与ES6模块的区别

    1.commonjs输出的，是一个值的拷贝，而es6输出的是值的引用；

    2.commonjs是运行时加载，es6是编译时输出接口；

