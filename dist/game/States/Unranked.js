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
var GameboardFactory_1 = require("./../Objects/GameboardFactory");
var Unranked = (function (_super) {
    __extends(Unranked, _super);
    function Unranked() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Unranked.prototype.init = function (gameboardConfig) {
        gameboardConfig.quitSignal.add(function () {
            this.game.state.start('Boot', true, false);
        }.bind(this));
        this.gameboard = GameboardFactory_1.default.create(gameboardConfig);
    };
    Unranked.prototype.update = function () {
        this.gameboard.update();
    };
    return Unranked;
}(Phaser.State));
exports.default = Unranked;
