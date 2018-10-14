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
var Base_1 = require("./../../Base");
var GridTile_1 = require("./GridTile");
var GameboardConfig_1 = require("./../../Config/GameboardConfig");
var GridStructure_1 = require("./GridStructure");
var RulesFactory_1 = require("./Factories/RulesFactory");
var Grid = (function (_super) {
    __extends(Grid, _super);
    function Grid(gameboardConfig) {
        var _this = _super.call(this) || this;
        _this.gameboardConfig = gameboardConfig;
        _this.animating = false;
        _this.wallsGroup = _this.makeWalls();
        _this.arraySize = gameboardConfig.arraySize;
        _this.tilesGroup = _this.tools.misc.addGroup();
        _this.grid = new GridStructure_1.default(gameboardConfig.arraySize);
        _this.gameRules = RulesFactory_1.default.create(gameboardConfig);
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
    Object.defineProperty(Grid.prototype, "points", {
        get: function () {
            return this.grid.sumTiles();
        },
        enumerable: true,
        configurable: true
    });
    Grid.prototype.update = function (cursor) {
        if (!this.animating) {
            if (cursor) {
                this.animating = this.check(cursor);
                this.buttonDisableMightChange();
            }
            cursor = null;
        }
        else {
            this.manageCollisions();
        }
    };
    Grid.prototype.activatePower = function () {
        this.power();
    };
    Grid.prototype.add = function () {
        if (this.grid.isFull()) {
            return;
        }
        var pos = this.getTileNewPosition();
        var tile = new GridTile_1.default(pos.x, pos.y, this.gameboardConfig);
        this.grid.set(pos.x, pos.y, tile);
        this.tilesGroup.add(tile.getGroup);
    };
    Grid.prototype.check = function (keyboardInput) {
        return this.gameRules.scanGrid(this.grid, keyboardInput);
    };
    Grid.prototype.randomizeTile = function (tile) {
        if (tile === void 0) { tile = null; }
        var tiles = this.grid.getOrdered();
        var maxValue = tiles[0].value;
        var minValue = tiles[tiles.length - 1].value;
        var maxTilePercentage = 15;
        var minTilePercentage = 15;
        var meanIndex = Math.round(tiles.length / 2) - 1;
        var meanValue = tiles[meanIndex].value;
        var meanChance = 20;
        tile.randomize(maxValue, maxTilePercentage, minValue, minTilePercentage, meanValue, meanChance);
    };
    Grid.prototype.cleanGrid = function () {
        var killed = this.grid.filter(function (x) { return x && !x.isAlive; });
        for (var _i = 0, killed_1 = killed; _i < killed_1.length; _i++) {
            var item = killed_1[_i];
            item.destroy(true);
            this.grid.set(item.posX, item.posY, null);
        }
        this.tilesGroup.removeAll();
        for (var _a = 0, _b = this.grid.getTiles(); _a < _b.length; _a++) {
            var item = _b[_a];
            this.tilesGroup.add(item.getGroup);
        }
    };
    Grid.prototype.reconfigureGrid = function (newGrid) {
        var x = 0;
        var y = 0;
        for (var i = 0; i < newGrid.length; i++) {
            var tile = this.grid.get(x, y);
            var newValue = newGrid[i];
            if (newValue === '0' && tile) {
                tile.kill();
            }
            else if (newValue !== '0' && tile) {
                tile.changeValue(Number(newValue));
            }
            else if (newValue !== '0' && !tile) {
                var tile_1 = new GridTile_1.default(x, y, this.gameboardConfig, false, Number(newValue));
                this.grid.set(x, y, tile_1);
                this.tilesGroup.add(tile_1.getGroup);
            }
            x++;
            if (x > this.gameboardConfig.arraySize) {
                x = 0;
                y++;
            }
        }
        this.cleanGrid();
    };
    Grid.prototype.tilesStopped = function () {
        var allStopped = true;
        if (this.grid.filter(function (x) { return x && x.isMoving; }).length) {
            allStopped = false;
        }
        if (allStopped) {
            this.newTurn();
        }
        return allStopped;
    };
    Grid.prototype.newTurn = function () {
        this.cleanGrid();
        this.gameboardConfig.turnsSignal.dispatch();
        this.gameRules.newTurn(this, this.grid);
    };
    Grid.prototype.getTileNewPosition = function () {
        var maxPosition = this.gameboardConfig.arraySize;
        do {
            var ranX = this.tools.misc.randomBetween(0, maxPosition);
            var ranY = this.tools.misc.randomBetween(0, maxPosition);
        } while (this.grid.get(ranX, ranY));
        return new Phaser.Point(ranX, ranY);
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
        var value = this.gameboardConfig.minimumValue;
        for (var _i = 0, _a = this.gameboardConfig.tiles; _i < _a.length; _i++) {
            var tile = _a[_i];
            tile.staticValue = value;
            value *= 2;
        }
    };
    Grid.prototype.buttonDisableMightChange = function () {
        if (!this.animating && this.canUsePower()) {
            this.gameboardConfig.toggleButtonSignal.dispatch(GameboardConfig_1.default.BUTTON_ACTIVE);
        }
        else if (this.animating && this.canUsePower()) {
            this.gameboardConfig.toggleButtonSignal.dispatch(GameboardConfig_1.default.BUTTON_SLEEP);
        }
        else {
            this.gameboardConfig.toggleButtonSignal.dispatch(GameboardConfig_1.default.BUTTON_SLEEP_DISABLED);
        }
    };
    Grid.prototype.makeWalls = function () {
        var wallLength = this.config.grid.tileSize * 4;
        var group = this.tools.misc.addGroup();
        group.add(this.tools.graphic.makeWall(0, 0, 1, wallLength));
        group.add(this.tools.graphic.makeWall(0, 0, wallLength, 1));
        group.add(this.tools.graphic.makeWall(0, wallLength, wallLength, 1));
        group.add(this.tools.graphic.makeWall(wallLength, 0, 1, wallLength));
        return group;
    };
    Grid.prototype.manageCollisions = function () {
        for (var _i = 0, _a = this.grid.getTiles(); _i < _a.length; _i++) {
            var tile = _a[_i];
            tile.overlaps(this.tilesGroup, this.wallsGroup);
        }
        if (this.tilesStopped()) {
            this.animating = false;
            this.buttonDisableMightChange();
            this.gameboardConfig.updateMovementsSignal.dispatch();
        }
    };
    Grid.prototype.canUsePower = function () {
        return true;
    };
    Grid.prototype.power = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Grid.prototype.getPowerConfiguration = function () { };
    return Grid;
}(Base_1.default));
exports.default = Grid;
