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
var SpriteFactory = (function (_super) {
    __extends(SpriteFactory, _super);
    function SpriteFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpriteFactory.prototype.makeFrame = function (x, y, paddingY, ratio) {
        if (paddingY === void 0) { paddingY = null; }
        if (ratio === void 0) { ratio = 1; }
        var settings = this.config.gridSettings;
        var size = settings.tileSize * ratio;
        var scale = settings.tileSize / settings.physicalTileSize * ratio;
        var padX = settings.gridPaddingX;
        var padY = paddingY ? paddingY : settings.gridPaddingY;
        return this.createSprite(x * size, y * size, 'frame', scale, padX, padY);
    };
    SpriteFactory.prototype.makeTile = function (x, y, id) {
        var gridSettings = this.config.gridSettings;
        var size = this.config.gridSettings.tileSize;
        var scale = this.config.gridSettings.tileScale;
        var padX = gridSettings.gridPaddingX + gridSettings.tilePadding;
        var padY = gridSettings.gridPaddingY + gridSettings.tilePadding;
        return this.createSprite(x * size, y * size, id, scale, padX, padY);
    };
    SpriteFactory.prototype.makeMenuTile = function (x, y, id, padY, ratio) {
        var size = this.config.gridSettings.tileSize * ratio;
        var scale = this.config.gridSettings.tileScale * ratio;
        var padX = this.config.gridSettings.gridPaddingX;
        return this.createSprite(x * size, y * size, id, scale, padX, padY);
    };
    SpriteFactory.prototype.updateTile = function (x, y, sprite) {
        var gridSettings = this.config.gridSettings;
        var size = this.config.gridSettings.tileSize;
        var scale = this.config.gridSettings.tileScale;
        var xPad = gridSettings.gridPaddingX + gridSettings.tilePadding;
        var yPad = gridSettings.gridPaddingY + gridSettings.tilePadding;
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
        var xPad = config.safeZone.paddingX + this.config.gridSettings.gridPaddingX;
        var yPad = config.safeZone.paddingY + this.config.gridSettings.gridPaddingY;
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
    return SpriteFactory;
}(Factory_1.default));
exports.default = SpriteFactory;
