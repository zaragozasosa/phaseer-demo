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
var GhostTile_1 = require("./Tiles/GhostTile");
var Base_1 = require("./../../Base");
var GameRules = (function (_super) {
    __extends(GameRules, _super);
    function GameRules(gameboardConfig) {
        var _this = _super.call(this) || this;
        _this.gameboardConfig = gameboardConfig;
        return _this;
    }
    GameRules.prototype.newTurn = function (grid, structure) {
        this.playHighestMergeSFX();
        grid.add();
        this.checkGameOver(structure);
    };
    GameRules.prototype.scanGrid = function (grid, keyboardInput) {
        var animating = false;
        var arraySize = this.gameboardConfig.arraySize;
        var minX = keyboardInput === Phaser.KeyCode.LEFT ? 1 : 0;
        var minY = keyboardInput === Phaser.KeyCode.UP ? 1 : 0;
        var maxX = keyboardInput === Phaser.KeyCode.RIGHT
            ? arraySize - 1
            : arraySize;
        var maxY = keyboardInput === Phaser.KeyCode.DOWN
            ? arraySize - 1
            : arraySize;
        var startY = keyboardInput === Phaser.KeyCode.DOWN ? maxY : minY;
        var stopY = keyboardInput === Phaser.KeyCode.DOWN ? minY : maxY;
        var yIncrement = keyboardInput === Phaser.KeyCode.DOWN ? -1 : 1;
        var startX = keyboardInput === Phaser.KeyCode.RIGHT ? maxX : minX;
        var stopX = keyboardInput === Phaser.KeyCode.RIGHT ? minX : maxX;
        var xIncrement = keyboardInput === Phaser.KeyCode.RIGHT ? -1 : 1;
        startY -= yIncrement;
        do {
            startY += yIncrement;
            startX = keyboardInput === Phaser.KeyCode.RIGHT ? maxX : minX;
            startX -= xIncrement;
            do {
                startX += xIncrement;
                if (this.pushTile(grid, startX, startY, keyboardInput)) {
                    animating = true;
                }
            } while (startX !== stopX);
        } while (startY !== stopY);
        return animating;
    };
    GameRules.prototype.mergeTile = function (nextTile, previousTile) {
        nextTile.value *= 2;
        previousTile.value = 0;
        previousTile.nextTile = nextTile;
        this.gameboardConfig.mergeTileSignal.dispatch();
        if (nextTile instanceof GhostTile_1.default) {
            nextTile.stopGhost();
            this.gameboardConfig.cooldownSignal.dispatch(false, false, true);
        }
        else if (previousTile instanceof GhostTile_1.default) {
            this.gameboardConfig.cooldownSignal.dispatch(false, false, true);
        }
    };
    GameRules.prototype.pushTile = function (grid, x, y, keyboardInput) {
        var arraySize = this.gameboardConfig.arraySize;
        var tile = grid.get(x, y);
        if (!tile) {
            return false;
        }
        var isDirty = false;
        var pushX = keyboardInput === Phaser.KeyCode.RIGHT
            ? 1
            : keyboardInput === Phaser.KeyCode.LEFT ? -1 : 0;
        var pushY = keyboardInput === Phaser.KeyCode.DOWN
            ? 1
            : keyboardInput === Phaser.KeyCode.UP ? -1 : 0;
        var actualX = tile.posX;
        var actualY = tile.posY;
        var newX = actualX + pushX;
        var newY = actualY + pushY;
        while (newX >= 0 &&
            newX <= arraySize &&
            newY >= 0 &&
            newY <= arraySize) {
            var nextTile = grid.get(newX, newY);
            if (!nextTile || !nextTile.value) {
                tile.posX = newX;
                tile.posY = newY;
                grid.set(newX, newY, tile);
                grid.set(actualX, actualY, null);
                actualX = newX;
                actualY = newY;
                isDirty = true;
            }
            else if (nextTile && nextTile.value === tile.value) {
                var newValue = tile.value * 2;
                this.mergeTile(nextTile, tile);
                isDirty = true;
                this.lastMergedTile =
                    this.lastMergedTile && this.lastMergedTile.value >= newValue
                        ? this.lastMergedTile
                        : grid.get(newX, newY);
                break;
            }
            else {
                break;
            }
            newX += pushX;
            newY += pushY;
        }
        if (isDirty) {
            tile.animate(keyboardInput);
        }
        return isDirty;
    };
    GameRules.prototype.checkGameOver = function (grid) {
        if (grid.getOrdered()[0].value === this.gameboardConfig.winningTile) {
            this.gameboardConfig.gameOverSignal.dispatch(true);
        }
        else if (!this.canKeepPlaying(grid)) {
            this.gameboardConfig.gameOverSignal.dispatch(false);
        }
    };
    GameRules.prototype.playHighestMergeSFX = function () {
        if (this.lastMergedTile) {
            var value = this.lastMergedTile.value;
            if ((value === this.gameboardConfig.minimumValue * 2 &&
                this.tools.misc.randomBetween(0, 3) === 0) ||
                (value === this.gameboardConfig.minimumValue * 4 &&
                    this.tools.misc.randomBetween(0, 2) === 0) ||
                (value === this.gameboardConfig.minimumValue * 8 &&
                    this.tools.misc.randomBetween(0, 1) === 0) ||
                (value === this.gameboardConfig.minimumValue * 16 &&
                    this.tools.misc.randomBetween(0, 1) === 0)) {
                this.tools.audio.playCharacterSound(this.lastMergedTile.model);
            }
            this.lastMergedTile = null;
        }
    };
    GameRules.prototype.canKeepPlaying = function (grid) {
        if (grid.isFull()) {
            for (var x = 0; x < this.gameboardConfig.arraySize; x++) {
                for (var y = 0; y < this.gameboardConfig.arraySize; y++) {
                    var tile = grid.get(x, y);
                    if (tile && this.canBeMerged(grid, tile)) {
                        return true;
                    }
                }
            }
        }
        else {
            return true;
        }
        return false;
    };
    GameRules.prototype.canBeMerged = function (grid, tile) {
        if (tile.posX > 0 &&
            grid.get(tile.posX - 1, tile.posY) &&
            tile.value === grid.get(tile.posX - 1, tile.posY).value) {
            return true;
        }
        if (tile.posX < this.gameboardConfig.arraySize &&
            grid.get(tile.posX + 1, tile.posY) &&
            tile.value === grid.get(tile.posX + 1, tile.posY).value) {
            return true;
        }
        if (tile.posY > 0 &&
            grid.get(tile.posX, tile.posY - 1) &&
            tile.value === grid.get(tile.posX, tile.posY - 1).value) {
            return true;
        }
        if (tile.posY < this.gameboardConfig.arraySize &&
            grid.get(tile.posX, tile.posY + 1) &&
            tile.value === grid.get(tile.posX, tile.posY + 1).value) {
            return true;
        }
        return false;
    };
    return GameRules;
}(Base_1.default));
exports.default = GameRules;
