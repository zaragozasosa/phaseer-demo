"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = require("./../../Config/Config");
var Factory = (function () {
    function Factory(config) {
        this.game = Config_1.GameInstance.get().game;
        this.config = config;
    }
    Factory.prototype.getColor = function (color) {
        switch (color) {
            case Config_1.ColorSettings.ALT_TEXT:
                return this.config.color.altText;
            case Config_1.ColorSettings.TEXT:
                return this.config.color.text;
            case Config_1.ColorSettings.PRIMARY:
                return this.config.color.primary;
            case Config_1.ColorSettings.SELECTED:
                return this.config.color.selected;
            case Config_1.ColorSettings.BACKGROUND:
                return this.config.color.background;
        }
        return '#FFFFFF';
    };
    return Factory;
}());
exports.default = Factory;
