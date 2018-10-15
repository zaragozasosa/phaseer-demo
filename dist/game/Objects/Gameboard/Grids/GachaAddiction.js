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
var Grid_1 = require("./../Grid");
var DiamondModel_1 = require("./../../../Models/DiamondModel");
var GachaAddiction = (function (_super) {
    __extends(GachaAddiction, _super);
    function GachaAddiction(config) {
        return _super.call(this, config) || this;
    }
    GachaAddiction.prototype.activatePower = function () {
        this.power();
    };
    GachaAddiction.prototype.getPowerConfiguration = function () {
        this.diamondInfo = new DiamondModel_1.default('diamond', this.gameboardConfig.requiredDiamonds, 0);
        return this.diamondInfo;
    };
    GachaAddiction.prototype.power = function () {
        var tiles = this.grid.getOrdered();
        if (this.canUsePower()) {
            var maxValue = tiles[0].value;
            var minValue = tiles[tiles.length - 1].value;
            var maxTilePercentage = 20 - (tiles.length - 3);
            if (maxTilePercentage < 10) {
                maxTilePercentage = 10;
            }
            var minTilePercentage = 30 - (tiles.length - 3) * 2;
            if (minTilePercentage < 20) {
                minTilePercentage = 20;
            }
            var meanIndex = Math.round(tiles.length / 2) - 1;
            var meanValue = tiles[meanIndex].value;
            var meanChance = 20;
            for (var x = 0; x < tiles.length; x++) {
                tiles[x].randomize(maxValue, maxTilePercentage, minValue, minTilePercentage, meanValue, meanChance);
            }
            this.cleanGrid();
        }
    };
    GachaAddiction.prototype.canUsePower = function () {
        var tiles = this.grid.getOrdered();
        var unique = tiles
            .map(function (item) { return item.value; })
            .filter(function (value, index, self) { return self.indexOf(value) === index; });
        if (unique.length > 2) {
            return true;
        }
        else {
            return false;
        }
    };
    return GachaAddiction;
}(Grid_1.default));
exports.default = GachaAddiction;
