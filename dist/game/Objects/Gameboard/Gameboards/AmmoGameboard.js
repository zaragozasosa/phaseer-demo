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
var Gameboard_1 = require("./../Gameboard");
var AmmoModel_1 = require("./../../../Models/AmmoModel");
var PowerWindow_1 = require("./../../Windows/PowerWindow");
var AmmoBar_1 = require("./../AmmoBar");
var AmmoGameboard = (function (_super) {
    __extends(AmmoGameboard, _super);
    function AmmoGameboard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AmmoGameboard.prototype.start = function () {
        this.createGrid();
        this.gameboardConfig.updateAmmoSignal.add(function () {
            this.updateAmmo();
        }.bind(this));
    };
    AmmoGameboard.prototype.activatePower = function () {
        if (this.gameOver) {
            return true;
        }
        this.actionButton.kill();
        var window = new PowerWindow_1.default(this.gameboardConfig.mainTile);
        this.tools.audio.playTwoSounds(this.gameboardConfig);
        var response = this.grid.activatePower();
        if (response && response instanceof AmmoModel_1.default) {
            var model = response;
            this.ammoBar = new AmmoBar_1.default(model);
        }
    };
    AmmoGameboard.prototype.updateAmmo = function () {
        if (this.ammoBar.update() === 0) {
            this.gameboardConfig.clickTileSignal.removeAll();
        }
    };
    return AmmoGameboard;
}(Gameboard_1.default));
exports.default = AmmoGameboard;
