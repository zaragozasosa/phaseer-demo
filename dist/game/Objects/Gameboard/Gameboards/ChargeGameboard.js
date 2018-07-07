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
var ChargeGameboard = (function (_super) {
    __extends(ChargeGameboard, _super);
    function ChargeGameboard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChargeGameboard.prototype.start = function () {
        this.createGrid();
        var buttonsInfo = this.grid.getPowerConfiguration();
        this.playerUI.create(buttonsInfo);
        this.showOnce = true;
        this.gameboardConfig.chargeSignal.add(function () {
            this.useCharge();
        }.bind(this));
    };
    ChargeGameboard.prototype.useCharge = function () {
        this.playerUI.update();
        if (this.showOnce) {
            this.playerUI.activatePower();
            this.showOnce = false;
        }
    };
    ChargeGameboard.prototype.toggleButton = function (buttonStatus) {
        if (this.gameOver) {
            return true;
        }
        this.playerUI.toggleButton(buttonStatus);
    };
    return ChargeGameboard;
}(Gameboard_1.default));
exports.default = ChargeGameboard;
