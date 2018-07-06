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
var TweenFactory = (function (_super) {
    __extends(TweenFactory, _super);
    function TweenFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TweenFactory.prototype.to = function (obj, props, duration, autoStart, ease, delay) {
        if (duration === void 0) { duration = 200; }
        if (autoStart === void 0) { autoStart = false; }
        if (ease === void 0) { ease = null; }
        if (delay === void 0) { delay = 0; }
        if (!ease) {
            ease = Phaser.Easing.Linear.name;
        }
        var tween = this.game.add
            .tween(obj)
            .to(props, duration, ease, autoStart, delay);
        return tween;
    };
    TweenFactory.prototype.start = function (obj, props, duration, autoStart, ease, delay) {
        if (duration === void 0) { duration = 200; }
        if (autoStart === void 0) { autoStart = false; }
        if (ease === void 0) { ease = null; }
        if (delay === void 0) { delay = 0; }
        if (!ease) {
            ease = Phaser.Easing.Linear.name;
        }
        var tween = this.game.add.tween(obj).to(props, duration, ease, true, delay);
        return tween;
    };
    TweenFactory.prototype.loop = function (obj, props1, props2, duration1, duration2, ease1, ease2) {
        if (duration1 === void 0) { duration1 = 200; }
        if (duration2 === void 0) { duration2 = 200; }
        if (ease1 === void 0) { ease1 = null; }
        if (ease2 === void 0) { ease2 = null; }
        var t1 = this.to(obj, props1, duration1, false, ease1);
        var t2 = this.to(obj, props2, duration2, false, ease2);
        t1.onComplete.add(function () { return t2.start(); });
        t2.onComplete.add(function () { return t1.start(); });
        return t1;
    };
    TweenFactory.prototype.blink = function (obj, minAlpha, duration) {
        if (minAlpha === void 0) { minAlpha = 0.3; }
        if (duration === void 0) { duration = 750; }
        obj.alpha = 0.3;
        return this.loop(obj, { alpha: 1 }, { alpha: minAlpha }, duration, duration);
    };
    TweenFactory.prototype.blinkStart = function (obj, minAlpha, duration) {
        if (minAlpha === void 0) { minAlpha = 0.3; }
        if (duration === void 0) { duration = 750; }
        var tween = this.blink(obj, minAlpha, duration);
        tween.start();
        return tween;
    };
    TweenFactory.prototype.appear = function (obj, duration) {
        if (duration === void 0) { duration = 1000; }
        obj.alpha = 0;
        return this.to(obj, { alpha: 1 }, duration, true);
    };
    TweenFactory.prototype.remove = function (tween) {
        this.game.tweens.remove(tween);
    };
    TweenFactory.prototype.moveY = function (obj, newY, duration, auto, ease, extraProps) {
        if (auto === void 0) { auto = false; }
        if (ease === void 0) { ease = null; }
        if (extraProps === void 0) { extraProps = null; }
        var realY = newY * this.config.scaleFactor + this.config.safeZone.paddingY;
        if (extraProps) {
            extraProps.y = realY;
        }
        else {
            extraProps = { y: realY };
        }
        return this.to(obj, extraProps, duration, auto, ease);
    };
    TweenFactory.prototype.vanishAndDestroy = function (obj, props, duration, ease, delay) {
        if (duration === void 0) { duration = 200; }
        if (ease === void 0) { ease = 'Linear'; }
        if (delay === void 0) { delay = 0; }
        this.to(obj, props, duration, true, ease, delay).onComplete.addOnce(function () {
            obj.destroy();
        });
    };
    TweenFactory.prototype.tint = function (obj, startColor, endColor, time) {
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
    return TweenFactory;
}(Factory_1.default));
exports.default = TweenFactory;
