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
    function DiamondGameboard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DiamondGameboard.prototype.start = function () {
        this.createGrid();
        var mergeTileSignal = new Phaser.Signal();
        this.gameboardConfig.mergeTileSignal.add(function () {
            this.diamonds++;
            this.diamondText.setText(": " + this.diamonds);
            this.tryEnableButton();
        }.bind(this));
        this.diamondModel = this.grid.activatePower();
        this.diamonds = this.diamondModel.requiredDiamonds;
        this.diamondSprite = this.tools.sprite.createSprite(20, 150, this.diamondModel.id, this.diamondModel.scale, this.diamondModel.paddingX);
        this.diamondText = this.tools.text.make(100, 155, ": " + this.diamonds, 50);
        this.diamondSprite.alpha = 0;
        this.diamondText.alpha = 0;
        this.tools.misc.tweenTo(this.diamondSprite, { alpha: 1 }, 500, true);
        this.tools.misc.tweenTo(this.diamondText, { alpha: 1 }, 500, true);
        if (this.diamondModel.cooldown) {
            this.gameboardConfig.cooldownSignal.add(function () {
                this.showMessage(this.diamondModel.endText, 65);
                if (this.diamondModel.type === DiamondModel_1.default.TIME_TYPE) {
                    this.background.loadTexture('witch');
                    this.toggleTimer(false);
                }
                this.actionButton.visible = true;
            }.bind(this));
        }
        for (var _i = 0, _a = this.gameboardConfig.tiles; _i < _a.length; _i++) {
            var sprite = _a[_i];
            this.tools.misc.cacheAddImage(sprite.negativeId, this.tools.sprite.makeReverseTexture(sprite.id));
        }
        this.tools.misc.cacheAddImage('witch-negative', this.tools.sprite.makeReverseTexture(this.background.key.toString()));
    };
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
                this.toggleTimer(true);
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
            this.toggleButton(GameboardConfig_1.default.BUTTON_ACTIVE);
        }
    };
    DiamondGameboard.prototype.tryDisableButton = function () {
        if (this.diamonds < this.diamondModel.requiredDiamonds) {
            this.toggleButton(GameboardConfig_1.default.BUTTON_SLEEP_DISABLED);
        }
    };
    DiamondGameboard.prototype.toggleButton = function (buttonStatus) {
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
    DiamondGameboard.prototype.toggleTimer = function (paused) {
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
