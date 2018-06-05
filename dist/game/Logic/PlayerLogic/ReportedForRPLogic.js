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
var ReportedForRPLogic = (function (_super) {
    __extends(ReportedForRPLogic, _super);
    function ReportedForRPLogic(gameboardConfig) {
        return _super.call(this, gameboardConfig) || this;
    }
    ReportedForRPLogic.prototype.sagePower = function () {
        var _this = this;
        if (!this.isFull()) {
            var tiles = this.grid.filter(function (x) { return x && x.value == 1 * _this.gameboardConfig.minimumValue; });
            for (var _i = 0, tiles_1 = tiles; _i < tiles_1.length; _i++) {
                var tile = tiles_1[_i];
                tile.duplicate();
            }
            while (!this.isFull()) {
                this.add();
            }
            this.cleanGrid();
            return true;
        }
        else {
            return false;
        }
    };
    ReportedForRPLogic.prototype.reportedPower = function () {
        var _this = this;
        var tiles = this.grid.filter(function (x) { return x && x.value < 4 * _this.gameboardConfig.minimumValue; });
        if (tiles.length < this.grid.filter(function (x) { return x; }).length) {
            for (var x = 0; x < tiles.length; x++) {
                if (tiles[x].value < 4 * this.gameboardConfig.minimumValue) {
                    tiles[x].kill();
                }
            }
            this.cleanGrid();
            return true;
        }
        else {
            return false;
        }
    };
    ReportedForRPLogic.prototype.bannedPower = function () {
        var tilesNum = (this.gameboardConfig.arraySize + 1) *
            (this.gameboardConfig.arraySize + 1);
        if (this.emptyTiles() < tilesNum - 4) {
            var tiles = this.getTilesOrdered();
            for (var x = 1; x < tiles.length; x++) {
                tiles[x].kill();
            }
            this.cleanGrid();
            return true;
        }
        else {
            return false;
        }
    };
    ReportedForRPLogic.prototype.canUsePower = function () {
        return true;
    };
    ReportedForRPLogic.prototype.power = function () { };
    return ReportedForRPLogic;
}(LogicalGrid_1.default));
exports.default = ReportedForRPLogic;
