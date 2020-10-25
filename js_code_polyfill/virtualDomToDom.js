/**
 * 这是当前spa应用的核心概念之一
 * vNode结构 {tag,attrs,children}
 */

//  VirtualDom => DOM
function render(vnode, container) {
  container.appendchild(_render(vnode))
}

// 生成dom
function _render(vnode) {
  // 如果是数字类型转化为字符串
  if (typeof vnode === 'number') vnode = String(vnode)
  // 字符串类型直接就是文本节点
  if (typeof vnode === 'string') return document.createTextNode(vnode)
  // 普通dom
  const dom = document.createElement(vnode.tag)
  if (vnode.attrs) {
    // 遍历
    Object.keys(vnode.attrs).forEach((key) => {
      const value = vnode.attrs[key]
      dom.setAttribute(key, value)
    })
  }
  // 子数组进行递归操作
  vnode.children.forEach((child) => {
    render(child, dom)
  })
  return dom
}
