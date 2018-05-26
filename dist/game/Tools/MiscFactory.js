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
var MiscFactory = (function (_super) {
    __extends(MiscFactory, _super);
    function MiscFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MiscFactory.prototype.addGroup = function (name) {
        if (name === void 0) { name = undefined; }
        return this.game.add.group(undefined, undefined);
    };
    MiscFactory.prototype.randomBetween = function (min, max) {
        return this.game.rnd.integerInRange(min, max);
    };
    MiscFactory.prototype.overlap = function (object1, object2, overlapCallback) {
        return this.game.physics.arcade.overlap(object1, object2, overlapCallback);
    };
    MiscFactory.prototype.tweenTo = function (obj, props, duration, ease, autoStart, delay, repeat) {
        if (autoStart === void 0) { autoStart = false; }
        if (delay === void 0) { delay = 0; }
        if (repeat === void 0) { repeat = 0; }
        return this.game.add
            .tween(obj)
            .to(props, duration, ease, autoStart, delay, repeat);
    };
    return MiscFactory;
}(Factory_1.default));
exports.default = MiscFactory;