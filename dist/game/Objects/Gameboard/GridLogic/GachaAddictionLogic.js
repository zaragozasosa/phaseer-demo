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
var LogicalGrid_1 = require("./../LogicalGrid");
var DiamondModel_1 = require("./../../../Models/DiamondModel");
var GachaAddictionLogic = (function (_super) {
    __extends(GachaAddictionLogic, _super);
    function GachaAddictionLogic(gameboardConfig) {
        return _super.call(this, gameboardConfig) || this;
    }
    GachaAddictionLogic.prototype.power = function () {
        var tiles = this.getTilesOrdered();
        if (this.canUsePower()) {
            var unique = tiles
                .map(function (item) { return item.value; })
                .filter(function (value, index, self) { return self.indexOf(value) === index; });
            var maxValue = tiles[0].value;
            var minValue = tiles[tiles.length - 1].value;
            var maxTilePercentage = 20 - (unique.length - 3) * 2.5;
            if (maxTilePercentage < 10) {
                maxTilePercentage = 10;
            }
            var minTilePercentage = 30 - (unique.length - 3) * 2.5;
            if (minTilePercentage < 20) {
                minTilePercentage = 20;
            }
            for (var x = 0; x < tiles.length; x++) {
                tiles[x].randomize(maxValue, maxTilePercentage, minValue, minTilePercentage);
            }
            this.cleanGrid();
        }
    };
    GachaAddictionLogic.prototype.canUsePower = function () {
        var tiles = this.getTilesOrdered();
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
    GachaAddictionLogic.prototype.getPowerInfo = function () {
        return new DiamondModel_1.default('diamond', this.gameboardConfig.requiredDiamonds);
    };
    GachaAddictionLogic.prototype.mergeTile = function (nextTile, previousTile) {
        nextTile.value *= 2;
        previousTile.value = 0;
        previousTile.nextTile = nextTile;
        this.gameboardConfig.mergeTileSignal.dispatch();
    };
    return GachaAddictionLogic;
}(LogicalGrid_1.default));
exports.default = GachaAddictionLogic;
