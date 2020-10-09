### devDependencies和dependencies

两者什么区别呢??

- `devDependencies`：开发环境使用
- `dependencies`：`依赖的包不仅开发环境能使用，生产环境也能使用`。

```
npm ``install` `--save moduleName ``# --save 的意思是将模块安装到项目目录下，并在package文件的dependencies节点写入依赖。
```

```
npm ``install` `--save-dev moduleName ``# --save-dev 的意思是将模块安装到项目目录下，并在package文件的devDependencies节点写入依赖。
```