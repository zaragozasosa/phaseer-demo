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
    function MenuList(label, id, previousObject, actionCallback) {
        if (previousObject === void 0) { previousObject = null; }
        if (actionCallback === void 0) { actionCallback = null; }
        var _this = _super.call(this, label, id, null, previousObject, actionCallback) || this;
        _this.list = [];
        return _this;
    }
    MenuList.prototype.addChild = function (child) {
        this.list.push(child);
        if (this.list.length) {
            this.nextMenuObject = this.list[0];
        }
    };
    return MenuList;
}(MenuObject_1.default));
exports.default = MenuList;
