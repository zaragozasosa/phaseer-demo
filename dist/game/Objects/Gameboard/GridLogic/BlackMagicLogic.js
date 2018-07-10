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
var LogicalGrid_1 = require("./../LogicalGrid");
var BlackMagicLogic = (function (_super) {
    __extends(BlackMagicLogic, _super);
    function BlackMagicLogic(gameboardConfig) {
        return _super.call(this, gameboardConfig) || this;
    }
    BlackMagicLogic.prototype.power = function () {
        var tiles = this.grid.getOrdered(true);
        if (this.canUsePower()) {
            var _loop_1 = function (x) {
                var value = tiles[x].value;
                var equalTiles = tiles.filter(function (x) { return x.value === value && x.isAlive; });
                if (equalTiles.length > 1) {
                    equalTiles[0].duplicate();
                    equalTiles[1].kill();
                }
            };
            for (var x = 0; x < tiles.length; x++) {
                _loop_1(x);
            }
            this.cleanGrid();
        }
    };
    BlackMagicLogic.prototype.canUsePower = function () {
        var tiles = this.grid.getOrdered();
        if (tiles.length > 5) {
            return true;
        }
        else {
            return false;
        }
    };
    return BlackMagicLogic;
}(LogicalGrid_1.default));
exports.default = BlackMagicLogic;
