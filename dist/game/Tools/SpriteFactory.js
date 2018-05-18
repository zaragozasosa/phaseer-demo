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
        var padX = this.config.gridSettings.gridPaddingX;
        var padY = this.config.gridSettings.gridPaddingY;
        return this.createSprite(x * size, y * size, id, scale, padX, padY);
    };
    SpriteFactory.prototype.createSprite = function (posX, posY, id, scale, padX, padY) {
        if (scale === void 0) { scale = 1; }
        if (padX === void 0) { padX = 0; }
        if (padY === void 0) { padY = 0; }
        var x = posX * this.config.scaleFactor;
        var y = posY * this.config.scaleFactor;
        var config = this.config;
        var xPad = config.safeZone.paddingX + padX;
        var yPad = config.safeZone.paddingY + padY;
        var sprite = this.game.add.sprite(x + xPad, y + yPad, id);
        sprite.scale.setTo(config.scaleFactor * scale, config.scaleFactor * scale);
        return sprite;
    };
    SpriteFactory.prototype.makeMenuTile = function (x, y, id, yPad, ratio) {
        var size = this.config.gridSettings.tileSize * ratio;
        var scale = this.config.gridSettings.tileScale * ratio;
        return this.createSprite(x * size, y * size, id, scale, 0, yPad);
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
    SpriteFactory.prototype.makeFrame = function (x, y, size, lineWidth, color) {
        var scaledSize = this.config.scaleFactor * size;
        var graphics = this.game.add.graphics(0, 0);
        graphics.lineStyle(lineWidth, color, 1);
        var rect = graphics.drawRect(x, y, scaledSize, scaledSize);
        this.game.physics.enable(rect, Phaser.Physics.ARCADE);
        return rect;
    };
    SpriteFactory.prototype.makeTileFrame = function (posX, posY, ratio, xPadding, yPadding) {
        if (ratio === void 0) { ratio = 1; }
        if (xPadding === void 0) { xPadding = null; }
        if (yPadding === void 0) { yPadding = null; }
        var config = this.config.gridSettings;
        var scale = this.config.scaleFactor;
        var lineWidth = config.frameLineWidth;
        var safeZone = this.config.safeZone;
        var frameSize = config.tileSize * ratio - lineWidth / 2;
        var color = config.lineColor;
        var xPad = safeZone.paddingX + (xPadding ? xPadding : config.gridPaddingX);
        var yPad = safeZone.paddingY + (yPadding ? yPadding : config.gridPaddingY);
        var x = posX * config.tileSize * ratio * scale;
        var y = posY * config.tileSize * ratio * scale;
        return this.makeFrame(x + xPad, y + yPad, frameSize, lineWidth, color);
    };
    SpriteFactory.prototype.updateTileFrame = function (frame, posX, posY, ratio, xPadding, yPadding) {
        if (ratio === void 0) { ratio = 1; }
        if (xPadding === void 0) { xPadding = null; }
        if (yPadding === void 0) { yPadding = null; }
        var config = this.config.gridSettings;
        var scale = this.config.scaleFactor;
        var lineWidth = config.frameLineWidth;
        var safeZone = this.config.safeZone;
        var frameSize = config.tileSize * ratio - lineWidth / 2;
        var xPad = safeZone.paddingX + (xPadding ? xPadding : config.gridPaddingX);
        var yPad = safeZone.paddingY + (yPadding ? yPadding : config.gridPaddingY);
        var x = posX * config.tileSize * ratio * scale;
        var y = posY * config.tileSize * ratio * scale;
        frame.x = x;
        frame.y = y;
        return frame;
    };
    return SpriteFactory;
}());
exports.default = SpriteFactory;
