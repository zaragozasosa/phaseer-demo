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
var TimeTravelLogic = (function (_super) {
    __extends(TimeTravelLogic, _super);
    function TimeTravelLogic(gameboardConfig) {
        var _this = _super.call(this, gameboardConfig) || this;
        _this.isTimeStopped = false;
        return _this;
    }
    TimeTravelLogic.prototype.power = function () {
        this.isTimeStopped = true;
        this.turnsTimeStop = this.tools.misc.randomBetween(2, 4);
        this.turnsPassed = 0;
        this.togglePauseTiles(true);
    };
    TimeTravelLogic.prototype.canUsePower = function () {
        return !this.isTimeStopped;
    };
    TimeTravelLogic.prototype.getPowerInfo = function () {
        return new DiamondModel_1.default('bug', this.gameboardConfig.requiredBugs, true, 'And time resumes!', 2.5, -5, DiamondModel_1.default.TIME_TYPE);
    };
    TimeTravelLogic.prototype.prepareNewTurn = function () {
        this.playHighestMergeSFX();
        this.cleanGrid();
        this.gameboardConfig.turnsSignal.dispatch();
        if (this.isTimeStopped) {
            this.checkTime();
        }
        else {
            this.tryToAdd();
        }
    };
    TimeTravelLogic.prototype.checkTime = function () {
        if (this.turnsPassed === this.turnsTimeStop) {
            this.isTimeStopped = false;
            this.togglePauseTiles(false);
            this.gameboardConfig.cooldownSignal.dispatch();
            for (var i = 0; i < this.turnsTimeStop; i++) {
                this.tryToAdd();
            }
        }
        else {
            this.turnsPassed++;
        }
    };
    TimeTravelLogic.prototype.togglePauseTiles = function (pause) {
        for (var _i = 0, _a = this.getTilesOrdered(); _i < _a.length; _i++) {
            var tile = _a[_i];
            if (pause) {
                tile.startTimeStop();
            }
            else {
                tile.stopTimeStop();
            }
        }
    };
    TimeTravelLogic.prototype.mergeTile = function (nextTile, previousTile) {
        nextTile.value *= 2;
        previousTile.value = 0;
        previousTile.nextTile = nextTile;
        this.gameboardConfig.mergeTileSignal.dispatch();
    };
    return TimeTravelLogic;
}(LogicalGrid_1.default));
exports.default = TimeTravelLogic;
