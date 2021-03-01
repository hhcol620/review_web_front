/**
 * Array.prototype.filter()
 * 这个filter方法里面的参数callback thisArg
 *
 * callback(currentValue,index,array)
 *
 * thisArg 执行callback时,用于this的值
 *
 *
 */

Array.prototype.filter = function (func, thisArg) {
    'use strict';
    if (!((typeof func === 'function' || typeof func === 'function') && this))
        throw new TypeError();

    var len = this.length >>> 0,
        res = new Array(len), // preallocate array  声明一个同样长度的数组
        t = this,
        c = 0,
        i = -1;
    if (thisArg === undefined) {
        while (++i !== len) {
            // checks to see if the key was set
            if (i in this) {
                if (func(t[i], i, t)) {
                    res[c++] = t[i];
                }
            }
        }
    } else {
        while (++i !== len) {
            // checks to see if the key was set
            if (i in this) {
                if (func.call(thisArg, t[i], i, t)) {
                    res[c++] = t[i];
                }
            }
        }
    }

    res.length = c; // shrink down array to proper size
    return res;
};

console.log([1, 2, 3, 4, 5].filter((item, index) => item > 3));

// 2021/03/01
Array.prototype.filter = function (func, thisArg) {
    if (!(typeof func === 'function' && this)) {
        throw new TypeError();
    }
    let len = this.length,
        res = Array.of(len), //  构造一个同等长度的数组   空的
        t = this, //  原数组
        c = 0,
        i = -1;
    if (thisArg === undefined) {
        while (++i !== len) {
            // checks to see id the key was set
            if (i in this) {
                if (func(t[i], i, t)) {
                    res[c++] = t[i];
                }
            }
        }
    } else {
        while (++i !== len) {
            // checks to see id the key was set
            if (i in this) {
                if (func.call(thisArg, t[i], i, t)) {
                    res[c++] = t[i];
                }
            }
        }
    }
    res.length = c; //  shrink down array to proper size   把后面没有复制的空位去掉
    return res;
};
