//  JSON.stringify(JSON.parse())  深拷贝
// 不能处理undefined 函数  循环引用  (正则好像也是不能处理的会把正则处理为''空字符串)

// 手写一个clone

function clone(obj) {
    if (obj === null) return null;
    if (typeof obj != 'object') return obj;
    if (obj.constructor === Date) return new Date(obj);
    if (obj.constructor === RegExp) return new RegExp(obj);
    var newObj = new obj.constructor(); //保持继承的原型
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            var val = obj[key];
            newObj[key] = typeof val === 'object' ? clone(val) : val;
        }
    }
    return newObj;
}

// 通过MessageChannel这种通讯机制进行深拷贝   这种能解决undefined的和循环引用的问题
function depthCopy(obj) {
    return new Promise((resolve) => {
        const { port1, port2 } = new MessageChannel();
        port1.onmessage = (ev) => resolve(ev.data);
        port2.postMessage(obj);
    });
}

const obj = {
    a: { b: new Date(), c: { d: new Date() } },
    c: 2
};

// depthCopy(obj).then((res) => {
//     res.a.b = 3;
//     console.log(res, obj);
// });

let a = clone(obj);

a.a.b = 0;
a.a.c.d = '0';

console.log(obj, a);

// 手写深拷贝
function deepClone(obj) {
    if (obj === null) return obj;
    if (typeof obj !== 'object') return obj;
    if (obj.constructor === Date) return new Date(obj);
    if (obj.constructor === RegExp) return new RegExp(obj);
    let newObj = new obj.constructor(); //  保持继承的原型
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            let val = obj[key];
            newObj[key] = typeof val === 'object' ? deepClone(val) : val;
        }
    }
    return newObj;
}
