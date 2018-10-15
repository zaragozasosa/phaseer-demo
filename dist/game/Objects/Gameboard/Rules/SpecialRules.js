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
var GameRules_1 = require("./../GameRules");
var SpecialRules = (function (_super) {
    __extends(SpecialRules, _super);
    function SpecialRules() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpecialRules.prototype.init = function (grid, structure) {
        _super.prototype.init.call(this, grid, structure);
        this.bossTimerCounter = 0;
        this.bossTimerNext = 4;
        this.bossTimer = this.tools.misc.createTimer();
        this.bossTimer.loop(1000, this.updateBossTimer, this);
        this.bossTimer.start();
    };
    SpecialRules.prototype.newTurn = function () {
        this.playHighestMergeSFX();
        this.addNewTiles();
        this.checkGameOver();
    };
    SpecialRules.prototype.addNewTiles = function () {
        this.grid.add();
        var size = this.gameboardConfig.arraySize + 1;
        var totalTiles = size * size;
        if (this.structure.count() < totalTiles - 10) {
            this.grid.add();
        }
    };
    SpecialRules.prototype.updateBossTimer = function () {
        var misc = this.tools.misc;
        if (this.grid.isPaused) {
            return;
        }
        if (this.bossTimerCounter === this.bossTimerNext) {
            this.bossTimerNext = misc.randomBetween(1, 2);
            this.bossNextScoreIncrease = misc.randomBetween(3, 7) * 2;
            this.grid.alternativeScore += this.bossNextScoreIncrease;
            this.bossTimerCounter = 0;
            this.checkBossWin();
        }
        else {
            this.bossTimerCounter++;
        }
    };
    SpecialRules.prototype.checkBossWin = function () {
        if (this.grid.alternativeScore > this.gameboardConfig.bossWinningTile * 2.2) {
            this.bossTimer.stop();
            this.gameboardConfig.gameOverSignal.dispatch(false);
        }
    };
    SpecialRules.prototype.checkGameOver = function () {
        if (this.structure.getOrdered()[0].value === this.gameboardConfig.bossWinningTile) {
            this.gameboardConfig.gameOverSignal.dispatch(true);
        }
        else if (!this.canKeepPlaying()) {
            this.gameboardConfig.gameOverSignal.dispatch(false);
        }
    };
    return SpecialRules;
}(GameRules_1.default));
exports.default = SpecialRules;
