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
var Factory_1 = require("./Factory");
var TileArray = (function (_super) {
    __extends(TileArray, _super);
    function TileArray(gameboardConfig) {
        var _this = _super.call(this) || this;
        _this.gameboardConfig = gameboardConfig;
        _this.arraySize = gameboardConfig.arraySize;
        return _this;
    }
    TileArray.prototype.get = function (x, y) {
        return this.grid[y * (this.arraySize + 1) + x];
    };
    TileArray.prototype.set = function (x, y, value) {
        this.grid[y * (this.arraySize + 1) + x] = value;
    };
    TileArray.prototype.isFull = function () {
        for (var _i = 0, _a = this.grid; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.tile.value === 0) {
                return false;
            }
        }
        return true;
    };
    TileArray.prototype.emptyTiles = function () {
        var empty = 0;
        for (var _i = 0, _a = this.grid; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.tile.value === 0) {
                empty++;
            }
        }
        return empty;
    };
    TileArray.prototype.reorderTileList = function () {
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
    TileArray.prototype.calculateSum = function () {
        var points = 0;
        for (var _i = 0, _a = this.grid; _i < _a.length; _i++) {
            var items = _a[_i];
            points += items.tile.value;
        }
        return points;
    };
    return TileArray;
}(Factory_1.default));
exports.default = TileArray;
