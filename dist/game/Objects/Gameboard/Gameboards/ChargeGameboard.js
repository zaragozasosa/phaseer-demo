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
var GameboardConfig_1 = require("./../../../Config/GameboardConfig");
var PowerWindow_1 = require("./../../Windows/PowerWindow");
var ChargeGameboard = (function (_super) {
    __extends(ChargeGameboard, _super);
    function ChargeGameboard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChargeGameboard.prototype.start = function () {
        this.createGrid();
        this.actionButton.kill();
        var group = this.grid.activatePower();
        this.buttons = group;
        this.charges = group.getAll().length;
        for (var _i = 0, _a = group.getAll(); _i < _a.length; _i++) {
            var button = _a[_i];
            button.inputEnabled = false;
            button.tint = Phaser.Color.GRAY;
        }
        this.tools.text.make(20, 135, 'Charges: ', 50);
        this.chargesText = this.tools.text.make(280, 135, "" + this.charges, 50);
        this.gameboardConfig.chargeSignal.add(function () {
            this.useCharge();
        }.bind(this));
        this.showOnce = true;
    };
    ChargeGameboard.prototype.useCharge = function () {
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
    ChargeGameboard.prototype.toggleButton = function (buttonStatus) {
        if (this.gameOver) {
            return true;
        }
        for (var _i = 0, _a = this.buttons.getAll(); _i < _a.length; _i++) {
            var button = _a[_i];
            if (buttonStatus === GameboardConfig_1.default.BUTTON_ACTIVE) {
                button.tint = Phaser.Color.WHITE;
                button.inputEnabled = true;
            }
            if (buttonStatus === GameboardConfig_1.default.BUTTON_SLEEP) {
                button.tint = Phaser.Color.WHITE;
                button.inputEnabled = false;
            }
            else if (buttonStatus === GameboardConfig_1.default.BUTTON_SLEEP_DISABLED) {
                button.tint = Phaser.Color.GRAY;
                button.inputEnabled = false;
            }
        }
    };
    return ChargeGameboard;
}(Gameboard_1.default));
exports.default = ChargeGameboard;
