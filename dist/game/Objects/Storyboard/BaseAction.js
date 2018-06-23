"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Base_1 = require("./../../Base");
var BaseAction = (function (_super) {
    __extends(BaseAction, _super);
    function BaseAction(action, paramters) {
        var _this = _super.call(this) || this;
        _this.actionType = action;
        _this.parameters = paramters;
        _this.actionIsOverSignal = new Phaser.Signal();
        _this.isFinished = false;
        return _this;
    }
    BaseAction.prototype.play = function () { };
    BaseAction.prototype.clear = function () { };
    BaseAction.prototype.stop = function () { };
    return BaseAction;
}(Base_1.default));
exports.default = BaseAction;
