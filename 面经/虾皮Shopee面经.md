# 虾皮 Shopee 面经

> 技术栈：React + TypeScript
> 业务方向：基础设施服务（域名解析、存储、监控、日志、图片等），面向公司内部开发人员
> 工作节奏：早9晚7，整体较轻松
> 来源：https://juejin.cn/post/7537329716007616527

---

## Q1: eval 和 new Function 的区别？你会优先选哪个？

### 区别

| | `eval` | `new Function` |
|---|---|---|
| 作用域 | 在**当前作用域**执行，能读写局部变量 | 只能访问**全局作用域**，无法访问局部变量 |
| 安全性 | 危险，可访问/篡改局部变量，XSS 风险高 | 相对安全，作用域隔离 |
| 性能 | 差，阻止 JS 引擎对当前作用域做优化 | 稍好，引擎可以单独优化新函数 |
| 使用方式 | `eval('1 + 1')` | `new Function('a', 'b', 'return a + b')` |

```js
// eval 能访问局部变量
function test() {
  const x = 10
  eval('console.log(x)')  // 10，能拿到局部变量 x
}

// new Function 不能访问局部变量
function test2() {
  const x = 10
  const fn = new Function('console.log(x)')
  fn()  // ReferenceError: x is not defined
}
```

### 优先选哪个？

**优先选 `new Function`**，理由：
1. 作用域隔离，不会意外污染或读取局部变量
2. 安全性更高，XSS 攻击面更小
3. 两者都应尽量避免，实在需要动态执行代码时，`new Function` 是更可控的选择

---

## Q2: 代码题 —— 输出什么？

```js
new Promise((resolve, reject) => {
  console.log(1)
  resolve(true)
  console.log(2)
  throw new Error('err')
  console.log(3)
  reject(false)
}).catch(err => console.log(err))
  .then(res => console.log(res))
```

### 答案

```
1
2
true
```

### 解析

**同步阶段（executor 立即执行）：**

```
console.log(1)       → 输出 1
resolve(true)        → Promise 状态变为 fulfilled，已不可更改
console.log(2)       → 输出 2
throw new Error(err) → executor 被 try-catch 包裹，尝试 reject，
                       但 Promise 已 fulfilled，状态不可更改，throw 被忽略
console.log(3)       → throw 之后不执行
reject(false)        → throw 之后不执行
```

**异步阶段（微任务）：**

```
Promise 是 fulfilled 状态
  → .catch() 不触发，直接透传 fulfilled 值（true）
  → .then(res => console.log(res)) 接收到 true，输出 true
```

**关键点：**
1. Promise 状态一旦确定（fulfilled/rejected）就**不可更改**，后续的 throw/reject 无效
2. `.catch` 只处理 rejected 状态，fulfilled 状态会直接透传给下一个 `.then`
3. executor 里 throw 发生在 resolve 之后，尝试的 reject 被忽略

---

## Q3: 算法题 —— 二叉树的路径总和

> LeetCode 112：给定二叉树和目标值 targetSum，判断是否存在从根到叶子节点的路径，使路径上节点值之和等于 targetSum

```js
function hasPathSum(root, targetSum) {
  // 空节点：返回 false
  if (!root) return false

  // 叶子节点：判断剩余值是否等于当前节点值
  if (!root.left && !root.right) {
    return root.val === targetSum
  }

  // 递归左右子树，剩余目标值减去当前节点值
  return (
    hasPathSum(root.left, targetSum - root.val) ||
    hasPathSum(root.right, targetSum - root.val)
  )
}
```

**思路：** DFS 深度优先，每往下走一层就把目标值减去当前节点值，到叶子节点时判断剩余值是否为 0。

---

## Q4: 代码题 —— 格式化英文字符串

> 把一个英文字符串格式化为正常英文语句：仅包含字母和数字，单词之间只有1个空格，首尾没有空格。
> 例如：`'   i com$e   from %% China     '` → `'i come from China'`

```js
function formatSentence(str) {
  return str
    .replace(/[^a-zA-Z0-9\s]/g, '')  // 去掉非字母数字非空格的字符
    .split(/\s+/)                      // 按连续空白切割
    .filter(Boolean)                   // 过滤首尾空格产生的空字符串
    .join(' ')                         // 单空格拼接
}
```

**逐步拆解：**
```
'   i com$e   from %% China     '
→ replace：'   i come   from    China     '   // $ % 删掉
→ split：  ['', 'i', 'come', 'from', 'China', '']
→ filter： ['i', 'come', 'from', 'China']
→ join：   'i come from China' ✅
```

**关键点：**
- `/[^a-zA-Z0-9\s]/g`：`^` 取反，保留字母数字和空格，其余全删
- `split(/\s+/)`：匹配连续空格，一次性处理多个空格
- `filter(Boolean)`：过滤空字符串

---