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
var OldDetectiveWorkLogic = (function (_super) {
    __extends(OldDetectiveWorkLogic, _super);
    function OldDetectiveWorkLogic(gameboardConfig) {
        return _super.call(this, gameboardConfig) || this;
    }
    OldDetectiveWorkLogic.prototype.power = function () {
        var tiles = this.getTilesOrdered();
        if (this.canUsePower()) {
            var _loop_1 = function (x) {
                var value = tiles[x].value;
                var equalTiles = tiles.filter(function (x) { return x.value === value && x.isAlive; });
                if (equalTiles.length % 2 === 1) {
                    tiles[x].kill();
                }
            };
            for (var x = 0; x < tiles.length; x++) {
                _loop_1(x);
            }
            this.cleanGrid();
        }
    };
    OldDetectiveWorkLogic.prototype.canUsePower = function () {
        var tiles = this.getTilesOrdered();
        var _loop_2 = function (x) {
            var value = tiles[x].value;
            var equalTiles = tiles.filter(function (x) { return x.value === value; });
            if (equalTiles.length % 2 === 1) {
                return { value: true };
            }
        };
        for (var x = 0; x < tiles.length; x++) {
            var state_1 = _loop_2(x);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return false;
    };
    return OldDetectiveWorkLogic;
}(LogicalGrid_1.default));
exports.default = OldDetectiveWorkLogic;
