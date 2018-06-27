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
var InfoWindow_1 = require("./InfoWindow");
var Config_1 = require("./../../Config/Config");
var Window_1 = require("./Window");
var MenuList_1 = require("./../../Objects/Menu/MenuList");
var MenuObject_1 = require("./../../Objects/Menu/MenuObject");
var Menu_1 = require("./../../Objects/Menu/Menu");
var PauseWindow = (function (_super) {
    __extends(PauseWindow, _super);
    function PauseWindow(character, contCallback, quitCallback, y) {
        if (y === void 0) { y = 200; }
        var _this = _super.call(this, character, 350, false, Window_1.default.DEFAULT_HIDE_BACKGROUND) || this;
        var text = _this.tools.text.makeXBounded(y + 40, '- PAUSE -', 70, 'center', Config_1.ColorSettings.PRIMARY);
        var menuList = new MenuList_1.default('Menu');
        menuList.addChild(new MenuObject_1.default('Continue', function () {
            contCallback();
        }.bind(_this)));
        menuList.addChild(_this.tools.audio.makeVolumeMenuOption());
        menuList.addChild(new MenuObject_1.default('Quit', function () {
            quitCallback();
        }.bind(_this)));
        var menu = new Menu_1.default(menuList, 1000, 60);
        _this.menu = menu;
        _this.elements.add(text);
        _this.show();
        return _this;
    }
    return PauseWindow;
}(InfoWindow_1.default));
exports.default = PauseWindow;
