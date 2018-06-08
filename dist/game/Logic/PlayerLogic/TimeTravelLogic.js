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
var TimeTravelLogic = (function (_super) {
    __extends(TimeTravelLogic, _super);
    function TimeTravelLogic(gameboardConfig) {
        var _this = _super.call(this, gameboardConfig) || this;
        _this.historyArray = [];
        _this.addGridToHistory();
        return _this;
    }
    TimeTravelLogic.prototype.power = function () {
        if (this.canUsePower()) {
            var tiles = this.grid;
            var oldGrid = this.historyArray[this.historyArray.length - 4];
            this.reconfigureGrid(oldGrid.split(','));
        }
    };
    TimeTravelLogic.prototype.canUsePower = function () {
        if (this.historyArray.length > 3) {
            return true;
        }
        else {
            return false;
        }
    };
    TimeTravelLogic.prototype.onTilesStopped = function () {
        this.addGridToHistory();
    };
    TimeTravelLogic.prototype.tilesStopped = function () {
        var allStopped = true;
        if (this.grid.filter(function (x) { return x && x.isMoving; }).length) {
            allStopped = false;
        }
        if (allStopped) {
            this.onTilesStopped();
            this.prepareNewTurn();
        }
        return allStopped;
    };
    TimeTravelLogic.prototype.addGridToHistory = function () {
        var tiles = this.grid;
        var string = '';
        for (var _i = 0, tiles_1 = tiles; _i < tiles_1.length; _i++) {
            var tile = tiles_1[_i];
            if (!tile) {
                string += '0,';
            }
            else {
                string += tile.value + ",";
            }
        }
        var history = string.slice(0, -1);
        this.historyArray.push(history);
    };
    return TimeTravelLogic;
}(LogicalGrid_1.default));
exports.default = TimeTravelLogic;
