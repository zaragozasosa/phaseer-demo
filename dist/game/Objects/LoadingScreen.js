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
var Base_1 = require("./../Base");
var LoadingScreen = (function (_super) {
    __extends(LoadingScreen, _super);
    function LoadingScreen(gameboardConfig) {
        var _this = _super.call(this) || this;
        var tools = _this.tools;
        for (var _i = 0, _a = gameboardConfig.tiles; _i < _a.length; _i++) {
            var tile = _a[_i];
            var x = tools.misc.randomBetween(150, 850);
            var y = tools.misc.randomBetween(150, 1400);
            var x2 = tools.misc.randomBetween(150, 850);
            var y2 = tools.misc.randomBetween(150, 1400);
            var time = tools.misc.randomBetween(500, 1200);
            var time2 = tools.misc.randomBetween(500, 1200);
            var scale = tools.misc.randomBetween(6, 10);
            var scale2 = tools.misc.randomBetween(6, 10);
            var sprite = tools.sprite.createFromSpriteSheet(x, y, tile.id, 1, scale / 10);
            var sprite2 = tools.sprite.createFromSpriteSheet(x2, y2, tile.id, 2, scale2 / 10);
            sprite.angle = tools.misc.randomBetween(0, 4) * 90;
            sprite2.angle = tools.misc.randomBetween(0, 4) * 90;
            tools.tween.blinkStart(sprite, 0, time);
            tools.tween.blinkStart(sprite2, 0, time2);
        }
        var load = tools.text.makeXBounded(400, 'Loading', 100, 'center', null, true);
        tools.misc.repeatEvent(500, 3, function () { return (load.text = load.text + '.'); });
        tools.tween.appear(load, 500);
        return _this;
    }
    return LoadingScreen;
}(Base_1.default));
exports.default = LoadingScreen;
