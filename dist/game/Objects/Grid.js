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
var Base_1 = require("./../Base");
var LogicalGrid_1 = require("./../Logic/LogicalGrid");
var InputManager_1 = require("./../InputManager");
var Grid = (function (_super) {
    __extends(Grid, _super);
    function Grid(gameboardConfig, gameboardCallback) {
        var _this = _super.call(this) || this;
        _this.gameboardConfig = gameboardConfig;
        _this.gameboardCallback = gameboardCallback;
        _this.animating = false;
        _this.wallsGroup = _this.makeWalls();
        _this.gridLogic = new LogicalGrid_1.default(gameboardConfig);
        _this.input = new InputManager_1.default(_this.config);
        return _this;
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
        var wallLength = (this.config.grid.tileSize) * 4;
        var group = this.tools.misc.addGroup();
        group.add(this.tools.graphic.makeWall(0, 0, 1, wallLength));
        group.add(this.tools.graphic.makeWall(0, 0, wallLength, 1));
        group.add(this.tools.graphic.makeWall(0, wallLength, wallLength, 1));
        group.add(this.tools.graphic.makeWall(wallLength, 0, 1, wallLength));
        return group;
    };
    Grid.prototype.makeTileFrames = function () {
        var group = this.tools.misc.addGroup();
        var arraySize = this.gameboardConfig.arraySize;
        for (var x = 0; x <= arraySize; x++) {
            for (var y = 0; y <= arraySize; y++) {
                group.add(this.tools.sprite.makeFrame(x, y));
            }
        }
        return group;
    };
    return Grid;
}(Base_1.default));
exports.default = Grid;
