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
var PauseWindow = (function (_super) {
    __extends(PauseWindow, _super);
    function PauseWindow(character, y) {
        if (y === void 0) { y = 500; }
        var _this = _super.call(this, character, y, false, 1) || this;
        var text = _this.tools.text.makeXBounded(380, '- PAUSED -', 70, 'center', Config_1.ColorSettings.PRIMARY);
        _this.elements.add(text);
        _this.show();
        return _this;
    }
    return PauseWindow;
}(InfoWindow_1.default));
exports.default = PauseWindow;
