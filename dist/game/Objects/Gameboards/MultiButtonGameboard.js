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
var PowerWindow_1 = require("./../Windows/PowerWindow");
var MultiButtonGameboard = (function (_super) {
    __extends(MultiButtonGameboard, _super);
    function MultiButtonGameboard(gameboardConfig) {
        var _this = _super.call(this, gameboardConfig) || this;
        _this.actionButton.kill();
        var group = _this.grid.activatePower();
        _this.buttons = group;
        _this.charges = group.getAll().length;
        for (var _i = 0, _a = group.getAll(); _i < _a.length; _i++) {
            var button = _a[_i];
            button.inputEnabled = false;
            button.tint = Phaser.Color.GRAY;
        }
        _this.tools.text.make(20, 155, 'Charges: ', 50);
        _this.chargesText = _this.tools.text.make(280, 155, "" + _this.charges, 50);
        _this.gameboardConfig.chargeSignal.add(function () {
            this.useCharge();
        }.bind(_this));
        _this.showOnce = true;
        return _this;
    }
    MultiButtonGameboard.prototype.useCharge = function () {
        this.charges--;
        this.chargesText.setText("" + this.charges);
        this.tools.audio.playTwoSounds(this.gameboardConfig);
        if (this.showOnce) {
            var window_1 = new PowerWindow_1.default(this.gameboardConfig.mainTile);
            this.showOnce = false;
        }
        if (!this.charges) {
            this.buttons.removeAll(true);
        }
    };
    MultiButtonGameboard.prototype.toogleButton = function (disabled) {
        for (var _i = 0, _a = this.buttons.getAll(); _i < _a.length; _i++) {
            var button = _a[_i];
            if (disabled || this.isButtonSleeping) {
                button.tint = Phaser.Color.GRAY;
                button.inputEnabled = false;
            }
            else {
                button.tint = Phaser.Color.WHITE;
                button.inputEnabled = true;
            }
        }
    };
    return MultiButtonGameboard;
}(Gameboard_1.default));
exports.default = MultiButtonGameboard;
