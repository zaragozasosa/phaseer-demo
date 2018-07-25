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
var AmmoModel_1 = require("./../../../Models/AmmoModel");
var TimeTravel = (function (_super) {
    __extends(TimeTravel, _super);
    function TimeTravel(config) {
        return _super.call(this, config) || this;
    }
    TimeTravel.prototype.getPowerConfiguration = function () {
        this.ammo = new AmmoModel_1.default('dice', this.gameboardConfig.diceAmmo, 140);
        this.gameboardConfig.clickTileSignal.add(function (tile) {
            this.power(tile);
        }.bind(this));
        return this.ammo;
    };
    TimeTravel.prototype.power = function (tile) {
        if (this.canUsePower) {
            this.randomizeTile(tile);
            this.cleanGrid();
            this.tools.audio.playSound('magil-sfx', false);
            this.gameboardConfig.updateAmmoSignal.dispatch(tile);
            this.gameboardConfig.updateScoreSignal.dispatch(false);
        }
    };
    TimeTravel.prototype.canUsePower = function () {
        var tiles = this.grid.getOrdered();
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
    return TimeTravel;
}(Grid_1.default));
exports.default = TimeTravel;
