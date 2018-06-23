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
var AmmoModel_1 = require("./../../../Models/AmmoModel");
var RollForInitiativeLogic = (function (_super) {
    __extends(RollForInitiativeLogic, _super);
    function RollForInitiativeLogic(gameboardConfig) {
        return _super.call(this, gameboardConfig) || this;
    }
    RollForInitiativeLogic.prototype.power = function () {
        return new AmmoModel_1.default('dice', this.gameboardConfig.diceAmmo, 140);
    };
    RollForInitiativeLogic.prototype.useAmmo = function (tile) {
        if (this.canUsePower) {
            this.randomizeTile(tile);
            this.cleanGrid();
            this.tools.audio.playSound('magil-sfx', false);
            this.gameboardConfig.updateAmmoSignal.dispatch(tile);
            this.gameboardConfig.updateScoreSignal.dispatch(false);
        }
    };
    RollForInitiativeLogic.prototype.canUsePower = function () {
        var tiles = this.getTilesOrdered();
        var unique = tiles
            .map(function (item) { return item.value; })
            .filter(function (value, index, self) { return self.indexOf(value) === index; });
        if (unique.length > 2) {
            return true;
        }
        else {
            return false;
        }
    };
    return RollForInitiativeLogic;
}(LogicalGrid_1.default));
exports.default = RollForInitiativeLogic;
