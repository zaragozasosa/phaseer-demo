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
var PauseWindow = (function (_super) {
    __extends(PauseWindow, _super);
    function PauseWindow(character, contCallback, quitCallback, y) {
        if (y === void 0) { y = 380; }
        var _this = _super.call(this, character, y, false, Window_1.default.DEFAULT_HIDE_BACKGROUND) || this;
        var text = _this.tools.text.makeXBounded(y - 130, '- PAUSE -', 70, 'center', Config_1.ColorSettings.PRIMARY);
        var cont = _this.tools.text.make(100, 1050, 'Continue ', 80, Config_1.ColorSettings.TEXT);
        cont.inputEnabled = true;
        cont.events.onInputDown.add(function () {
            contCallback();
        }.bind(_this));
        var quit = _this.tools.text.make(620, 1050, 'Quit', 80, Config_1.ColorSettings.TEXT);
        quit.inputEnabled = true;
        quit.events.onInputDown.add(function () {
            quitCallback();
        }.bind(_this));
        var volume = _this.tools.text.make(200, 1285, 'Volume: ', 70, Config_1.ColorSettings.TEXT);
        var muteButton = _this.tools.sprite.createVolumeIcon();
        _this.elements.add(cont);
        _this.elements.add(quit);
        _this.elements.add(volume);
        _this.elements.add(muteButton);
        _this.elements.add(text);
        _this.show();
        return _this;
    }
    return PauseWindow;
}(InfoWindow_1.default));
exports.default = PauseWindow;
