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
var Window_1 = require("./Window");
var Config_1 = require("./../../Config/Config");
var PowerWindow = (function (_super) {
    __extends(PowerWindow, _super);
    function PowerWindow(character) {
        var _this = _super.call(this) || this;
        var messages = _this.tools.misc.addGroup();
        var message = _this.tools.text.makeXBounded(870, character.power.name + '!', 70, 'center', Config_1.ColorSettings.PRIMARY);
        messages.add(message);
        var sprites = _this.tools.misc.addGroup();
        if (character.friendId) {
            sprites.add(_this.tools.sprite.createSprite(70, 440, character.id, 2));
            sprites.add(_this.tools.sprite.createSprite(530, 440, character.friendId, 2));
        }
        else {
            sprites.add(_this.tools.sprite.makeCentered(200, character.id, 2.5));
        }
        _this.init(messages, sprites);
        _this.sprites.alpha = 0;
        var spritesTween = _this.tools.misc.tweenTo(_this.sprites, { alpha: 1 }, 300);
        _this.showTween.chain(spritesTween);
        _this.show();
        _this.tools.misc.runLater(2000, function () {
            this.hideAndDestroy();
        }.bind(_this));
        return _this;
    }
    return PowerWindow;
}(Window_1.default));
exports.default = PowerWindow;
