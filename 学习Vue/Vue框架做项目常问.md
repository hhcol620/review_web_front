### Vue框架做项目常问

* 做大项目,前端应该如何选型,使用哪个框架??

  ``` javascript
  
  ```

  

* 为什么不使用Vue,对于Vue  比较大的项目的情况下,容易出现内存泄漏的原因是什么??

  ``` javascript
  组件销毁,Vue实例未能及时销毁,造成内存泄漏
  Vue Dep 维护依赖 Watcher(v-html,   v-if)=>  是用来连接视图和响应数据层的
  MVVM   M(数据)   V(视图)   VM (连接==>Watcher  有一个唯一的uid)   如果有刷新的时候可能出现watcher数组变化,导致数组项中出现undefined=>内存泄漏
      
   keep-alive 也可能出现内存泄漏
  ```

### Object.defineProperty()能不能监听到数组的变化呢??

* 只能检测到对象初始的时候已经拥有的key
* 对于数组,设置已监听下标的时候,就会触发
  * push不会触发
  * unshift可能会触发
  * pop shift 可能会触发

### 在Vue2源码的里面为什么会重写数组的监听的操作方法

`不是Object.defineProperty监听不到数组的变更,因为对于数组的每一次操作,都可能影响其他key索引的变更,在多数情况下,需要去遍历数组,重新检测`,

* Vue2数组是怎么处理的

  ``` javascript
  
  ```

  