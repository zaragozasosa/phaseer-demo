"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = require("../Config");
var GraphicsFactory = (function () {
    function GraphicsFactory() {
        var singleton = Config_1.Singleton.getInstance();
        this.game = singleton.game;
        this.config = singleton.config;
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
        wall.body.setSize(long * config.scaleFactor, tall * config.scaleFactor);
        wall.body.immovable = true;
        return wall;
    };
    GraphicsFactory.prototype.drawGridRect = function () {
        var config = this.config;
        var xPad = config.safeZone.paddingX + config.gridSettings.gridPaddingX;
        var yPad = config.safeZone.paddingY + config.gridSettings.gridPaddingY;
        var graphics = this.game.add.graphics(0, 0);
        var wallLength = config.gridSettings.tileSize * 4 * config.scaleFactor;
        graphics.lineStyle(0);
        graphics.beginFill(0x66ccff, 1);
        graphics.drawRect(xPad, yPad, wallLength, wallLength);
        graphics.endFill();
    };
    return GraphicsFactory;
}());
exports.default = GraphicsFactory;
