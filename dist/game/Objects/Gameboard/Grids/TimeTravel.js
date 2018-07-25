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
var TimeTravel = (function (_super) {
    __extends(TimeTravel, _super);
    function TimeTravel(config) {
        var _this = _super.call(this, config) || this;
        _this.isTimeStopped = false;
        return _this;
    }
    TimeTravel.prototype.getPowerConfiguration = function () {
        this.bugInfo = new DiamondModel_1.default('bug', this.gameboardConfig.requiredBugs, true, 'And time resumes!', 1.4, -5, DiamondModel_1.default.TIME_TYPE);
        return this.bugInfo;
    };
    TimeTravel.prototype.power = function () {
        this.isTimeStopped = true;
        this.turnsTimeStop = this.tools.misc.randomBetween(3, 5);
        this.turnsPassed = 0;
        this.togglePauseTiles(true);
    };
    TimeTravel.prototype.canUsePower = function () {
        return !this.isTimeStopped;
    };
    TimeTravel.prototype.newTurn = function () {
        this.cleanGrid();
        this.gameboardConfig.turnsSignal.dispatch();
        if (this.isTimeStopped) {
            this.checkTime();
        }
        else {
            this.gameRules.newTurn(this, this.grid);
        }
    };
    TimeTravel.prototype.checkTime = function () {
        if (this.turnsPassed === this.turnsTimeStop) {
            this.isTimeStopped = false;
            this.togglePauseTiles(false);
            this.gameboardConfig.cooldownSignal.dispatch();
            this.gameRules.newTurn(this, this.grid);
        }
        else {
            this.turnsPassed++;
        }
    };
    TimeTravel.prototype.togglePauseTiles = function (pause) {
        for (var _i = 0, _a = this.grid.getOrdered(); _i < _a.length; _i++) {
            var tile = _a[_i];
            if (pause) {
                tile.startTimeStop();
            }
            else {
                tile.stopTimeStop();
            }
        }
    };
    return TimeTravel;
}(Grid_1.default));
exports.default = TimeTravel;
