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
var Base_1 = require("./../../Base");
var GameboardConfig_1 = require("./../../Config/GameboardConfig");
var PowerWindow_1 = require("./../Windows/PowerWindow");
var PlayerUI = (function (_super) {
    __extends(PlayerUI, _super);
    function PlayerUI(gameboardConfig) {
        var _this = _super.call(this) || this;
        _this.gameboardConfig = gameboardConfig;
        return _this;
    }
    PlayerUI.prototype.create = function (callback) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.addPowerButton(callback);
    };
    PlayerUI.prototype.addPowerButton = function (callbackFunction) {
        this.actionButton = this.tools.button.make(310, 1250, ['power'], function () { return callbackFunction(); }, 1.5);
        this.actionButton.inputEnabled = false;
        this.actionButton.tint = Phaser.Color.GRAY;
        this.tools.tween.appear(this.actionButton);
    };
    PlayerUI.prototype.activatePower = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.tools.audio.playTwoSounds(this.gameboardConfig);
        this.actionButton.kill();
        new PowerWindow_1.default(this.gameboardConfig.mainTile);
    };
    PlayerUI.prototype.toggleButton = function (buttonStatus) {
        if (buttonStatus === GameboardConfig_1.default.BUTTON_ACTIVE) {
            this.actionButton.inputEnabled = true;
            this.actionButton.tint = Phaser.Color.WHITE;
        }
        if (buttonStatus === GameboardConfig_1.default.BUTTON_SLEEP) {
            this.actionButton.inputEnabled = false;
            this.actionButton.tint = Phaser.Color.WHITE;
        }
        else if (buttonStatus === GameboardConfig_1.default.BUTTON_SLEEP_DISABLED) {
            this.actionButton.inputEnabled = false;
            this.actionButton.tint = Phaser.Color.GRAY;
        }
    };
    PlayerUI.prototype.update = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    PlayerUI.prototype.updateSpecialElements = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    PlayerUI.prototype.blockButtons = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    return PlayerUI;
}(Base_1.default));
exports.default = PlayerUI;
