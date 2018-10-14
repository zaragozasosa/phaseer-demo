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
var DiamondGameboard_1 = require("./DiamondGameboard");
var DiamondModel_1 = require("./../../../Models/DiamondModel");
var SpecialDiamondGameboard = (function (_super) {
    __extends(SpecialDiamondGameboard, _super);
    function SpecialDiamondGameboard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpecialDiamondGameboard.prototype.start = function () {
        _super.prototype.start.call(this);
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
            this.tools.misc.cacheAddSpritesheet(sprite.negativeId, this.tools.sprite.makeReverseTexture(sprite.id));
        }
        this.tools.misc.cacheAddImage('negative-bg', this.tools.sprite.makeReverseTexture(this.gameboardConfig.mainTile.power.backgroundId));
    };
    SpecialDiamondGameboard.prototype.activatePower = function () {
        if (this.diamonds >= this.diamondModel.requiredDiamonds) {
            this.background.loadTexture('negative-bg');
            this.toggleTimer(true);
        }
        if (_super.prototype.activatePower.call(this)) {
            return true;
        }
    };
    SpecialDiamondGameboard.prototype.toggleTimer = function (paused) {
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
    return SpecialDiamondGameboard;
}(DiamondGameboard_1.default));
exports.default = SpecialDiamondGameboard;
