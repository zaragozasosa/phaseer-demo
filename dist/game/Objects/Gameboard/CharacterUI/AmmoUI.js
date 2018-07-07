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
var AmmoBar_1 = require("./../AmmoBar");
var AmmoUI = (function (_super) {
    __extends(AmmoUI, _super);
    function AmmoUI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AmmoUI.prototype.update = function (diamonds) {
        if (this.ammoBar.update() === 0) {
            this.gameboardConfig.clickTileSignal.removeAll();
        }
    };
    AmmoUI.prototype.activatePower = function (ammo) {
        this.tools.audio.playTwoSounds(this.gameboardConfig);
        new PowerWindow_1.default(this.gameboardConfig.mainTile);
        this.ammoBar = new AmmoBar_1.default(ammo);
        this.actionButton.kill();
    };
    return AmmoUI;
}(PlayerUI_1.default));
exports.default = AmmoUI;
