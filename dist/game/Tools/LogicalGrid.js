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
var GridTile_1 = require("./../Objects/GridTile");
var Factory_1 = require("./Factory");
var LogicalGrid = (function (_super) {
    __extends(LogicalGrid, _super);
    function LogicalGrid(gameboardConfig) {
        var _this = _super.call(this) || this;
        _this.gameboardConfig = gameboardConfig;
        _this.arraySize = gameboardConfig.arraySize;
        _this.tilesGroup = _this.game.add.group();
        _this.grid = [];
        for (var x = 0; x <= _this.arraySize; x++) {
            for (var y = 0; y <= _this.arraySize; y++) {
                _this.grid.push(null);
            }
        }
        _this.reorderTileList();
        _this.add();
        _this.add();
        return _this;
    }
    LogicalGrid.prototype.checkCollisions = function (wallsGroup) {
        for (var _i = 0, _a = this.grid.filter(function (x) { return x; }); _i < _a.length; _i++) {
            var tile = _a[_i];
            this.game.physics.arcade.collide(tile.sprite, this.tilesGroup, function (a, b) {
                if (a.key === b.key) {
                    return false;
                }
                return true;
            });
            this.game.physics.arcade.collide(tile.sprite, wallsGroup);
        }
        return this.tilesStopped();
    };
    LogicalGrid.prototype.checkInput = function (keyboardInput) {
        var animating = false;
        var minX = keyboardInput === Phaser.KeyCode.LEFT ? 1 : 0;
        var minY = keyboardInput === Phaser.KeyCode.UP ? 1 : 0;
        var maxX = keyboardInput === Phaser.KeyCode.RIGHT
            ? this.arraySize - 1
            : this.arraySize;
        var maxY = keyboardInput === Phaser.KeyCode.DOWN
            ? this.arraySize - 1
            : this.arraySize;
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
                if (this.tryPushing(startX, startY, keyboardInput)) {
                    animating = true;
                }
            } while (startX !== stopX);
        } while (startY !== stopY);
        return animating;
    };
    LogicalGrid.prototype.tryPushing = function (x, y, keyboardInput) {
        var tile = this.get(x, y);
        if (tile) {
            if (this.pushTile(tile, keyboardInput)) {
                this.animateTile(tile, keyboardInput);
                return true;
            }
            return false;
        }
        return false;
    };
    LogicalGrid.prototype.add = function () {
        var newTilePos;
        do {
            var ranX = this.game.rnd.integerInRange(0, 3);
            var ranY = this.game.rnd.integerInRange(0, 3);
        } while (this.get(ranX, ranY));
        if (this.emptyTiles() > 6) {
            var chance = this.game.rnd.integerInRange(0, 99);
            (newTilePos = ranX), ranY, chance === 98 ? 2 : chance >= 90 ? 1 : 0;
        }
        else {
            newTilePos = 0;
        }
        var value = this.get(ranX, ranY);
        var tile = new GridTile_1.default(ranX, ranY, this.gameboardConfig, newTilePos);
        this.set(ranX, ranY, tile);
        this.tilesGroup.add(tile.sprite);
    };
    LogicalGrid.prototype.updateGrid = function () {
        if (this.lastMergedTile) {
            var value = this.lastMergedTile.value;
            if ((value !== this.gameboardConfig.minimumValue * 2 ||
                this.game.rnd.integerInRange(0, 3) === 0) &&
                (value !== this.gameboardConfig.minimumValue * 4 ||
                    this.game.rnd.integerInRange(0, 2) === 0) &&
                (value !== this.gameboardConfig.minimumValue * 8 ||
                    this.game.rnd.integerInRange(0, 2) === 0) &&
                (value !== this.gameboardConfig.minimumValue * 16 ||
                    this.game.rnd.integerInRange(0, 1) === 0) &&
                (value !== this.gameboardConfig.minimumValue * 32 ||
                    this.game.rnd.integerInRange(0, 1) === 0)) {
                this.game.sound.play(this.lastMergedTile.model.sfxId, 1);
            }
        }
        this.lastMergedTile = null;
        this.mergeAndKillTiles();
        if (!this.isFull()) {
            this.add();
            return true;
        }
        else {
            return false;
        }
    };
    LogicalGrid.prototype.reorderTileList = function () {
        var list = this.gameboardConfig.tiles;
        while (list[0].id !== this.gameboardConfig.mainTile.id) {
            var last = list.pop();
            list.unshift(last);
        }
        if (list[0].friendId !== list[1].id) {
            var secondArray = [];
            secondArray.push(list[0]);
            secondArray.push(list[list.length - 1]);
            var thirdArray = list.splice(1, list.length - 2);
            this.gameboardConfig.tiles = secondArray.concat(thirdArray);
        }
        var value = this.gameboardConfig.minimumValue;
        for (var _i = 0, _a = this.gameboardConfig.tiles; _i < _a.length; _i++) {
            var tile = _a[_i];
            tile.staticValue = value;
            value *= 2;
        }
    };
    LogicalGrid.prototype.get = function (x, y) {
        var position = y * (this.arraySize + 1) + x;
        return this.grid[position];
    };
    LogicalGrid.prototype.set = function (x, y, tile) {
        var position = y * (this.arraySize + 1) + x;
        this.grid[position] = tile;
    };
    LogicalGrid.prototype.animateTile = function (tile, keyboardInput) {
        var distance = this.config.safeZone.safeWidth;
        var direction = keyboardInput === Phaser.Keyboard.UP
            ? Phaser.ANGLE_UP
            : keyboardInput === Phaser.Keyboard.DOWN
                ? Phaser.ANGLE_DOWN
                : Phaser.Keyboard.RIGHT ? Phaser.ANGLE_RIGHT : Phaser.ANGLE_LEFT;
        tile.sprite.body.moveTo(500, distance, direction);
        tile.sprite.body.stopVelocityOnCollide = true;
    };
    LogicalGrid.prototype.tilesStopped = function () {
        var allStopped = true;
        var game = this.game;
        this.tilesGroup.forEach(function (sprite) {
            if (sprite.body.velocity.x !== 0 || sprite.body.velocity.y !== 0) {
                allStopped = false;
            }
        }.bind(this));
        if (allStopped) {
            this.updateGrid();
        }
        return allStopped;
    };
    LogicalGrid.prototype.pushTile = function (tile, keyboardInput) {
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
            newX <= this.arraySize &&
            newY >= 0 &&
            newY <= this.arraySize) {
            var nextTile = this.get(newX, newY);
            if (!nextTile || !nextTile.value) {
                tile.posX = newX;
                tile.posY = newY;
                this.set(newX, newY, tile);
                this.set(actualX, actualY, null);
                actualX = newX;
                actualY = newY;
                isDirty = true;
            }
            else {
                if (nextTile && nextTile.value === tile.value) {
                    var newValue = tile.value * 2;
                    this.mergeTile(nextTile);
                    this.killTile(tile);
                    isDirty = true;
                    this.lastMergedTile =
                        this.lastMergedTile && this.lastMergedTile.value < newValue
                            ? this.get(newX, newY)
                            : this.lastMergedTile;
                    break;
                }
                else {
                    break;
                }
            }
            newX += pushX;
            newY += pushY;
        }
        return isDirty;
    };
    LogicalGrid.prototype.killTile = function (tile) {
        tile.willBeDestroyed = true;
        tile.value = 0;
    };
    LogicalGrid.prototype.mergeTile = function (tile) {
        tile.willBeMerged = true;
        tile.value *= 2;
    };
    LogicalGrid.prototype.mergeAndKillTiles = function () {
        var kill = this.grid.filter(function (x) { return x && x.willBeDestroyed; });
        if (kill.length) {
            console.log(kill);
        }
        for (var _i = 0, kill_1 = kill; _i < kill_1.length; _i++) {
            var item = kill_1[_i];
            item.sprite.destroy();
            this.set(item.posX, item.posY, null);
        }
        var merge = this.grid.filter(function (x) { return x && x.willBeMerged; });
        var _loop_1 = function (item) {
            var nextTile = this_1.gameboardConfig.tiles.find(function (x) { return x.staticValue === item.value; });
            item.sprite.loadTexture(nextTile.id);
            this_1.set(item.posX, item.posY, item);
        };
        var this_1 = this;
        for (var _a = 0, merge_1 = merge; _a < merge_1.length; _a++) {
            var item = merge_1[_a];
            _loop_1(item);
        }
        this.tilesGroup.removeAll();
        for (var _b = 0, _c = this.grid; _b < _c.length; _b++) {
            var item = _c[_b];
            if (item) {
                item.updateSprite();
                this.tilesGroup.add(item.sprite);
            }
        }
        if (this.grid.filter(function (x) { return x; }).length !== this.tilesGroup.children.length) {
            console.log(this.grid);
            console.log(this.tilesGroup.children);
            console.log('-----------');
        }
        else {
            console.log('-----------');
        }
    };
    LogicalGrid.prototype.isFull = function () {
        for (var _i = 0, _a = this.grid; _i < _a.length; _i++) {
            var tile = _a[_i];
            if (!tile) {
                return false;
            }
        }
        return true;
    };
    LogicalGrid.prototype.emptyTiles = function () {
        var empty = 0;
        for (var _i = 0, _a = this.grid; _i < _a.length; _i++) {
            var tile = _a[_i];
            if (tile && tile.value === 0) {
                empty++;
            }
        }
        return empty;
    };
    LogicalGrid.prototype.sumTiles = function () {
        var points = 0;
        for (var _i = 0, _a = this.grid; _i < _a.length; _i++) {
            var tile = _a[_i];
            points += tile ? tile.value : 0;
        }
        return points;
    };
    LogicalGrid.prototype.getColumnForDebug = function (row) {
        var val1 = this.get(row, 0) ? this.get(row, 0).value : 0;
        var val2 = this.get(row, 1) ? this.get(row, 1).value : 0;
        var val3 = this.get(row, 2) ? this.get(row, 2).value : 0;
        var val4 = this.get(row, 3) ? this.get(row, 3).value : 0;
        return val1 + "\n" + val2 + "\n" + val3 + "\n" + val4;
    };
    return LogicalGrid;
}(Factory_1.default));
exports.default = LogicalGrid;
