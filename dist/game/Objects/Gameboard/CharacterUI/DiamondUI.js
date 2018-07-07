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
var DiamondUI = (function (_super) {
    __extends(DiamondUI, _super);
    function DiamondUI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DiamondUI.prototype.create = function (callback, diamondModel) {
        this.addPowerButton(callback);
        this.diamondModel = diamondModel;
        this.diamonds = this.diamondModel.requiredDiamonds;
        this.diamondSprite = this.tools.sprite.createSprite(20, 1345, this.diamondModel.id, this.diamondModel.scale, this.diamondModel.paddingX);
        this.diamondText = this.tools.text.make(100, 1350, ": " + this.diamonds, 50);
        this.tools.tween.appear(this.diamondSprite);
        this.tools.tween.appear(this.diamondText);
    };
    DiamondUI.prototype.update = function (diamonds) {
        this.diamonds = diamonds;
        this.diamondText.setText(": " + this.diamonds);
        if (this.diamonds >= this.diamondModel.requiredDiamonds) {
            this.toggleButton(GameboardConfig_1.default.BUTTON_ACTIVE);
        }
    };
    DiamondUI.prototype.blockButtons = function () {
        if (this.diamonds < this.diamondModel.requiredDiamonds) {
            this.toggleButton(GameboardConfig_1.default.BUTTON_SLEEP_DISABLED);
        }
    };
    DiamondUI.prototype.activatePower = function () {
        new PowerWindow_1.default(this.gameboardConfig.mainTile);
    };
    DiamondUI.prototype.updateSpecialElements = function () {
        this.actionButton.visible = true;
    };
    return DiamondUI;
}(PlayerUI_1.default));
exports.default = DiamondUI;
