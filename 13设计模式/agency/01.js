"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Angelababy = /** @class */ (function () {
    function Angelababy() {
        this.available = true;
    }
    Angelababy.prototype.answerPhone = function () {
        console.log('您好,我是Angelababy');
    };
    ;
    return Angelababy;
}());
var AngelababyAgent = /** @class */ (function () {
    function AngelababyAgent(anaelababy) {
        this.anaelababy = anaelababy;
    }
    AngelababyAgent.prototype.answerPhone = function () {
        console.log('您好,我是经纪人');
        if (this.anaelababy.available) {
            this.anaelababy.answerPhone();
        }
    };
    return AngelababyAgent;
}());
var angelababy = new Angelababy();
var angelababyAgent = new AngelababyAgent(angelababy);
angelababyAgent.answerPhone();
/*

  您好,我是经纪人
  您好,我是Angelababy
*/ 
