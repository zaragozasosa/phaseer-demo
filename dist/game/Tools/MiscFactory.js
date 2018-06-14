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
    MiscFactory.prototype.tweenTo = function (obj, props, duration, ease, autoStart, delay, repeat, yoyo) {
        if (duration === void 0) { duration = 200; }
        if (ease === void 0) { ease = 'Linear'; }
        if (autoStart === void 0) { autoStart = false; }
        if (delay === void 0) { delay = 0; }
        if (repeat === void 0) { repeat = 0; }
        if (yoyo === void 0) { yoyo = false; }
        return this.game.add
            .tween(obj)
            .to(props, duration, ease, autoStart, delay, repeat);
    };
    MiscFactory.prototype.removeTween = function (tween) {
        this.game.tweens.remove(tween);
    };
    MiscFactory.prototype.createTimer = function () {
        return this.game.time.create(false);
    };
    MiscFactory.prototype.bringToTop = function (object) {
        this.game.world.bringToTop(object);
    };
    MiscFactory.prototype.runLater = function (time, functionToCall) {
        this.game.time.events.add(time, function () {
            functionToCall();
        }.bind(this));
    };
    MiscFactory.prototype.shuffleUniqueArray = function (list) {
        var newList = [];
        while (newList.length !== list.length) {
            var element = this.game.rnd.pick(list);
            if (newList.lastIndexOf(element) === -1) {
                newList.push(element);
            }
        }
        return newList;
    };
    MiscFactory.prototype.tweenVanishAndDestroy = function (obj, props, duration, ease, autoStart, delay) {
        if (duration === void 0) { duration = 200; }
        if (ease === void 0) { ease = 'Linear'; }
        if (autoStart === void 0) { autoStart = false; }
        if (delay === void 0) { delay = 0; }
        this.tweenTo(obj, props, duration, ease, true, delay).onComplete.add(function () {
            obj.destroy();
        });
    };
    MiscFactory.prototype.tweenTint = function (obj, startColor, endColor, time) {
        var colorBlend = { step: 0 };
        var colorTween = this.game.add
            .tween(colorBlend)
            .to({ step: 100 }, time, 'Linear', false, 0, -1, true);
        colorTween.onUpdateCallback(function () {
            obj.tint = Phaser.Color.interpolateColor(Phaser.Color.hexToRGB('#00BFFF'), Phaser.Color.hexToRGB('#87CEFA'), 100, colorBlend.step);
        });
        obj.tint = startColor;
        return colorTween;
    };
    MiscFactory.prototype.cacheAddImage = function (key, data) {
        this.game.cache.addImage(key, '', data);
    };
    return MiscFactory;
}(Factory_1.default));
exports.default = MiscFactory;
