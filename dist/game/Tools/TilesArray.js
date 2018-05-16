"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = require("../Config");
var TilesArray = (function () {
    function TilesArray() {
        var singleton = Config_1.Singleton.getInstance();
        var config = singleton.config;
        this.tiles = config.tileSettings.initialArray;
        this.arraySize = config.tileSettings.arraySize;
    }
    TilesArray.prototype.get = function (x, y) {
        return this.tiles[y * (this.arraySize + 1) + x];
    };
    TilesArray.prototype.set = function (x, y, value) {
        this.tiles[y * (this.arraySize + 1) + x] = value;
    };
    TilesArray.prototype.isFull = function () {
        for (var _i = 0, _a = this.tiles; _i < _a.length; _i++) {
            var tile = _a[_i];
            if (tile === 0) {
                return false;
            }
        }
        return true;
    };
    TilesArray.prototype.emptyTiles = function () {
        var empty = 0;
        for (var _i = 0, _a = this.tiles; _i < _a.length; _i++) {
            var tile = _a[_i];
            if (tile === 0) {
                empty++;
            }
        }
        return empty;
    };
    TilesArray.prototype.calculateSum = function () {
        var points = 0;
        for (var _i = 0, _a = this.tiles; _i < _a.length; _i++) {
            var tile = _a[_i];
            points += tile;
        }
        return points;
    };
    return TilesArray;
}());
exports.default = TilesArray;
