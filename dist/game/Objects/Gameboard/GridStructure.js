"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GridStructure = (function () {
    function GridStructure(arraySize) {
        this.arraySize = arraySize;
        this.grid = [];
    }
    GridStructure.prototype.getTiles = function () {
        return this.grid.filter(function (x) { return x; });
    };
    GridStructure.prototype.getOrdered = function (asc) {
        if (asc === void 0) { asc = false; }
        if (asc) {
            return this.getTiles().sort(function (n1, n2) { return n1.value - n2.value; });
        }
        else {
            return this.getTiles().sort(function (n1, n2) { return n2.value - n1.value; });
        }
    };
    GridStructure.prototype.filter = function (filter) {
        return this.grid.filter(filter);
    };
    GridStructure.prototype.push = function (tile) {
        this.grid.push(tile);
    };
    GridStructure.prototype.get = function (x, y) {
        var position = y * (this.arraySize + 1) + x;
        return this.grid[position];
    };
    GridStructure.prototype.set = function (x, y, tile) {
        var position = y * (this.arraySize + 1) + x;
        this.grid[position] = tile;
    };
    GridStructure.prototype.isFull = function () {
        for (var _i = 0, _a = this.grid; _i < _a.length; _i++) {
            var tile = _a[_i];
            if (!tile) {
                return false;
            }
        }
        return true;
    };
    GridStructure.prototype.emptyTiles = function () {
        var empty = 0;
        for (var _i = 0, _a = this.grid; _i < _a.length; _i++) {
            var tile = _a[_i];
            if (tile && tile.value === 0) {
                empty++;
            }
        }
        return empty;
    };
    GridStructure.prototype.sumTiles = function () {
        var points = 0;
        for (var _i = 0, _a = this.grid; _i < _a.length; _i++) {
            var tile = _a[_i];
            points += tile ? tile.value : 0;
        }
        return points;
    };
    GridStructure.prototype.count = function () {
        return this.grid.filter(function (x) { return x; }).length;
    };
    return GridStructure;
}());
exports.default = GridStructure;
