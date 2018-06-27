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
var Window = (function (_super) {
    __extends(Window, _super);
    function Window(windowType) {
        if (windowType === void 0) { windowType = Window.DEFAULT_WINDOW; }
        var _this = _super.call(this) || this;
        _this.defaultAlpha = 0.8;
        _this.windowType = windowType;
        return _this;
    }
    Window.prototype.init = function (elements, sprites) {
        if (sprites === void 0) { sprites = null; }
        var rect = this.makeRect();
        this.background = this.makeBackground();
        if (sprites) {
            this.sprites = sprites;
            rect.addChild(sprites);
        }
        this.elements = elements;
        rect.addChild(elements);
        this.background.addChild(rect);
        this.tools.misc.bringToTop(rect);
        this.background.alpha = 0;
        this.showTween = this.tools.misc.tweenTo(this.background, { alpha: 1 });
        this.hideTween = this.tools.misc.tweenTo(this.background, { alpha: 0 });
    };
    Window.prototype.show = function () {
        this.showTween.start();
        if (this.menu) {
            this.menu.show();
        }
    };
    Window.prototype.hideAndDestroy = function () {
        if (this.menu) {
            this.menu.destroy();
        }
        this.hideTween.onComplete.add(this.destroy, this);
        this.hideTween.start();
    };
    Window.prototype.makeRect = function () {
        if (this.windowType === Window.SMALL_CENTER) {
            var win = this.config.window;
            var x = win.defaultX;
            var line = win.defaultLineWidth;
            var w = win.defaultWidth;
            var y = win.centerY;
            var h = win.centerHeight;
            return this.tools.graphic.makeWindowRect(x, y, w, h, line);
        }
        else {
            return this.tools.graphic.makeWindowRect();
        }
    };
    Window.prototype.makeBackground = function () {
        if (this.windowType === Window.DEFAULT_HIDE_BACKGROUND) {
            return this.tools.graphic.addWindowBackground(1);
        }
        else {
            return this.tools.graphic.addWindowBackground(this.defaultAlpha);
        }
    };
    Window.prototype.hide = function () {
        this.hideTween.start();
    };
    Window.prototype.destroy = function () {
        this.background.destroy(true);
        this.tools.misc.removeTween(this.showTween);
        this.tools.misc.removeTween(this.hideTween);
    };
    Window.DEFAULT_WINDOW = 1;
    Window.DEFAULT_HIDE_BACKGROUND = 2;
    Window.SMALL_CENTER = 3;
    return Window;
}(Base_1.default));
exports.default = Window;
