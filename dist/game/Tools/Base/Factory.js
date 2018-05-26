"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = require("./../../Config/Config");
var Factory = (function () {
    function Factory(config) {
        this.game = Config_1.GameInstance.get().game;
        this.config = config;
    }
    return Factory;
}());
exports.default = Factory;
