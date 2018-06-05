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
        _this.diamondSprite = _this.tools.sprite.createSprite(20, 150, _this.diamondModel.id);
        _this.diamondText = _this.tools.text.make(100, 155, ": " + _this.diamonds, 50);
        _this.showOnce = true;
        return _this;
    }
    DiamondGameboard.prototype.activatePower = function () {
        if (this.diamonds >= this.diamondModel.requiredDiamonds) {
            this.tools.audio.playTwoSounds(this.gameboardConfig);
            if (this.showOnce) {
                var window_1 = new PowerWindow_1.default(this.gameboardConfig.mainTile);
                this.showOnce = false;
            }
            this.grid.activatePower();
            this.diamonds -= this.diamondModel.requiredDiamonds;
            this.diamondText.setText(": " + this.diamonds);
            this.tryDisableButton();
        }
    };
    DiamondGameboard.prototype.tryEnableButton = function () {
        if (this.diamonds >= this.diamondModel.requiredDiamonds) {
            this.toogleButton(false);
        }
    };
    DiamondGameboard.prototype.tryDisableButton = function () {
        if (this.diamonds < this.diamondModel.requiredDiamonds) {
            this.toogleButton(true);
        }
    };
    return DiamondGameboard;
}(Gameboard_1.default));
exports.default = DiamondGameboard;
