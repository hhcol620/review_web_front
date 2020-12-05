二面问了

事件和事件流

* 事件是用户或浏览器自身执行的某种操作
* 事件是javascript和dom之间交互的桥梁
* 事件流描述的是从页面中接收事件的顺序

Vue里面的slot

* 这块虽然记着,但是有点紧张,直接说记不得了.

* 首先slot的作用有点像react中的this.props.children

* 可以将父级中模板代码传入组件内部,在组件内部可以根据模板名(v-slot:header) 会插入到子组件这个位置里面

* ``` html
  <slot name= 'header'></slot>
  ```

* 如何才能在模板上访问得到组件内部的变量??

  * 在组件内部试用  v-bind:user = 'user'像这样将需要访问的变量作为slot元素的一个attribute绑定上去   这种方式也被成为插槽prop

  * 在父级作用域中我们可以使用带值的v-slot来定义我们提供的插槽prop的名字

  * ``` html
    <current-user>
      <template v-slot:default="slotProps">
        {{ slotProps.user.firstName }}
      </template>
    </current-user>
    ```

  * 解构插槽prop

  * 动态插槽名

  * 具名插槽的缩写  # 

冒泡和快排  

* 这块还好 算是答上来了