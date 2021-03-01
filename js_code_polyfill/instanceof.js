// instanceof 运算符用于检测构造函数的prototype属性是否出现在某个实例对象的原型链上

const myInstanceof = (left, right) => {
    // 基本数据都返回false
    if (typeof left !== 'object' || left === null) return false;
    let proto = Object.getPrototypeOf(left); //  获取left的原型  判断是否和right相等  如果不等继续向上查找 如果为null 的话则返回false
    while (true) {
        if (proto === null) return false;
        if (proto === right.prototype) return true;
        proto = Object.getPrototypeOf(proto); // 沿着原型链继续向上寻找
    }
};

const myInstanceof = (left, right) => {
    // 基本数据都返回false
    if (typeof left !== 'object' || left === null) return false;
    let proto = Object.getPrototypeOf(left);
    // 获取left 的原型  判断是否和right相等  如果不相等继续向上从查找   如果为null 的话 则返回false
    while (true) {
        if (proto === null) return false;
        if (proto === right.prototype) return true;
        proto = Object.getPrototypeOf(proto); //  沿着原型链继续向上寻找
    }
};

let bool = myInstanceof({}, Object);

console.log(bool); // true
