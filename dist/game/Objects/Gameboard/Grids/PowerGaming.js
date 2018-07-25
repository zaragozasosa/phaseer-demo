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
var Grid_1 = require("./../Grid");
var PowerGaming = (function (_super) {
    __extends(PowerGaming, _super);
    function PowerGaming(config) {
        return _super.call(this, config) || this;
    }
    PowerGaming.prototype.power = function () {
        var tiles = this.grid.getOrdered();
        if (this.canUsePower()) {
            for (var x = 0; x < tiles.length; x++) {
                if (tiles[x].value < this.gameboardConfig.minimumValue * 32) {
                    tiles[x].duplicate();
                }
            }
            this.cleanGrid();
        }
    };
    PowerGaming.prototype.canUsePower = function () {
        var tiles = this.grid.getOrdered();
        if (tiles.length > 0 &&
            tiles[tiles.length - 1].value < this.gameboardConfig.minimumValue * 32) {
            return true;
        }
        else {
            return false;
        }
    };
    return PowerGaming;
}(Grid_1.default));
exports.default = PowerGaming;
