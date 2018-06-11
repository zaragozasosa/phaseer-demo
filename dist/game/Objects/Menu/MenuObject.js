"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MenuObject = (function () {
    function MenuObject(label, id, previousMenuObject, actionCallback, nextMenuObject) {
        if (previousMenuObject === void 0) { previousMenuObject = null; }
        if (actionCallback === void 0) { actionCallback = null; }
        if (nextMenuObject === void 0) { nextMenuObject = null; }
        this.label = label;
        this.id = id;
        this.nextMenuObject = nextMenuObject;
        this.previousMenuObject = previousMenuObject;
        this.actionCallback = actionCallback;
    }
    Object.defineProperty(MenuObject.prototype, "isLeaf", {
        get: function () {
            return this.nextMenuObject === null;
        },
        enumerable: true,
        configurable: true
    });
    return MenuObject;
}());
exports.default = MenuObject;
