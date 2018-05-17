"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = require("../Config");
var SpriteFactory = (function () {
    function SpriteFactory() {
        var singleton = Config_1.Singleton.getInstance();
        this.game = singleton.game;
        this.config = singleton.config;
    }
    SpriteFactory.prototype.makeTile = function (x, y, id) {
        var size = this.config.gridSettings.tileSize;
        var scale = this.config.gridSettings.tileScale;
        return this.make(x * size, y * size, id, scale);
    };
    SpriteFactory.prototype.make = function (posX, posY, id, spriteScale) {
        if (spriteScale === void 0) { spriteScale = 1; }
        var x = posX * this.config.scaleFactor;
        var y = posY * this.config.scaleFactor;
        var config = this.config;
        var xPad = config.safeZone.paddingX + this.config.gridSettings.gridPaddingX;
        var yPad = config.safeZone.paddingY + this.config.gridSettings.gridPaddingY;
        var sprite = this.game.add.sprite(x + xPad, y + yPad, id);
        sprite.scale.setTo(config.scaleFactor * spriteScale, config.scaleFactor * spriteScale);
        return sprite;
    };
    SpriteFactory.prototype.makeCentered = function (posY, id, spriteScale) {
        if (spriteScale === void 0) { spriteScale = 1; }
        var y = posY * this.config.scaleFactor;
        var config = this.config;
        var xPad = config.safeZone.paddingX + this.config.gridSettings.gridPaddingX;
        var yPad = config.safeZone.paddingY + this.config.gridSettings.gridPaddingY;
        var sprite = this.game.add.sprite(0, y + yPad, id);
        sprite.scale.setTo(config.scaleFactor * spriteScale, config.scaleFactor * spriteScale);
        var x = (this.config.safeZone.safeWidth - sprite.width) / 2;
        sprite.x = xPad + x;
        return sprite;
    };
    SpriteFactory.prototype.makeTileFrame = function (posX, posY) {
        var graphics = this.game.add.graphics(0, 0);
        var lineWidth = this.config.gridSettings.frameLineWidth;
        var frameSize = this.config.gridSettings.tileSize - lineWidth / 2;
        var color = this.config.gridSettings.lineColor;
        var xPad = this.config.safeZone.paddingX + this.config.gridSettings.gridPaddingX;
        var yPad = this.config.safeZone.paddingY + this.config.gridSettings.gridPaddingY;
        var x = posX * this.config.gridSettings.tileSize * this.config.scaleFactor + xPad;
        var y = posY * this.config.gridSettings.tileSize * this.config.scaleFactor + yPad;
        graphics.lineStyle(lineWidth, color, 1);
        var rect = graphics.drawRect(x, y, frameSize * this.config.scaleFactor, frameSize * this.config.scaleFactor);
        this.game.physics.enable(rect, Phaser.Physics.ARCADE);
        return rect;
    };
    return SpriteFactory;
}());
exports.default = SpriteFactory;
