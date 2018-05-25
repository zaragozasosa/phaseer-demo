"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = require("./../Models/Config");
var SpriteFactory_1 = require("./../Tools/SpriteFactory");
var TextFactory_1 = require("./../Tools/TextFactory");
var GraphicsFactory_1 = require("./../Tools/GraphicsFactory");
var LogicalGrid_1 = require("./../Objects/LogicalGrid");
var InputManager_1 = require("./../Tools/InputManager");
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
        this.animating = false;
        this.wallsGroup = this.makeWalls();
        this.gridLogic = new LogicalGrid_1.default(gameboardConfig);
        this.framesGroup = this.makeTileFrames();
        this.input = new InputManager_1.default();
    }
    Grid.prototype.update = function () {
        if (!this.animating) {
            var cursor = this.input.checkCursor();
            if (cursor) {
                this.animating = this.gridLogic.scanGrid(cursor);
            }
            cursor = null;
        }
        else {
            this.manageCollisions();
        }
    };
    Grid.prototype.getColumnForDebug = function (column) {
        return this.gridLogic.getColumnForDebug(column);
    };
    Grid.prototype.calculatePoints = function () {
        return this.gridLogic.sumTiles();
    };
    Grid.prototype.manageCollisions = function () {
        if (this.gridLogic.manageCollisions(this.wallsGroup)) {
            this.animating = false;
            this.gameboardCallback();
        }
    };
    Grid.prototype.makeWalls = function () {
        var wallLength = (this.config.gridSettings.tileSize + 5) * 4;
        var group = this.game.add.group();
        group.add(this.graphicsFactory.makeWall(-10, -10, 2, wallLength));
        group.add(this.graphicsFactory.makeWall(-10, -10, wallLength, 2));
        group.add(this.graphicsFactory.makeWall(-10, wallLength, wallLength, 2));
        group.add(this.graphicsFactory.makeWall(wallLength, -10, 2, wallLength));
        return group;
    };
    Grid.prototype.makeTileFrames = function () {
        var group = this.game.add.group();
        var arraySize = this.gameboardConfig.arraySize;
        for (var x = 0; x <= arraySize; x++) {
            for (var y = 0; y <= arraySize; y++) {
                group.add(this.spriteFactory.makeTile(x, y, 'frame'));
            }
        }
        return group;
    };
    return Grid;
}());
exports.default = Grid;
