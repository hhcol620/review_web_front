"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
  透明单例
  不需要调用特定的方法返回同一个实例
客户端或者使用者不许哟啊知道要按单例使用

*/
var Window = (function () {
    var window;
    var Window = function () {
        if (window) {
            return window;
        }
        else {
            return (window = this);
        }
    };
    return Window;
})();
var w1 = new Window();
var w2 = new Window();
console.log(w1 === w2); /// true
