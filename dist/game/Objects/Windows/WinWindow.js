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
var WinWindow = (function (_super) {
    __extends(WinWindow, _super);
    function WinWindow(character, contCallback) {
        var _this = _super.call(this) || this;
        var y = 150;
        var elements = _this.tools.misc.addGroup();
        var sprites = _this.tools.misc.addGroup();
        var text;
        sprites.add(_this.tools.sprite.makeCenteredFromSpriteSheet(y + 120, character.id, character.specialSpriteFrame, 2));
        text = 'You win!';
        _this.config.storyboard.windowActionSignal = new Phaser.Signal();
        _this.tools.misc.runLater(500, function () {
            this.config.storyboard.windowActionSignal.addOnce(function () {
                contCallback();
            }.bind(this));
        }.bind(_this));
        elements.add(_this.tools.text.makeXBounded(y + 470, text, 80, 'center', Config_1.ColorSettings.PRIMARY));
        var cont = _this.tools.text.makeXBounded(740, 'Press a key to continue.', 50, 'center', Config_1.ColorSettings.TEXT);
        _this.tools.tween.blinkStart(cont);
        elements.add(cont);
        _this.init(elements, sprites);
        _this.show();
        return _this;
    }
    return WinWindow;
}(Window_1.default));
exports.default = WinWindow;
