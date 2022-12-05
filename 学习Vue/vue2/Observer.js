/**
 * Observer类会通过递归的方式把一个对象的所有属性都转化成可观测对象
 */

class Observer {
  constructor(value) {
    this.value = value;
    this.dep = new Dep();
    def(value, '__ob__', this);
    if (Object.prototype.toString.call(this.value) === '[object Array]') {
      // value 为数组
      const augment = hasProto ? protoAugment : copyAugment;
      augment(value, arrayMethods, arrayKeys);
      this.observeArray(value);
    } else {
      // value 为对象
      this.walk(value);
    }
  }

  walk(target) {
    for (let key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        defineReactive(target, key);
      }
    }
  }

  /**
   * Observe a list of Array items.
   */
  observeArray(items) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i]);
    }
  }
}

function defineReactive(target, key, val) {
  if (!val) {
    val = target[key];
  }

  if (typeof val === 'object' && key !== '__ob__') {
    new Observer(val);
  }

  let childOb = observe(val);

  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log(`${key} 被获取了`);
      childOb.dep.depend();

      return val;
    },
    set(newVal) {
      if (newVal === val) {
        return;
      }
      console.log(`${key} 被修改了`);
      childOb.dep.notify();
      val = newVal;
    }
  });
}

function def(target, key, value) {
  target[key] = value;
}

class Dep {
  constructor() {
    this.subs = [];
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  // 移除依赖
  removeSub(sub) {
    if (this.subs.length > 0) {
      if (this.subs.indexOf(sub) > -1) {
        this.subs.splice(this.subs.indexOf(sub), 1);
      }
    }
  }

  // 从全局获取到依赖
  depend() {
    if (window.target) {
      this.addSub(window.target);
    }
  }

  // 通知所有依赖更新
  notify() {
    const subs = this.subs.slice();
    subs.forEach((item) => {
      item.update();
    });
  }
}

class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm;
    this.cb = cb;
    this.getter = parsePath(expOrFn);
    this.value = this.get();
  }

  get() {
    window.target = this;
    const vm = this.vm;
    let value = this.getter.call(vm, vm);
    window.target = undefined;
    return value;
  }

  update() {
    const oldValue = this.value;
    this.value = this.get();
    this.cb.call(this.vm, this.value, oldValue);
  }
}

function parsePath(expOrFn) {
  const bailRE = /[^\w.$]/;
  if (bailRE.test(expOrFn)) {
    return;
  }
  const segments = path.split('.');

  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return;
      obj = obj[segments[i]];
    }
    return obj;
  };
}

const arrayProto = Array.prototype;
// 创建一个对象作为拦截器
const arrayMethods = Object.create(arrayProto);

// 改变数组自身内容的7个方法
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  const original = arrayProto[method]; // 缓存原生方法
  def(arrayMethods, method, function mutator(...args) {
    const result = original.apply(this, args);
    const ob = this.__ob__;
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args; // 如果是push或unshift方法，那么传入参数就是新增的元素
        break;
      case 'splice':
        inserted = args.slice(2); // 如果是splice方法，那么传入参数列表中下标为2的就是新增的元素
        break;
    }
    if (inserted) ob.observeArray(inserted); // 调用observe函数将新增的元素转化成响应式
    // notify change
    ob.dep.notify();
    return result;
  });
});

const hasProto = '__proto__' in {};

const arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment(target, src, keys) {
  target.__proto__ = src;
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
function copyAugment(target, src, keys) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i];
    def(target, key, src[key]);
  }
}

function observe(value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return;
  }
  let ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else {
    ob = new Observer(value);
  }
  return ob;
}

const source = {
  brand: 'BMW',
  price: 3000
};
const car = new Observer(source);
console.log(car.value.brand);
console.log(car.value.price);

car.value.brand = 'audi';
car.value.price = 1200;

console.log(car.value.brand, car.value.price);
