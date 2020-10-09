"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
  Es5实现单例
*/
function Window() { }
Window.prototype.hello = function () {
    console.log('hello');
};
// 静态方法       使用立即执行函数和闭包
Window.getInstance = (function () {
    var window; //下面使用一个闭包,用这个变量保存实例 
    return function () {
        if (!window) {
            window = new Window;
        }
        return window;
    };
})();
var w1 = Window.getInstance();
var w2 = Window.getInstance();
console.log(w1 === w2); //true
