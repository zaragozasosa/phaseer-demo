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
    function Window() {
        return _super.call(this) || this;
    }
    Window.prototype.init = function (message, sprites, rect) {
        if (sprites === void 0) { sprites = null; }
        if (rect === void 0) { rect = null; }
        if (!rect) {
            rect = this.tools.graphic.makeWindowRect();
        }
        this.rect = rect;
        this.background = this.tools.graphic.addWindowBackground();
        var background = this.background;
        if (sprites) {
            this.sprites = sprites;
            rect.addChild(sprites);
        }
        this.message = message;
        rect.addChild(message);
        background.addChild(rect);
        this.tools.misc.bringToTop(rect);
        background.alpha = 0;
        this.showTween = this.tools.misc.tweenTo(background, { alpha: 1 });
        this.hideTween = this.tools.misc.tweenTo(background, { alpha: 0 });
    };
    Window.prototype.show = function () {
        this.showTween.start();
    };
    Window.prototype.hide = function () {
        this.hideTween.start();
    };
    Window.prototype.hideAndDestroy = function () {
        this.hideTween.onComplete.add(this.destroy, this);
        this.hideTween.start();
    };
    Window.prototype.destroy = function () {
        this.background.destroy(true);
        this.tools.misc.removeTween(this.showTween);
        this.tools.misc.removeTween(this.hideTween);
    };
    return Window;
}(Base_1.default));
exports.default = Window;
