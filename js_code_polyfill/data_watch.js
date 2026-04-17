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

    Object.defineProperty(obj, key, {
      get() {
        console.log(`[defineProperty] get: ${key} = ${value}`)
        return value
      },
      set(newVal) {
        if (newVal === value) return
        console.log(`[defineProperty] set: ${key}: ${value} → ${newVal}`)
        value = newVal
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


// ========================
// 二、Proxy
// ========================

// 直接代理整个对象，支持新增属性、数组操作
function proxyWatch(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      const value = Reflect.get(target, key, receiver)
      console.log(`[Proxy] get: ${String(key)} = ${JSON.stringify(value)}`)
      // 嵌套对象懒递归代理
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


// ========================
// 三、对比：数组操作
// ========================

console.log('\n--- 数组操作对比 ---')

// Object.defineProperty 无法检测数组下标赋值和 length 变化
// Vue2 的做法是重写数组的 7 个方法（push/pop/shift/unshift/splice/sort/reverse）
const arr1 = definePropertyWatch([1, 2, 3])
arr1[0] = 99   // 有输出（下标作为 key 被劫持了，但 length 变化不触发）
arr1.push(4)   // push 本身不触发 set（取决于实现），Vue2 需要重写才能监听

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
 * 2. 需要遍历对象所有属性，初始化时递归性能差
 * 3. 数组下标赋值和 length 修改无法检测，需要重写数组方法
 * 4. 无法劫持 Map、Set、WeakMap 等数据结构
 *
 * Proxy 的优势：
 * 1. 代理整个对象，新增/删除属性自动劫持
 * 2. 懒递归，访问嵌套属性时才创建子代理，初始化性能好
 * 3. 支持数组任何操作（下标、push、length 等）
 * 4. 支持 13 种拦截操作（get/set/deleteProperty/has/ownKeys 等）
 * 5. 配合 Reflect 使用，保证原始语义正确
 *
 * Proxy 的限制：
 * 1. 无法 polyfill，不支持 IE
 * 2. 对原始对象的直接操作不会触发代理
 */
