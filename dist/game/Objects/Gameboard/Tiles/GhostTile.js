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
var GridTile_1 = require("./../GridTile");
var GhostTile = (function (_super) {
    __extends(GhostTile, _super);
    function GhostTile(x, y, gameboardConfig, newTile, value, ghostCooldown) {
        if (newTile === void 0) { newTile = true; }
        if (value === void 0) { value = 0; }
        if (ghostCooldown === void 0) { ghostCooldown = 0; }
        var _this = _super.call(this, x, y, gameboardConfig, newTile, value) || this;
        var tween = _this.tools.tween;
        _this.ghostTween = tween.blink(_this.group);
        _this.group.alpha = 1;
        _this.ghostCooldown = ghostCooldown;
        _this.ghostTurns = 0;
        _this.ghostTween.start();
        return _this;
    }
    GhostTile.prototype.stopGhost = function () {
        if (this.ghostTween.isRunning) {
            this.ghostTween.stop();
        }
        this.ghostCooldown = undefined;
    };
    GhostTile.prototype.checkGhostTurns = function () {
        if (this.ghostCooldown) {
            this.ghostTurns++;
            if (this.ghostCooldown === this.ghostTurns) {
                this.kill();
                this.ghostCooldown = null;
                return true;
            }
        }
        return false;
    };
    return GhostTile;
}(GridTile_1.default));
exports.default = GhostTile;
