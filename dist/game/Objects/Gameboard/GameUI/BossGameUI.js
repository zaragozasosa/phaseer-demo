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
var GameboardUI_1 = require("./../GameboardUI");
var BossGameUI = (function (_super) {
    __extends(BossGameUI, _super);
    function BossGameUI(gameboardConfig) {
        var _this = _super.call(this, gameboardConfig) || this;
        _this.gameboardConfig.arraySize = _this.gameboardConfig.bossArraySize;
        return _this;
    }
    BossGameUI.prototype.create = function (timer, pauseCallback) {
        this.addHeader();
        this.addMenuButton(pauseCallback);
    };
    BossGameUI.prototype.addHeader = function () {
        this.header = this.tools.text.make(20, 20, '', 50);
        this.tools.tween.appear(this.header);
        this.updateHeader();
    };
    BossGameUI.prototype.updateHeader = function () {
        this.header.setText("Score: " + this.points);
    };
    BossGameUI.prototype.update = function (points) {
        this.points = points;
        this.updateHeader();
    };
    return BossGameUI;
}(GameboardUI_1.default));
exports.default = BossGameUI;
