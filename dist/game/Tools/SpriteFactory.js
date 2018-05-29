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
var SpriteFactory = (function (_super) {
    __extends(SpriteFactory, _super);
    function SpriteFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpriteFactory.prototype.makeFrame = function (x, y, paddingY, ratio) {
        if (paddingY === void 0) { paddingY = null; }
        if (ratio === void 0) { ratio = 1; }
        var settings = this.config.grid;
        var size = settings.tileSize * ratio;
        var padX = settings.gridPaddingX;
        var padY = paddingY ? paddingY : settings.gridPaddingY;
        var frame = this.createSprite(x * size, y * size, 'frame', ratio, padX, padY);
        this.game.physics.enable(frame, Phaser.Physics.ARCADE);
        return frame;
    };
    SpriteFactory.prototype.makeTile = function (x, y, id) {
        var grid = this.config.grid;
        var size = this.config.grid.tileSize;
        var scale = this.config.grid.tileScale;
        var padX = grid.gridPaddingX;
        var padY = grid.gridPaddingY;
        var sprite = this.createSprite(x * size, y * size, id, scale, padX, padY);
        this.game.physics.enable(sprite, Phaser.Physics.ARCADE);
        return sprite;
    };
    SpriteFactory.prototype.makeMenuTile = function (x, y, id, padY, ratio) {
        ratio = ratio * 190 / 180;
        var size = this.config.grid.tileSize * ratio;
        var scale = this.config.grid.tileScale * ratio;
        var padX = 0;
        return this.createSprite(x * size, y * size, id, scale, padX, padY);
    };
    SpriteFactory.prototype.updateTile = function (x, y, sprite) {
        var grid = this.config.grid;
        var size = this.config.grid.tileSize;
        var scale = this.config.grid.tileScale;
        var xPad = grid.gridPaddingX;
        var yPad = grid.gridPaddingY;
        var posX = x * size * this.config.scaleFactor;
        var posY = y * size * this.config.scaleFactor;
        var padX = this.config.safeZone.paddingX + xPad;
        var padY = this.config.safeZone.paddingY + yPad;
        sprite.position.x = posX + padX;
        sprite.position.y = posY + padY;
        return sprite;
    };
    SpriteFactory.prototype.makeCentered = function (posY, id, spriteScale) {
        if (spriteScale === void 0) { spriteScale = 1; }
        var y = posY * this.config.scaleFactor;
        var config = this.config;
        var xPad = config.safeZone.paddingX + this.config.grid.gridPaddingX;
        var yPad = config.safeZone.paddingY + this.config.grid.gridPaddingY;
        var sprite = this.game.add.sprite(0, y + yPad, id);
        sprite.scale.setTo(config.scaleFactor * spriteScale, config.scaleFactor * spriteScale);
        var x = (this.config.safeZone.safeWidth - sprite.width) / 2;
        sprite.x = xPad + x;
        return sprite;
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
    SpriteFactory.prototype.createVolumeIcon = function (posX, posY) {
        if (posX === void 0) { posX = 850; }
        if (posY === void 0) { posY = 10; }
        var config = this.config.sound;
        var volId = config.volumeSprite + '-' + config.actualVolumeIndex;
        var sprite = this.createSprite(posX, posY, volId, 1 / 3);
        sprite.tint = Phaser.Color.hexToRGB(this.config.color.altText);
        sprite.inputEnabled = true;
        return sprite;
    };
    return SpriteFactory;
}(Factory_1.default));
exports.default = SpriteFactory;
