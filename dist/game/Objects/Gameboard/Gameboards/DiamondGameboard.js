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
var DiamondModel_1 = require("./../../../Models/DiamondModel");
var DiamondGameboard = (function (_super) {
    __extends(DiamondGameboard, _super);
    function DiamondGameboard(gameboardConfig) {
        var _this = _super.call(this, gameboardConfig) || this;
        var mergeTileSignal = new Phaser.Signal();
        gameboardConfig.mergeTileSignal.add(function () {
            this.diamonds++;
            this.diamondText.setText(": " + this.diamonds);
            this.tryEnableButton();
        }.bind(_this));
        _this.diamondModel = _this.grid.activatePower();
        _this.diamonds = _this.diamondModel.requiredDiamonds;
        _this.diamondSprite = _this.tools.sprite.createSprite(20, 150, _this.diamondModel.id, _this.diamondModel.scale, _this.diamondModel.paddingX);
        _this.diamondText = _this.tools.text.make(100, 155, ": " + _this.diamonds, 50);
        if (_this.diamondModel.cooldown) {
            _this.gameboardConfig.cooldownSignal.add(function () {
                var text = this.tools.text.makeXBounded(650, this.diamondModel.endText, 75, 'center');
                this.tools.misc.tweenVanishAndDestroy(text, { alpha: 0 }, 1500, 'Linear', true, 1500);
                if (this.diamondModel.type === DiamondModel_1.default.TIME_TYPE) {
                    this.background.loadTexture('witch');
                    this.toogleTimer(false);
                }
                this.actionButton.visible = true;
            }.bind(_this));
        }
        for (var _i = 0, _a = gameboardConfig.tiles; _i < _a.length; _i++) {
            var sprite = _a[_i];
            _this.tools.misc.cacheAddImage(sprite.negativeId, _this.tools.sprite.makeReverseTexture(sprite.id));
        }
        _this.tools.misc.cacheAddImage('witch-negative', _this.tools.sprite.makeReverseTexture(_this.background.key.toString()));
        return _this;
    }
    DiamondGameboard.prototype.activatePower = function () {
        if (this.gameOver) {
            return true;
        }
        if (this.diamonds >= this.diamondModel.requiredDiamonds) {
            this.tools.audio.playTwoSounds(this.gameboardConfig);
            if (this.showOnce) {
                var window_1 = new PowerWindow_1.default(this.gameboardConfig.mainTile);
                this.showOnce = false;
            }
            this.grid.activatePower();
            if (this.diamondModel.type === DiamondModel_1.default.TIME_TYPE) {
                this.background.loadTexture('witch-negative');
                this.toogleTimer(true);
            }
            this.diamonds -= this.diamondModel.requiredDiamonds;
            this.diamondText.setText(": " + this.diamonds);
            this.tryDisableButton();
            if (this.diamondModel.cooldown) {
                this.actionButton.visible = false;
            }
        }
    };
    DiamondGameboard.prototype.tryEnableButton = function () {
        if (this.diamonds >= this.diamondModel.requiredDiamonds) {
            this.toogleButton(GameboardConfig_1.default.BUTTON_ACTIVE);
        }
    };
    DiamondGameboard.prototype.tryDisableButton = function () {
        if (this.diamonds < this.diamondModel.requiredDiamonds) {
            this.toogleButton(GameboardConfig_1.default.BUTTON_SLEEP_DISABLED);
        }
    };
    DiamondGameboard.prototype.toogleButton = function (buttonStatus) {
        if (this.gameOver) {
            return true;
        }
        if (buttonStatus === GameboardConfig_1.default.BUTTON_ACTIVE &&
            this.diamonds >= this.diamondModel.requiredDiamonds) {
            this.actionButton.inputEnabled = true;
            this.actionButton.tint = Phaser.Color.WHITE;
        }
        if (buttonStatus === GameboardConfig_1.default.BUTTON_SLEEP &&
            this.diamonds >= this.diamondModel.requiredDiamonds) {
            this.actionButton.inputEnabled = false;
            this.actionButton.tint = Phaser.Color.WHITE;
        }
        else if (buttonStatus === GameboardConfig_1.default.BUTTON_SLEEP_DISABLED) {
            this.actionButton.inputEnabled = false;
            this.actionButton.tint = Phaser.Color.GRAY;
        }
    };
    DiamondGameboard.prototype.toogleTimer = function (paused) {
        if (paused === void 0) { paused = true; }
        if (paused) {
            this.timer.pause();
            this.timerMessage.tint = Phaser.Color.BLUE;
        }
        else {
            this.timer.resume();
            this.timerMessage.tint = Phaser.Color.WHITE;
        }
    };
    return DiamondGameboard;
}(Gameboard_1.default));
exports.default = DiamondGameboard;
