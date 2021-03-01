/***
 * 模拟new 操作
 */

/**
 * 一共是需要3个步骤
 * 创建一个对象  并将ctor.prototype原型对象添加到这个新对象原型上
 * 执行构造函数并将this绑定到新创建的对象上
 * 判断构造函数执行返回的结果是否是引用数据类型,若是则返回构造函数的执行结果,否则则返回创建的对象
 */

function newOperator(ctor, ...args) {
    if (typeof ctor !== 'function') {
        throw new TypeError(ctor + 'is not function');
    }
    const obj = Object.create(ctor.prototype);
    const res = ctor.apply(obj, args);
    const isObject = typeof res === 'object' && res !== null;
    const isFunc = typeof res === 'function';
    return isObject || isFunc ? res : obj;
}

//

function newOperator(ctor, ...args) {
    if (typeof ctor !== 'function') {
        throw new TypeError(ctor + 'is not function');
    }
    const obj = Object.create(ctor.prototype);
    const res = ctor.apply(obj, args);
    const isObject = typeof res === 'object' && res !== null;
    const isFunc = typeof res === 'function';
    return isObject || isFunc ? res : obj;
}
