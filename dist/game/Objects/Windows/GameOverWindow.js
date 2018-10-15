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
var MenuList_1 = require("./../../Objects/Menu/MenuList");
var MenuObject_1 = require("./../../Objects/Menu/MenuObject");
var Menu_1 = require("./../../Objects/Menu/Menu");
var GameOverWindow = (function (_super) {
    __extends(GameOverWindow, _super);
    function GameOverWindow(character, contCallback, quitCallback) {
        var _this = _super.call(this) || this;
        var y = 150;
        var elements = _this.tools.misc.addGroup();
        var sprites = _this.tools.misc.addGroup();
        sprites.add(_this.tools.sprite.makeCentered(y + 120, character.spriteId, 2));
        elements.add(_this.tools.text.makeXBounded(y + 470, 'Game Over...', 70, 'center', Config_1.ColorSettings.PRIMARY));
        var menuList = new MenuList_1.default('Menu');
        menuList.addChild(new MenuObject_1.default('Try again!', function () {
            contCallback();
        }.bind(_this)));
        menuList.addChild(new MenuObject_1.default('Quit', function () {
            quitCallback();
        }.bind(_this)));
        var menu = new Menu_1.default(menuList, 740, 50);
        _this.menu = menu;
        _this.init(elements, sprites);
        _this.show();
        return _this;
    }
    return GameOverWindow;
}(Window_1.default));
exports.default = GameOverWindow;
