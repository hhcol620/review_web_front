### 前端项目中的NODE_ENV

1.NODE_ENV的作用
通常这个变量用来区分开发与生产环境，加载不同的配置。



2.配置

node中有全局变量process表示当前node进程，process.env包含着关于系统环境的信息。但是process.env中并不存在NODE_ENV这个东西，NODE_ENV只是一个用户自定义的变量，当我们在服务启动时配置NODE_ENV,或在代码中给process.env.NODE_ENV赋值，js便能通过process.env.NODE_ENV获取信息。

![image-20200907171005121](C:\Users\L\AppData\Roaming\Typora\typora-user-images\image-20200907171005121.png)

