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
var InfoWindow = (function (_super) {
    __extends(InfoWindow, _super);
    function InfoWindow(character, y, pressAnyKey, window) {
        if (y === void 0) { y = 280; }
        if (pressAnyKey === void 0) { pressAnyKey = true; }
        if (window === void 0) { window = Window_1.default.DEFAULT_WINDOW; }
        var _this = _super.call(this, window) || this;
        var group = _this.tools.misc.addGroup();
        var text = _this.tools.text.make(70, y, character.power.name, 50);
        var text2 = _this.tools.text.makeXBoundedOptions(y + 20, character.power.description, 35, 'left', 850, 70, -5, Config_1.ColorSettings.ALT_TEXT);
        group.add(text);
        group.add(text2);
        if (character.power.requeriments) {
            var newY = y + 70 + 100;
            var descriptionLen = character.power.description.length;
            var textY = newY + Math.floor(descriptionLen / 35) * 50;
            var text3 = _this.tools.text.make(70, textY, 'Requirements:', 40);
            text2.addChild(text3);
            var text4 = _this.tools.text.makeXBoundedOptions(textY, character.power.requeriments, 35, 'left', 850, 70, -5, Config_1.ColorSettings.ALT_TEXT);
            group.add(text3);
            group.add(text4);
        }
        if (pressAnyKey) {
            var press = _this.tools.text.makeXBounded(y + 550, 'Press any key to continue.', 50, 'center', Config_1.ColorSettings.PRIMARY);
            group.add(press);
        }
        _this.init(group);
        return _this;
    }
    return InfoWindow;
}(Window_1.default));
exports.default = InfoWindow;
