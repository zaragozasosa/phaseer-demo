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
var Factory_1 = require("./Factory");
var GraphicsFactory = (function (_super) {
    __extends(GraphicsFactory, _super);
    function GraphicsFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GraphicsFactory.prototype.makeWall = function (x, y, long, tall) {
        var game = this.game;
        var config = this.config;
        var scale = config.scaleFactor;
        var xPad = x * config.scaleFactor +
            config.safeZone.paddingX +
            config.gridSettings.gridPaddingX;
        var yPad = y * config.scaleFactor +
            config.safeZone.paddingY +
            config.gridSettings.gridPaddingY;
        var wall = this.game.add.sprite(xPad, yPad);
        this.game.physics.enable(wall, Phaser.Physics.ARCADE);
        wall.width = long * config.scaleFactor;
        wall.height = tall * config.scaleFactor;
        wall.body.setSize(long * config.scaleFactor, tall * config.scaleFactor);
        wall.body.immovable = true;
        return wall;
    };
    GraphicsFactory.prototype.drawGridRect = function () {
    };
    GraphicsFactory.prototype.addBackground = function () {
        var safeZone = this.config.safeZone;
        var colorSettings = this.config.colorSettings;
        var xPad = safeZone.paddingX;
        var yPad = safeZone.paddingY;
        var graphics = this.game.add.graphics(0, 0);
        graphics.lineStyle(0);
        graphics.beginFill(Phaser.Color.hexToRGB(colorSettings.background), 1);
        graphics.drawRect(xPad, yPad, safeZone.safeWidth, safeZone.safeHeight);
        graphics.endFill();
    };
    return GraphicsFactory;
}(Factory_1.default));
exports.default = GraphicsFactory;
