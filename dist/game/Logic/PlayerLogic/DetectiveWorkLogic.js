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
var GridTile_1 = require("./../../Objects/GridTile");
var ReportedForRPLogic = (function (_super) {
    __extends(ReportedForRPLogic, _super);
    function ReportedForRPLogic(gameboardConfig) {
        var _this = _super.call(this, gameboardConfig) || this;
        _this.direction = null;
        _this.makeGhost = false;
        return _this;
    }
    ReportedForRPLogic.prototype.changeFlow = function (direction) {
        this.gameboardConfig.cooldownSignal.dispatch(false, 5);
        this.direction = direction;
    };
    ReportedForRPLogic.prototype.investigate = function () {
        var turnsToActivate = this.tools.misc.randomBetween(2, 6);
        this.gameboardConfig.cooldownSignal.dispatch(true, turnsToActivate);
    };
    ReportedForRPLogic.prototype.createGhostTile = function () {
        this.makeGhost = true;
        this.turnsToDisappear = 5;
        this.ghostTileValue = this.getTilesOrdered()[0].value;
        this.add();
        return this.turnsToDisappear;
    };
    ReportedForRPLogic.prototype.add = function () {
        if (!this.direction) {
            do {
                var ranX = this.tools.misc.randomBetween(0, 3);
                var ranY = this.tools.misc.randomBetween(0, 3);
            } while (this.get(ranX, ranY));
            this.makeNewTile(ranX, ranY);
        }
        else {
            var maxPosition = this.gameboardConfig.arraySize;
            if (this.direction === Phaser.Keyboard.UP) {
                this.makeNewTileAround(null, 0, 1);
            }
            else if (this.direction === Phaser.Keyboard.DOWN) {
                this.makeNewTileAround(null, maxPosition, -1);
            }
            if (this.direction === Phaser.Keyboard.LEFT) {
                this.makeNewTileAround(0, null, 1);
            }
            if (this.direction === Phaser.Keyboard.RIGHT) {
                this.makeNewTileAround(maxPosition, null, -1);
            }
        }
    };
    ReportedForRPLogic.prototype.makeNewTileAround = function (posX, posY, delta) {
        var max = this.gameboardConfig.arraySize;
        var min = 0;
        if (posX === null) {
            for (var _i = 0, _a = this.randomListBetween(min, max); _i < _a.length; _i++) {
                var x = _a[_i];
                if (!this.get(x, posY)) {
                    return this.makeNewTile(x, posY);
                }
            }
            if ((posY === min && delta === -1) || (posY === max && delta === 1)) {
                return;
            }
            else {
                return this.makeNewTileAround(null, posY + delta, delta);
            }
        }
        else if (posY === null) {
            for (var _b = 0, _c = this.randomListBetween(min, max); _b < _c.length; _b++) {
                var y = _c[_b];
                if (!this.get(posX, y)) {
                    return this.makeNewTile(posX, y);
                }
            }
            if ((posX === min && delta === -1) || (posX === max && delta === 1)) {
                return;
            }
            else {
                return this.makeNewTileAround(posX + delta, null, delta);
            }
        }
    };
    ReportedForRPLogic.prototype.makeNewTile = function (posX, posY) {
        var newTilePos;
        if (this.emptyTiles() > 6) {
            var chance = this.tools.misc.randomBetween(0, 99);
            (newTilePos = posX), posY, chance === 98 ? 2 : chance >= 90 ? 1 : 0;
        }
        else {
            newTilePos = 0;
        }
        if (this.makeGhost) {
            var tile_1 = new GridTile_1.default(posX, posY, this.gameboardConfig, null, this.ghostTileValue, true, this.turnsToDisappear);
            this.set(posX, posY, tile_1);
            this.tilesGroup.add(tile_1.getGroup);
            this.makeGhost = false;
            this.gameboardConfig.turnsSignal.add(function () {
                if (tile_1.checkTurns()) {
                    this.cleanGrid();
                }
            }.bind(this));
        }
        else {
            var tile = new GridTile_1.default(posX, posY, this.gameboardConfig, newTilePos);
            this.set(posX, posY, tile);
            this.tilesGroup.add(tile.getGroup);
        }
    };
    ReportedForRPLogic.prototype.randomListBetween = function (min, max) {
        var list = [];
        for (var i = min; i <= max; i++) {
            list.push(i);
        }
        return this.tools.misc.shuffleUniqueArray(list);
    };
    ReportedForRPLogic.prototype.mergeTile = function (nextTile, previousTile) {
        nextTile.value *= 2;
        previousTile.value = 0;
        previousTile.nextTile = nextTile;
        if (nextTile.isGhost() || previousTile.isGhost()) {
            nextTile.stopGhost();
            previousTile.stopGhost();
            debugger;
            this.gameboardConfig.cooldownSignal.dispatch(false, false, true);
        }
    };
    ReportedForRPLogic.prototype.canUsePower = function () {
        return true;
    };
    ReportedForRPLogic.prototype.power = function () { };
    return ReportedForRPLogic;
}(LogicalGrid_1.default));
exports.default = ReportedForRPLogic;
