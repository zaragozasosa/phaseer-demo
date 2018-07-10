"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SimpleRules_1 = require("./../Rules/SimpleRules");
var RulesFactory = (function () {
    function RulesFactory() {
    }
    RulesFactory.create = function (config) {
        return new SimpleRules_1.default(config);
    };
    return RulesFactory;
}());
exports.default = RulesFactory;
