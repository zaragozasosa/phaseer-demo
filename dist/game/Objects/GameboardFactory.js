"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Gameboard_1 = require("./Gameboard");
var AmmoGameboard_1 = require("./Gameboards/AmmoGameboard");
var ChargeGameboard_1 = require("./Gameboards/ChargeGameboard");
var CooldownGameboard_1 = require("./Gameboards/CooldownGameboard");
var DiamondGameboard_1 = require("./Gameboards/DiamondGameboard");
var GameboardFactory = (function () {
    function GameboardFactory() {
    }
    GameboardFactory.create = function (config) {
        var power = config.mainTile.powerId.toLowerCase();
        switch (power) {
            case 'RollForInitiative'.toLowerCase():
            case 'CincoDeMayo'.toLowerCase():
                return new AmmoGameboard_1.default(config);
            case 'GachaAddiction'.toLowerCase():
                return new DiamondGameboard_1.default(config);
            case 'ReportedForRP'.toLowerCase():
                return new ChargeGameboard_1.default(config);
            case 'DetectiveWork'.toLowerCase():
                return new CooldownGameboard_1.default(config);
            default:
                return new Gameboard_1.default(config);
        }
    };
    return GameboardFactory;
}());
exports.default = GameboardFactory;
