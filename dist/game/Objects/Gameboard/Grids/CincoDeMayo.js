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
        this.ammo = new AmmoModel_1.default('bullet', this.gameboardConfig.bulletAmmo, 175);
        this.gameboardConfig.clickTileSignal.add(function (tile) {
            this.power(tile);
        }.bind(this));
        return this.ammo;
    };
    TimeTravel.prototype.power = function (tile) {
        if (this.grid.filter(function (x) { return x; }).length > 1) {
            tile.kill();
            this.cleanGrid();
            this.tools.audio.playSound('nacho-sfx', false);
            this.gameboardConfig.updateAmmoSignal.dispatch(tile);
            this.gameboardConfig.updateScoreSignal.dispatch(false);
        }
    };
    return TimeTravel;
}(Grid_1.default));
exports.default = TimeTravel;
