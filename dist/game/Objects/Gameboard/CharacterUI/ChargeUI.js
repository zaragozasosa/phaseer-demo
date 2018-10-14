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
var PlayerUI_1 = require("./../PlayerUI");
var GameboardConfig_1 = require("./../../../Config/GameboardConfig");
var PowerWindow_1 = require("./../../Windows/PowerWindow");
var ChargeUI = (function (_super) {
    __extends(ChargeUI, _super);
    function ChargeUI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChargeUI.prototype.create = function (buttonList) {
        this.buttons = this.tools.misc.addGroup();
        var _loop_1 = function (b) {
            this_1.buttons.add(this_1.tools.button.make(b.positionX, 1250, [b.buttonId], function () { return b.callback(); }));
        };
        var this_1 = this;
        for (var _i = 0, buttonList_1 = buttonList; _i < buttonList_1.length; _i++) {
            var b = buttonList_1[_i];
            _loop_1(b);
        }
        this.buttons.alpha = 0;
        this.tools.tween.appear(this.buttons);
        this.charges = this.buttons.length;
        for (var _a = 0, _b = this.buttons.getAll(); _a < _b.length; _a++) {
            var button = _b[_a];
            button.inputEnabled = false;
            button.tint = Phaser.Color.GRAY;
        }
        var label = this.tools.text.make(20, 1370, 'Charges: ', 40);
        this.chargesText = this.tools.text.make(280, 1370, "" + this.charges, 40);
        this.tools.tween.appear(label);
        this.tools.tween.appear(this.chargesText);
    };
    ChargeUI.prototype.update = function () {
        this.tools.audio.playTwoSounds(this.gameboardConfig);
        this.charges--;
        this.chargesText.setText("" + this.charges);
        if (!this.charges) {
            this.buttons.removeAll(true);
        }
    };
    ChargeUI.prototype.activatePower = function () {
        new PowerWindow_1.default(this.gameboardConfig.mainTile);
    };
    ChargeUI.prototype.toggleButton = function (buttonStatus) {
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
    return ChargeUI;
}(PlayerUI_1.default));
exports.default = ChargeUI;
