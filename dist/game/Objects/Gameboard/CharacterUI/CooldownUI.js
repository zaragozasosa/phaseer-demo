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
var PowerWindow_1 = require("./../../Windows/PowerWindow");
var AmmoUI = (function (_super) {
    __extends(AmmoUI, _super);
    function AmmoUI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AmmoUI.prototype.create = function (group) {
        this.elements = group;
        this.tools.tween.appear(group);
        this.cooldownText = this.tools.text.makeStroked(20, 1370, 'Status: Select a direction', 40);
        this.tools.tween.appear(this.cooldownText);
    };
    AmmoUI.prototype.updateSpecialElements = function (text) {
        this.cooldownText.setText(text);
    };
    AmmoUI.prototype.activatePower = function (text) {
        this.elements.kill();
        new PowerWindow_1.default(this.gameboardConfig.mainTile);
        this.cooldownText.setText('Status: The culprit will appear soon!');
    };
    AmmoUI.prototype.blockButtons = function (block) {
        if (block) {
            var elementsToKill = this.elements.getAll('tint', Phaser.Color.WHITE);
            for (var _i = 0, elementsToKill_1 = elementsToKill; _i < elementsToKill_1.length; _i++) {
                var e = elementsToKill_1[_i];
                e.kill();
            }
        }
        else {
            this.elements.callAll('revive', null);
            this.elements.setAllChildren('inputEnabled', true);
            this.cooldownText.setText("Status: Investigating");
        }
    };
    AmmoUI.prototype.toggleButton = function (buttonStatus) {
    };
    return AmmoUI;
}(PlayerUI_1.default));
exports.default = AmmoUI;
