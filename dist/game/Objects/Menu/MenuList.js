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
var MenuObject_1 = require("./MenuObject");
var MenuList = (function (_super) {
    __extends(MenuList, _super);
    function MenuList(label) {
        var _this = _super.call(this, label) || this;
        _this.list = [];
        return _this;
    }
    MenuList.prototype.addChild = function (last) {
        last.parentObject = this;
        this.list.push(last);
        if (this.list.length > 1) {
            var beforeLast = this.list.length - 2;
            this.list[0].previousMenuObject = last;
            last.nextMenuObject = this.list[0];
            this.list[beforeLast].nextMenuObject = last;
            last.previousMenuObject = this.list[beforeLast];
        }
    };
    MenuList.prototype.show = function (positionY, size) {
        if (this.parentObject && this.list[this.list.length - 1].label !== 'Back') {
            this.addChild(new MenuObject_1.default('Back', function () {
                this.parentObject.show(positionY, size);
            }.bind(this), true));
        }
        var position = positionY;
        var _loop_1 = function (obj) {
            if (obj instanceof MenuList) {
                obj.actionCallback = function () {
                    this.tools.audio.playBeep();
                    obj.show(positionY, size);
                }.bind(this_1);
            }
            obj.print(position, size);
            position += size * 2;
        };
        var this_1 = this;
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var obj = _a[_i];
            _loop_1(obj);
        }
        this.setSelectedOption(this.list[0]);
    };
    MenuList.prototype.clearAll = function () {
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var obj = _a[_i];
            obj.clear();
        }
    };
    MenuList.prototype.setSelectedOption = function (obj) {
        if (this.selectedOption) {
            this.selectedOption.toggleOption();
        }
        this.selectedOption = obj;
        obj.toggleOption();
    };
    MenuList.prototype.goNext = function () {
        this.setSelectedOption(this.selectedOption.nextMenuObject);
    };
    MenuList.prototype.goPrev = function () {
        this.setSelectedOption(this.selectedOption.previousMenuObject);
    };
    return MenuList;
}(MenuObject_1.default));
exports.default = MenuList;
