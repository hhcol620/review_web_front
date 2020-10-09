"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Star = /** @class */ (function () {
    function Star(name) {
        this.name = name;
        this.state = '';
        this.observers = [];
    }
    Star.prototype.getState = function (state) {
        return this.state;
    };
    Star.prototype.setState = function (state) {
        this.state = state;
        this.notifyAllObservers();
    };
    // 增加新的观察者
    Star.prototype.attach = function (observer) {
        this.observers.push(observer);
    };
    // 通知所有的观察者更新自己
    Star.prototype.notifyAllObservers = function () {
        if (this.observers.length > 0) {
            this.observers.forEach(function (observer) { return observer.update(); });
        }
    };
    return Star;
}());
var Fan = /** @class */ (function () {
    function Fan(name, star) {
        this.name = name;
        this.star = star;
        this.star.attach(this);
    }
    Fan.prototype.update = function () {
        console.log("star\u559C\u6B22" + this.star.getState);
    };
    return Fan;
}());
var star = new Star('A');
var f1 = new Fan('zhangsan', star);
star.setState('绿色');
//  star喜欢绿色  
// 代码没问题 好像是这个文件夹有问题
