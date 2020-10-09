"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/*
  需要适配的类
*/
var Socket = /** @class */ (function () {
    function Socket() {
    }
    Socket.prototype.output = function () {
        return '220v';
    };
    return Socket;
}());
// 定义一个抽象类  其中有抽象方法
var Power = /** @class */ (function () {
    function Power() {
    }
    return Power;
}());
var PowerAdaptor = /** @class */ (function (_super) {
    __extends(PowerAdaptor, _super);
    function PowerAdaptor(socket) {
        var _this = _super.call(this) || this;
        _this.socket = socket;
        return _this;
    }
    PowerAdaptor.prototype.charge = function () {
        return this.socket.output() + '转换为了5v';
    };
    return PowerAdaptor;
}(Power));
var adaptor = new PowerAdaptor(new Socket());
console.log(adaptor.charge());
