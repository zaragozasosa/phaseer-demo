"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = require("./Config");
var SpriteFactory_1 = require("./Tools/SpriteFactory");
var TextFactory_1 = require("./Tools/TextFactory");
var GraphicsFactory_1 = require("./Tools/GraphicsFactory");
var TilesArray_1 = require("./Tools/TilesArray");
var InputManager_1 = require("./Tools/InputManager");
var GridTile_1 = require("./GridTile");
var Grid = (function () {
    function Grid(gameboardConfig, gameboardCallback) {
        var singleton = Config_1.Singleton.getInstance();
        this.game = singleton.game;
        this.config = singleton.config;
        this.textFactory = new TextFactory_1.default();
        this.graphicsFactory = new GraphicsFactory_1.default();
        this.spriteFactory = new SpriteFactory_1.default();
        this.gameboardConfig = gameboardConfig;
        this.gameboardCallback = gameboardCallback;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.speed = 3000 * this.config.scaleFactor;
        this.animating = false;
        this.arraySize = gameboardConfig.arraySize;
        this.wallsGroup = this.makeWalls();
        this.lastMergedTile = 0;
        this.tilesArray = new TilesArray_1.default(gameboardConfig);
        this.tiles = [];
        this.tilesGroup = this.game.add.group();
        this.framesGroup = this.makeTileFrames();
        this.reorderTileList();
        this.addNewTile();
        this.addNewTile();
        this.input = new InputManager_1.default();
    }
    Grid.prototype.addNewTile = function () {
        do {
            var ranX = this.game.rnd.integerInRange(0, 3);
            var ranY = this.game.rnd.integerInRange(0, 3);
        } while (this.tilesArray.get(ranX, ranY));
        if (this.tilesArray.emptyTiles() > 6) {
            var chance = this.game.rnd.integerInRange(0, 99);
            this.tilesArray.set(ranX, ranY, chance === 98 ? 4 : chance >= 90 ? 2 : 1);
        }
        else {
            this.tilesArray.set(ranX, ranY, 1);
        }
        var value = this.tilesArray.get(ranX, ranY);
        var tile = new GridTile_1.default(ranX, ranY, value, this.gameboardConfig);
        this.tilesGroup.add(tile.sprite);
        this.game.world.bringToTop(this.framesGroup);
    };
    Grid.prototype.update = function () {
        if (!this.animating) {
            var cursor = this.input.checkCursor();
            if (cursor === Phaser.Keyboard.LEFT) {
                this.checkLogic(cursor, -this.speed, 0);
            }
            if (cursor === Phaser.Keyboard.RIGHT) {
                this.checkLogic(cursor, this.speed, 0);
            }
            if (cursor === Phaser.Keyboard.UP) {
                this.checkLogic(cursor, 0, -this.speed);
            }
            if (cursor === Phaser.Keyboard.DOWN) {
                this.checkLogic(cursor, 0, this.speed);
            }
            cursor = null;
        }
        else {
            this.checkCollisions();
        }
    };
    Grid.prototype.checkCollisions = function () {
        this.game.physics.arcade.overlap(this.tilesGroup, this.tilesGroup, null, function (a, b) {
            if (a.key !== b.key) {
                a.position = a.previousPosition;
                b.position = b.previousPosition;
                a.body.stop();
                b.body.stop();
            }
            return true;
        });
        this.game.physics.arcade.collide(this.tilesGroup, this.wallsGroup);
        var allStopped = true;
        this.tilesGroup.forEach(function (sprite) {
            if (sprite.body.velocity.x !== 0 || sprite.body.velocity.y !== 0) {
                allStopped = false;
            }
        }.bind(this));
        if (allStopped) {
            this.animating = false;
            this.updateGameboard();
        }
    };
    Grid.prototype.updateGameboard = function () {
        this.tilesGroup.removeAll(true);
        this.tiles = [];
        for (var x = 0; x <= this.arraySize; x++) {
            for (var y = 0; y <= this.arraySize; y++) {
                var value = this.tilesArray.get(x, y);
                if (value !== 0) {
                    var tile = new GridTile_1.default(x, y, value, this.gameboardConfig);
                    if (this.lastMergedTile === tile.value &&
                        (tile.value !== this.gameboardConfig.minimumValue * 2 ||
                            this.game.rnd.integerInRange(0, 2) === 0) &&
                        (tile.value !== this.gameboardConfig.minimumValue * 4 ||
                            this.game.rnd.integerInRange(0, 1) === 0) &&
                        (tile.value !== this.gameboardConfig.minimumValue * 8 ||
                            this.game.rnd.integerInRange(0, 1) === 0) &&
                        (tile.value !== this.gameboardConfig.minimumValue * 16 ||
                            this.game.rnd.integerInRange(0, 2) !== 0) &&
                        (tile.value !== this.gameboardConfig.minimumValue * 32 ||
                            this.game.rnd.integerInRange(0, 2) !== 0)) {
                        this.game.sound.play(tile.sfxId, 1.5);
                    }
                    this.tiles.push(tile);
                    this.tilesGroup.add(tile.sprite);
                }
            }
        }
        this.lastMergedTile = 0;
        if (!this.tilesArray.isFull()) {
            this.addNewTile();
            this.gameboardCallback();
        }
    };
    Grid.prototype.checkLogic = function (keyboardInput, xSpeed, ySpeed) {
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.isDirty = false;
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
                var tile = this.tilesArray.get(startX, startY);
                if (tile) {
                    this.pushTile(startX, startY, keyboardInput);
                }
            } while (startX !== stopX);
        } while (startY !== stopY);
        if (this.isDirty) {
            this.animating = true;
            this.tilesGroup.forEach(function (sprite) {
                sprite.body.velocity.x = this.xSpeed;
                sprite.body.velocity.y = this.ySpeed;
            }.bind(this));
        }
    };
    Grid.prototype.pushTile = function (x, y, keyboardInput) {
        var tile = this.tilesArray.get(x, y);
        var pushX = keyboardInput === Phaser.KeyCode.RIGHT
            ? 1
            : keyboardInput === Phaser.KeyCode.LEFT ? -1 : 0;
        var pushY = keyboardInput === Phaser.KeyCode.DOWN
            ? 1
            : keyboardInput === Phaser.KeyCode.UP ? -1 : 0;
        var actualX = x;
        var actualY = y;
        var newX = actualX + pushX;
        var newY = actualY + pushY;
        while (newX >= 0 &&
            newX <= this.arraySize &&
            newY >= 0 &&
            newY <= this.arraySize) {
            var nextTile = this.tilesArray.get(newX, newY);
            if (nextTile === 0) {
                this.tilesArray.set(newX, newY, tile);
                this.tilesArray.set(actualX, actualY, 0);
                actualX = newX;
                actualY = newY;
                this.isDirty = true;
            }
            else if (nextTile === tile) {
                tile *= 2;
                this.tilesArray.set(newX, newY, tile);
                this.tilesArray.set(actualX, actualY, 0);
                this.isDirty = true;
                this.lastMergedTile =
                    this.lastMergedTile < tile ? tile : this.lastMergedTile;
                break;
            }
            else {
                break;
            }
            newX += pushX;
            newY += pushY;
        }
    };
    Grid.prototype.makeWalls = function () {
        var wallLength = this.config.gridSettings.tileSize * 4;
        var group = this.game.add.group();
        this.graphicsFactory.drawGridRect();
        group.add(this.graphicsFactory.makeWall(0, 0, 1, wallLength));
        group.add(this.graphicsFactory.makeWall(0, 0, wallLength, 1));
        group.add(this.graphicsFactory.makeWall(0, wallLength, wallLength, 1));
        group.add(this.graphicsFactory.makeWall(wallLength, 0, 1, wallLength));
        return group;
    };
    Grid.prototype.makeTileFrames = function () {
        var group = this.game.add.group();
        for (var x = 0; x <= this.arraySize; x++) {
            for (var y = 0; y <= this.arraySize; y++) {
                group.add(this.spriteFactory.makeTileFrame(x, y));
            }
        }
        return group;
    };
    Grid.prototype.reorderTileList = function () {
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
    };
    return Grid;
}());
exports.default = Grid;
