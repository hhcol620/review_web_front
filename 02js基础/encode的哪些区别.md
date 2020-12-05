### 了解encodeURI , encodeURIComponent decodeURI  decodeURIComponent的区别

* 共同点
  * 都是用来编码和解码URI的
  * encodeURI和decodeURI函数操作的是完整的URI,这两个函数假定URI中的保留字符都有意义,所以不会编码他们
  * encodeURIComponent和decodeURIComponent函数操作的是组成URI的个别组件,这两个函数假定保留字符都代表普通文本,所以必须编码他们
  * ![image-20201102160044388](F:\学习笔记\review_web_front\images\image-20201102160044388.png)



