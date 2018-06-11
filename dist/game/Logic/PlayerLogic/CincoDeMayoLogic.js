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
var AmmoModel_1 = require("./../../Models/AmmoModel");
var CincoDeMayoLogic = (function (_super) {
    __extends(CincoDeMayoLogic, _super);
    function CincoDeMayoLogic(gameboardConfig) {
        return _super.call(this, gameboardConfig) || this;
    }
    CincoDeMayoLogic.prototype.power = function () {
        return new AmmoModel_1.default('bullet', this.gameboardConfig.bulletAmmo, 175);
    };
    CincoDeMayoLogic.prototype.useAmmo = function (tile) {
        if (this.grid.filter(function (x) { return x; }).length > 1) {
            tile.kill();
            this.cleanGrid();
            this.tools.audio.playSound('nacho-sfx', false);
            this.gameboardConfig.updateAmmoSignal.dispatch(tile);
            this.gameboardConfig.updateScoreSignal.dispatch(false);
        }
    };
    CincoDeMayoLogic.prototype.canUsePower = function () {
        return true;
    };
    return CincoDeMayoLogic;
}(LogicalGrid_1.default));
exports.default = CincoDeMayoLogic;
