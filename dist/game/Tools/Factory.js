"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = require("./../Models/Config");
var Factory = (function () {
    function Factory() {
        var singleton = Config_1.Singleton.getInstance();
        this.game = singleton.game;
        this.config = singleton.config;
    }
    return Factory;
}());
exports.default = Factory;
