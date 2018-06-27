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
var Config_1 = require("./../../Config/Config");
var MenuObject = (function (_super) {
    __extends(MenuObject, _super);
    function MenuObject(label, actionCallback, isBackOption) {
        if (actionCallback === void 0) { actionCallback = null; }
        if (isBackOption === void 0) { isBackOption = false; }
        var _this = _super.call(this) || this;
        _this.label = label;
        _this.actionCallback = actionCallback;
        _this.isBackOption = isBackOption;
        return _this;
    }
    MenuObject.prototype.print = function (positionY, size) {
        this.text = this.tools.text.makeXBounded(positionY, this.label, size, 'center');
        this.text.alpha = 0;
        var tween = this.tools.misc.tweenTo(this.text, { alpha: 1 }, 500);
        tween.onComplete.addOnce(function () {
            this.tools.misc.removeTween(tween);
        }.bind(this));
        tween.start();
    };
    MenuObject.prototype.action = function () {
        if (this.actionCallback) {
            this.actionCallback();
        }
    };
    MenuObject.prototype.clear = function () {
        this.text.destroy();
    };
    MenuObject.prototype.toogleOption = function () {
        if (this.text) {
            this.selected = !this.selected;
            if (this.selected) {
                this.tools.text.changeColor(this.text, Config_1.ColorSettings.PRIMARY);
            }
            else {
                this.tools.text.changeColor(this.text, Config_1.ColorSettings.TEXT);
            }
        }
    };
    MenuObject.prototype.changeLabel = function (label) {
        this.label = label;
        if (this.text) {
            this.text.text = label;
        }
    };
    MenuObject.prototype.show = function (position, size) { };
    return MenuObject;
}(Base_1.default));
exports.default = MenuObject;
