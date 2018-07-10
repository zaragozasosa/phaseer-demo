"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AmmoGameboard_1 = require("./../Gameboards/AmmoGameboard");
var ChargeGameboard_1 = require("./../Gameboards/ChargeGameboard");
var CooldownGameboard_1 = require("./../Gameboards/CooldownGameboard");
var DiamondGameboard_1 = require("./../Gameboards/DiamondGameboard");
var SpecialDiamondGameboard_1 = require("./../Gameboards/SpecialDiamondGameboard");
var SimplePowerGameboard_1 = require("./../Gameboards/SimplePowerGameboard");
var SimpleUI_1 = require("./../CharacterUI/SimpleUI");
var ChargeUI_1 = require("./../CharacterUI/ChargeUI");
var CooldownUI_1 = require("./../CharacterUI/CooldownUI");
var DiamondUI_1 = require("./../CharacterUI/DiamondUI");
var SpecialDiamondUI_1 = require("./../CharacterUI/SpecialDiamondUI");
var AmmoUI_1 = require("./../CharacterUI/AmmoUI");
var GameboardFactory = (function () {
    function GameboardFactory() {
    }
    GameboardFactory.create = function (config, gameUI) {
        var power = config.mainTile.powerId.toLowerCase();
        switch (power) {
            case 'RollForInitiative'.toLowerCase():
            case 'CincoDeMayo'.toLowerCase():
                return new AmmoGameboard_1.default(config, gameUI, new AmmoUI_1.default(config));
            case 'GachaAddiction'.toLowerCase():
                return new DiamondGameboard_1.default(config, gameUI, new DiamondUI_1.default(config));
            case 'TimeTravel'.toLowerCase():
                return new SpecialDiamondGameboard_1.default(config, gameUI, new SpecialDiamondUI_1.default(config));
            case 'ReportedForRP'.toLowerCase():
                return new ChargeGameboard_1.default(config, gameUI, new ChargeUI_1.default(config));
            case 'DetectiveWork'.toLowerCase():
                return new CooldownGameboard_1.default(config, gameUI, new CooldownUI_1.default(config));
            default:
                return new SimplePowerGameboard_1.default(config, gameUI, new SimpleUI_1.default(config));
        }
    };
    return GameboardFactory;
}());
exports.default = GameboardFactory;
