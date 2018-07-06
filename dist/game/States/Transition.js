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
var Config_1 = require("./../Config/Config");
var Transition = (function (_super) {
    __extends(Transition, _super);
    function Transition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Transition.prototype.init = function (gameboardConfig, callback, stopTrack) {
        if (stopTrack === void 0) { stopTrack = false; }
        this.callback = callback;
        this.gameboardConfig = gameboardConfig;
        this.stopTrack = stopTrack;
    };
    Transition.prototype.create = function () {
        var _this = this;
        var singleton = Config_1.Singleton.get();
        var tools = singleton.tools;
        tools.graphic.addBackground();
        if (this.stopTrack) {
            tools.audio.stopBgm();
        }
        for (var _i = 0, _a = this.gameboardConfig.tiles; _i < _a.length; _i++) {
            var tile = _a[_i];
            var x = tools.misc.randomBetween(150, 750);
            var y = tools.misc.randomBetween(150, 1400);
            var x2 = tools.misc.randomBetween(150, 750);
            var y2 = tools.misc.randomBetween(150, 1400);
            var time = tools.misc.randomBetween(500, 1200);
            var time2 = tools.misc.randomBetween(500, 1200);
            var sprite = tools.sprite.createSprite(x, y, tile.id, 1);
            var sprite2 = tools.sprite.createSprite(x2, y2, tile.specialId, 1);
            sprite.alpha = 0;
            sprite2.alpha = 0;
            sprite.angle = tools.misc.randomBetween(0, 9) * 45;
            sprite2.angle = tools.misc.randomBetween(0, 9) * 45;
            tools.tween.blinkStart(sprite, 0, time);
            tools.tween.blinkStart(sprite2, 0, time2);
        }
        var t = tools.text.makeXBounded(400, 'Loading', 100, 'center', null, true);
        tools.misc.repeatEvent(500, 3, function () { return (t.text = t.text + '.'); });
        t.alpha = 0;
        tools.tween.to(t, { alpha: 1 }, 500, true);
        tools.misc.runLater(2000, function () { return _this.callback(); });
    };
    return Transition;
}(Phaser.State));
exports.default = Transition;
