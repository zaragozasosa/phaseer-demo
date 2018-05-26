"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = require("./Config/Config");
var Base = (function () {
    function Base() {
        var singleton = Config_1.Singleton.get();
        this.config = singleton.config;
        this.tools = singleton.tools;
    }
    return Base;
}());
exports.default = Base;
