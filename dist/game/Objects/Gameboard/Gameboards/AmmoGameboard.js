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
var AmmoGameboard = (function (_super) {
    __extends(AmmoGameboard, _super);
    function AmmoGameboard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AmmoGameboard.prototype.start = function () {
        this.createGrid();
        this.createPlayerUI();
        this.gameboardConfig.updateAmmoSignal.add(function () {
            this.playerUI.update();
        }.bind(this));
    };
    AmmoGameboard.prototype.activatePower = function () {
        if (this.gameOver) {
            return true;
        }
        var response = this.grid.getPowerConfiguration();
        this.playerUI.activatePower(response);
    };
    return AmmoGameboard;
}(Gameboard_1.default));
exports.default = AmmoGameboard;
