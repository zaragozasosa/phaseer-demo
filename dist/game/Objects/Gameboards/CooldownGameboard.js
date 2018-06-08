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
var CooldownGameboard = (function (_super) {
    __extends(CooldownGameboard, _super);
    function CooldownGameboard(gameboardConfig) {
        var _this = _super.call(this, gameboardConfig) || this;
        _this.actionButton.kill();
        var group = _this.grid.activatePower();
        _this.elements = group;
        _this.gameboardConfig.cooldownSignal.add(function (startCooldown) {
            if (startCooldown) {
                this.blockElements();
            }
        }.bind(_this));
        return _this;
    }
    CooldownGameboard.prototype.blockElements = function () { };
    return CooldownGameboard;
}(Gameboard_1.default));
exports.default = CooldownGameboard;
