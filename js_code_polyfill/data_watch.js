// ============================================================
// 数据劫持：Object.defineProperty vs Proxy
// ============================================================

// ========================
// 一、Object.defineProperty
// ========================

// 只能劫持已存在的属性，需要逐个遍历
function definePropertyWatch(obj) {
  Object.keys(obj).forEach(key => {
    let value = obj[key]
    // ⚠️ 为什么需要中间变量 value，而不直接用 obj[key]？
    // 因为在 get/set 里访问 obj[key] 会再次触发 get/set → 无限递归
    // ❌ 死循环写法：
    //   get() { return obj[key] }   // 访问 obj[key] → 触发 get → 再访问 → 死循环
    //   set(v) { obj[key] = v }     // 赋值 obj[key] → 触发 set → 再赋值 → 死循环
    //
    // ✅ 正确做法：用闭包变量 value 存真实的值，get/set 只操作这个变量
    // get 和 set 共享同一个 value（闭包），set 改了 value，get 下次读的就是新值

    Object.defineProperty(obj, key, {
      get() {
        console.log(`[defineProperty] get: ${key} = ${value}`)
        return value                // 读闭包变量
      },
      set(newVal) {
        if (newVal === value) return
        console.log(`[defineProperty] set: ${key}: ${value} → ${newVal}`)
        value = newVal              // 改闭包变量，下次 get 自然返回新值
      },
      enumerable: true,
      configurable: true,
    })
  })
  return obj
}

const obj1 = definePropertyWatch({ name: 'foo', age: 18 })

obj1.name = 'bar'     // [defineProperty] set: name: foo → bar
obj1.age              // [defineProperty] get: age = 18
obj1.gender = 'male'  // 无输出！新增属性无法被劫持
obj1.name             // [defineProperty] get: name = bar（set 之后 get 返回新值）


// ========================
// 二、Proxy
// ========================

// 直接代理整个对象，支持新增属性、数组操作
function proxyWatch(obj) {
  return new Proxy(obj, {
    // ── receiver 说明 ──────────────────────────────────────────
    // receiver：触发本次访问的对象，大多数情况下就是 proxy 本身
    //   Reflect.get(target, key, receiver) 等价于：
    //   Object.getOwnPropertyDescriptor(target, key).get.call(receiver)
    //   即把 receiver 作为 getter 函数里的 this
    //
    // 只有对象上有 getter 函数（get xxx()）时 receiver 才有意义：
    //   - 普通属性（name: 'foo'）没有 this，传不传 receiver 结果一样
    //   - 有 getter 函数时，receiver 确保 getter 里的 this 指向 proxy，
    //     这样 getter 内部的属性访问也会继续走代理拦截，而不是绕过去
    //
    // receiver !== proxy 的场景：原型链继承
    //   const child = Object.create(proxy)
    //   child.name → 触发 proxy 的 get，但 receiver = child（发起访问的对象）
    //              → 如果 getter 里有 this._name，this 是 child，读的是 child._name
    // ────────────────────────────────────────────────────────────

    get(target, key, receiver) {
      const value = Reflect.get(target, key, receiver)
      console.log(`[Proxy] get: ${String(key)} = ${JSON.stringify(value)}`)
      // 嵌套对象懒递归代理（访问时才代理，不像 defineProperty 初始化时全量递归）
      if (value !== null && typeof value === 'object') {
        return proxyWatch(value)
      }
      return value
    },
    set(target, key, value, receiver) {
      const oldVal = target[key]
      const result = Reflect.set(target, key, value, receiver)
      if (oldVal !== value) {
        console.log(`[Proxy] set: ${String(key)}: ${JSON.stringify(oldVal)} → ${JSON.stringify(value)}`)
      }
      return result
    },
    deleteProperty(target, key) {
      console.log(`[Proxy] delete: ${String(key)}`)
      return Reflect.deleteProperty(target, key)
    }
  })
}

const obj2 = proxyWatch({ name: 'foo', age: 18 })

obj2.name = 'bar'      // [Proxy] set: name: "foo" → "bar"
obj2.age               // [Proxy] get: age = 18
obj2.gender = 'male'   // [Proxy] set: gender: undefined → "male"  ✅ 新增属性也能劫持
delete obj2.age        // [Proxy] delete: age                      ✅ 删除也能劫持


// ── receiver 验证：普通属性 vs getter 函数 ──────────────────────

// 1. 普通属性：receiver 不影响结果，读的永远是 target 上的值
const plain = new Proxy({ name: 'parent' }, {
  get(target, key, receiver) {
    console.log('receiver === plain?', receiver === plain)  // true（自身访问）
    return Reflect.get(target, key, receiver)               // 与不传 receiver 完全一样
  }
})
plain.name  // receiver === plain? true

// 2. 有 getter 函数：receiver 决定 getter 里 this 指向谁
const withGetter = new Proxy({
  _name: 'proxy内部',
  get name() { return this._name }   // this 由 receiver 决定
}, {
  get(target, key, receiver) {
    return Reflect.get(target, key, receiver)  // receiver = withGetter，this._name 走代理
  }
})
withGetter.name  // → 'proxy内部'

// 3. 原型链：receiver = child（发起访问的对象），不是 proxy
const parentProxy = new Proxy({
  _name: 'parent',
  get name() { return this._name }
}, {
  get(target, key, receiver) {
    if (key === 'name') {
      console.log('receiver === parentProxy?', receiver === parentProxy)  // false
      console.log('receiver === child?',       receiver === child)        // true
    }
    return Reflect.get(target, key, receiver)
  }
})
const child = Object.create(parentProxy)
child._name = 'child'
child.name  // → 'child'，因为 receiver=child，getter 里 this=child，this._name='child'


// ========================
// 三、对比：数组操作
// ========================

console.log('\n--- 数组操作对比 ---')

// Object.defineProperty 无法检测数组下标赋值和 length 变化
// Vue2 的做法是重写数组的 7 个方法（push/pop/shift/unshift/splice/sort/reverse）
const arr1 = definePropertyWatch([1, 2, 3])
arr1[0] = 99   // 有输出（下标作为 key 被劫持了，但 length 变化不触发）
arr1.push(4)   // push 本身不触发 set，Vue2 需要重写才能监听

// Proxy 天然支持数组
const arr2 = proxyWatch([1, 2, 3])
arr2[0] = 99   // [Proxy] set: 0: 1 → 99         ✅
arr2.push(4)   // [Proxy] get: push / set: 3 ...  ✅ 自动触发


// ========================
// 四、两者对比总结
// ========================

/**
 * Object.defineProperty 的缺陷：
 * 1. 只能劫持已存在的属性，新增/删除属性无感知（Vue2 需要 $set / $delete）
 * 2. 需要遍历对象所有属性，初始化时全量递归，性能差
 * 3. 数组下标赋值和 length 修改无法检测，需要重写数组方法
 * 4. 无法劫持 Map、Set、WeakMap 等数据结构
 * 5. get/set 必须借助闭包变量存值，不能直接操作 obj[key]（死循环）
 *
 * Proxy 的优势：
 * 1. 代理整个对象，新增/删除属性自动劫持
 * 2. 懒递归，访问嵌套属性时才创建子代理，初始化性能好
 * 3. 支持数组任何操作（下标、push、length 等）
 * 4. 支持 13 种拦截操作（get/set/deleteProperty/has/ownKeys 等）
 * 5. 配合 Reflect + receiver，保证 getter/setter 里 this 始终指向代理对象
 *
 * Proxy 的限制：
 * 1. 无法 polyfill，不支持 IE
 * 2. 对原始对象的直接操作不会触发代理
 *
 * receiver 总结：
 * - 普通属性：传不传都一样，因为没有 getter 函数，不涉及 this
 * - 有 getter 函数：必须传，确保 this 指向 proxy，内部属性访问继续走拦截
 * - 原型链继承时：receiver = 发起访问的子对象，不是 proxy 本身
 */
