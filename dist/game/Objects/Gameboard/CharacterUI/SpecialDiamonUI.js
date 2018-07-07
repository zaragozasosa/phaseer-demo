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
var DiamondUI_1 = require("./DiamondUI");
var GameboardConfig_1 = require("./../../../Config/GameboardConfig");
var SpecialDiamonUI = (function (_super) {
    __extends(SpecialDiamonUI, _super);
    function SpecialDiamonUI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpecialDiamonUI.prototype.blockButtons = function () {
        this.actionButton.visible = false;
        if (this.diamonds < this.diamondModel.requiredDiamonds) {
            this.toggleButton(GameboardConfig_1.default.BUTTON_SLEEP_DISABLED);
        }
    };
    return SpecialDiamonUI;
}(DiamondUI_1.default));
exports.default = SpecialDiamonUI;
