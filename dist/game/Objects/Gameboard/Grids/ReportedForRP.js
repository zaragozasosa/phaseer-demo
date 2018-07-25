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
var ChargeModel_1 = require("./../../../Models/ChargeModel");
var ReportedForRP = (function (_super) {
    __extends(ReportedForRP, _super);
    function ReportedForRP(config) {
        return _super.call(this, config) || this;
    }
    ReportedForRP.prototype.getPowerConfiguration = function () {
        var _this = this;
        var config = [];
        config.push(new ChargeModel_1.default('sage', 50, function () { return _this.sagedClick(); }));
        config.push(new ChargeModel_1.default('report', 350, function () { return _this.reportedClick(); }));
        config.push(new ChargeModel_1.default('ban', 650, function () { return _this.bannedClick(); }));
        return config;
    };
    ReportedForRP.prototype.sagedClick = function () {
        if (this.sagePower()) {
            this.gameboardConfig.chargeSignal.dispatch();
        }
        else {
            this.tools.audio.playBeep();
        }
    };
    ReportedForRP.prototype.reportedClick = function () {
        if (this.reportedPower()) {
            this.gameboardConfig.chargeSignal.dispatch();
        }
        else {
            this.tools.audio.playBeep();
        }
    };
    ReportedForRP.prototype.bannedClick = function () {
        if (this.bannedPower()) {
            this.gameboardConfig.chargeSignal.dispatch();
        }
        else {
            this.tools.audio.playBeep();
        }
    };
    ReportedForRP.prototype.sagePower = function () {
        var _this = this;
        if (!this.grid.isFull()) {
            var tiles = this.grid.filter(function (x) { return x && x.value == 1 * _this.gameboardConfig.minimumValue; });
            for (var _i = 0, tiles_1 = tiles; _i < tiles_1.length; _i++) {
                var tile = tiles_1[_i];
                tile.duplicate();
            }
            while (!this.grid.isFull()) {
                this.add();
            }
            this.cleanGrid();
            return true;
        }
        else {
            return false;
        }
    };
    ReportedForRP.prototype.reportedPower = function () {
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
    ReportedForRP.prototype.bannedPower = function () {
        var tilesNum = (this.gameboardConfig.arraySize + 1) *
            (this.gameboardConfig.arraySize + 1);
        if (this.grid.emptyTiles() < tilesNum - 4) {
            var tiles = this.grid.getOrdered();
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
    return ReportedForRP;
}(Grid_1.default));
exports.default = ReportedForRP;
