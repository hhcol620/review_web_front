### Vue初次渲染

1. 解析模板为render函数 (或在开发环境中已完成, Vue-loader)
2. 触发响应式,监听data属性  getter  setter
3. 执行render函数,生成vnode,patch(elem,vnode)

### 更新过程

1. 修改data,触发setter(在初次渲染的时候 getter中已被监听)
2. 重新执行render函数,生成newVnode
3. patch(vnode,newVnode)

