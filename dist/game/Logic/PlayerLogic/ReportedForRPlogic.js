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
var ReportedForRPLogic = (function (_super) {
    __extends(ReportedForRPLogic, _super);
    function ReportedForRPLogic(gameboardConfig) {
        return _super.call(this, gameboardConfig) || this;
    }
    ReportedForRPLogic.prototype.power = function () {
        var tiles = this.getTilesOrdered();
        if (this.canUsePower()) {
            for (var x = 4; x < tiles.length; x++) {
                tiles[x].kill();
            }
            this.cleanGrid();
        }
    };
    ReportedForRPLogic.prototype.canUsePower = function () {
        var tiles = this.getTilesOrdered();
        if (tiles.length > 4) {
            return true;
        }
        else {
            return false;
        }
    };
    return ReportedForRPLogic;
}(LogicalGrid_1.default));
exports.default = ReportedForRPLogic;
