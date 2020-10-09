"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Window = /** @class */ (function () {
    function Window() {
    }
    Window.getIntance = function () {
        if (!Window.instance) {
            return Window.instance = new Window();
        }
        else {
            return Window.instance;
        }
    };
    return Window;
}());
// 现在Window 就是一个单例的
var w1 = Window.getIntance();
var w2 = Window.getIntance();
console.log(w1 === w2);
