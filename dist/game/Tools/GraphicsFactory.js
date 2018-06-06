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
var Factory_1 = require("./Base/Factory");
var Config_1 = require("./../Config/Config");
var GraphicsFactory = (function (_super) {
    __extends(GraphicsFactory, _super);
    function GraphicsFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GraphicsFactory.prototype.makeWall = function (x, y, long, tall) {
        var game = this.game;
        var config = this.config;
        var scale = config.scaleFactor;
        var xPad = (x - 5) * config.scaleFactor +
            config.safeZone.paddingX +
            config.grid.gridPaddingX;
        var yPad = (y - 5) * config.scaleFactor +
            config.safeZone.paddingY +
            config.grid.gridPaddingY;
        var wall = this.game.add.sprite(xPad, yPad);
        this.game.physics.enable(wall, Phaser.Physics.ARCADE);
        wall.width = long * config.scaleFactor;
        wall.height = tall * config.scaleFactor;
        wall.body.setSize((long + 20) * config.scaleFactor, (tall + 20) * config.scaleFactor);
        wall.body.immovable = true;
        return wall;
    };
    GraphicsFactory.prototype.addBackground = function (color, alpha) {
        if (color === void 0) { color = Config_1.ColorSettings.BACKGROUND; }
        if (alpha === void 0) { alpha = 1; }
        var safeZone = this.config.safeZone;
        var colorString = this.getColor(color);
        var xPad = safeZone.bgPaddingX;
        var yPad = safeZone.bgPaddingY;
        var graphics = this.game.add.graphics(0, 0);
        graphics.lineStyle(0);
        graphics.beginFill(Phaser.Color.hexToRGB(colorString), alpha);
        graphics.drawRect(xPad, yPad, safeZone.bgWidth, safeZone.bgHeight);
        return graphics.endFill();
    };
    GraphicsFactory.prototype.addWindowBackground = function (alpha) {
        return this.addBackground(Config_1.ColorSettings.BLACK, alpha);
    };
    GraphicsFactory.prototype.makeRect = function (x, y, length, height, lineWidth) {
        if (lineWidth === void 0) { lineWidth = 0; }
        var safeZone = this.config.safeZone;
        var config = this.config;
        var color = this.config.color;
        var posX = safeZone.paddingX + x;
        var posY = safeZone.paddingY + y;
        var graphics = this.game.add.graphics(0, 0);
        graphics.lineStyle(lineWidth * config.scaleFactor, Phaser.Color.BLACK);
        graphics.beginFill(Phaser.Color.hexToRGB(color.background), 1);
        var rect = graphics.drawRect(posX, posY, length, height);
        graphics.endFill();
        return rect;
    };
    GraphicsFactory.prototype.makeWindowRect = function () {
        var w = this.config.window;
        return this.makeRect(w.defaultX, w.defaultY, w.defaultWidth, w.defaultHeight, w.defaultLineWidth);
    };
    return GraphicsFactory;
}(Factory_1.default));
exports.default = GraphicsFactory;
