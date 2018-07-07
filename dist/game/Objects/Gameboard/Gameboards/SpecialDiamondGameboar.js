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
var DiamondModel_1 = require("./../../../Models/DiamondModel");
var DiamondGameboard = (function (_super) {
    __extends(DiamondGameboard, _super);
    function DiamondGameboard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DiamondGameboard.prototype.start = function () {
        var _this = this;
        this.createGrid();
        this.gameboardConfig.mergeTileSignal.add(function () {
            this.diamonds++;
            this.playerUI.update(this.diamonds);
        }.bind(this));
        this.diamondModel = this.grid.getPowerConfiguration();
        this.playerUI.create(function () { return _this.activatePower(); }, this.diamondModel);
        this.diamonds = this.diamondModel.requiredDiamonds;
        if (this.diamondModel.cooldown) {
            this.gameboardConfig.cooldownSignal.add(function () {
                this.showMessage(this.diamondModel.endText, 65);
                if (this.diamondModel.type === DiamondModel_1.default.TIME_TYPE) {
                    var normalBg = this.gameboardConfig.mainTile.power.backgroundId;
                    this.background.loadTexture(normalBg);
                    this.toggleTimer(false);
                }
                this.playerUI.updateSpecialElements();
            }.bind(this));
        }
        for (var _i = 0, _a = this.gameboardConfig.tiles; _i < _a.length; _i++) {
            var sprite = _a[_i];
            this.tools.misc.cacheAddImage(sprite.negativeId, this.tools.sprite.makeReverseTexture(sprite.id));
        }
        this.tools.misc.cacheAddImage('negative-bg', this.tools.sprite.makeReverseTexture(this.background.key.toString()));
    };
    DiamondGameboard.prototype.activatePower = function () {
        if (this.gameOver) {
            return true;
        }
        if (this.diamonds >= this.diamondModel.requiredDiamonds) {
            this.tools.audio.playTwoSounds(this.gameboardConfig);
            if (this.showOnce) {
                this.playerUI.activatePower();
                this.showOnce = false;
            }
            this.grid.activatePower();
            if (this.diamondModel.type === DiamondModel_1.default.TIME_TYPE) {
                this.background.loadTexture('negative-bg');
                this.toggleTimer(true);
            }
            this.diamonds -= this.diamondModel.requiredDiamonds;
            this.playerUI.update(this.diamonds);
            this.playerUI.blockButtons();
        }
    };
    DiamondGameboard.prototype.toggleButton = function (buttonStatus) {
        if (this.gameOver) {
            return true;
        }
        this.playerUI.toggleButton(buttonStatus);
    };
    DiamondGameboard.prototype.toggleTimer = function (paused) {
        if (paused === void 0) { paused = true; }
        if (paused) {
            this.timer.pause();
            this.gameboardUI.changeTimerColor(Phaser.Color.BLUE);
        }
        else {
            this.timer.resume();
            this.gameboardUI.changeTimerColor(Phaser.Color.WHITE);
        }
    };
    return DiamondGameboard;
}(Gameboard_1.default));
exports.default = DiamondGameboard;
