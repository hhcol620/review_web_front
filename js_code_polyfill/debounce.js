debounce = (fn, wait = 300) => {
    let timer = null;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
            timer = null;
        }, wait);
    };
};

function debounce(fn, wait = 300) {}

// 需要防抖的方法
function test() {
    console.log('ok1');
}

// let fn = debounce(test)
// fn()
// fn()
// fn()
// fn()
// fn()
// fn()

// 尝试一种办法
/*
  let fn = debounce(test)
  fn()
  fn()
  fn()
  fn()
  fn()
  fn()  // 避免这种结构
*/

let map = new Map();

function debFun(fn) {
    if (map.has(fn)) return map.get(fn);
    map.set(fn, debounce(fn));
    return map.get(fn);
}

debFun(test)();
debFun(test)();
debFun(test)();
debFun(test)();
debFun(test)();
debFun(test)();

// 使用这种方式可以将防抖传入的方法都放到一个map结构数据里面进行保证唯一
