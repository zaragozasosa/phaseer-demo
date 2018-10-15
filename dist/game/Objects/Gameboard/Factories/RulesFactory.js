"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameboardConfig_1 = require("./../../../Config/GameboardConfig");
var SimpleRules_1 = require("./../Rules/SimpleRules");
var SpecialRules_1 = require("./../Rules/SpecialRules");
var RulesFactory = (function () {
    function RulesFactory() {
    }
    RulesFactory.create = function (config) {
        if (config.gameMode === GameboardConfig_1.default.GAME_MODE_SINGLE_PLAYER) {
            return new SimpleRules_1.default(config);
        }
        else {
            return new SpecialRules_1.default(config);
        }
    };
    return RulesFactory;
}());
exports.default = RulesFactory;
