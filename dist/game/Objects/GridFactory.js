"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BlackMagic_1 = require("./PlayerGrids/BlackMagic");
var PowerGaming_1 = require("./PlayerGrids/PowerGaming");
var DetectiveWork_1 = require("./PlayerGrids/DetectiveWork");
var ReportedForRP_1 = require("./PlayerGrids/ReportedForRP");
var GachaAddiction_1 = require("./PlayerGrids/GachaAddiction");
var GridFactory = (function () {
    function GridFactory() {
    }
    GridFactory.create = function (config) {
        var power = config.mainTile.powerId.toLowerCase();
        switch (power) {
            case 'ReportedForRP'.toLowerCase():
                return new ReportedForRP_1.default(config);
            case 'PowerGaming'.toLowerCase():
                return new PowerGaming_1.default(config);
            case 'DetectiveWork'.toLowerCase():
                return new DetectiveWork_1.default(config);
            case 'GachaAddiction'.toLowerCase():
                return new GachaAddiction_1.default(config);
            default:
                return new BlackMagic_1.default(config);
        }
    };
    return GridFactory;
}());
exports.default = GridFactory;
