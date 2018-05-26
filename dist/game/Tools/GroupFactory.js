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
var Factory_1 = require("./Base/Factory");
var GroupFactory = (function (_super) {
    __extends(GroupFactory, _super);
    function GroupFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GroupFactory.prototype.add = function (name) {
        if (name === void 0) { name = undefined; }
        return this.game.add.group(undefined, undefined);
    };
    return GroupFactory;
}(Factory_1.default));
exports.default = GroupFactory;
