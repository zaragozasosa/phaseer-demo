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
var GameOverWindow = (function (_super) {
    __extends(GameOverWindow, _super);
    function GameOverWindow(character, win, contCallback, quitCallback) {
        var _this = _super.call(this) || this;
        var y = _this.config.window.defaultY;
        var elements = _this.tools.misc.addGroup();
        var sprites = _this.tools.misc.addGroup();
        var text;
        var retryText;
        if (win) {
            sprites.add(_this.tools.sprite.makeCentered(y - 120, character.specialId, 2));
            text = 'You win!';
            retryText = 'Play again';
        }
        else {
            sprites.add(_this.tools.sprite.makeCentered(y - 120, character.id, 2));
            text = 'Game Over...';
            retryText = 'Try again!';
        }
        elements.add(_this.tools.text.makeXBounded(y + 520, text, 80, 'center', Config_1.ColorSettings.PRIMARY));
        var cont = _this.tools.text.make(100, 800, retryText, 70, Config_1.ColorSettings.TEXT);
        cont.inputEnabled = true;
        cont.events.onInputDown.add(function () {
            contCallback();
        }.bind(_this));
        var quit = _this.tools.text.make(650, 800, 'Quit', 70, Config_1.ColorSettings.TEXT);
        quit.inputEnabled = true;
        quit.events.onInputDown.add(function () {
            quitCallback();
        }.bind(_this));
        elements.add(cont);
        elements.add(quit);
        _this.init(elements, sprites);
        _this.show();
        return _this;
    }
    return GameOverWindow;
}(Window_1.default));
exports.default = GameOverWindow;
