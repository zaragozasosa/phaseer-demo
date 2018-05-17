"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SpriteFactory_1 = require("./Tools/SpriteFactory");
var TileSprite = (function () {
    function TileSprite(x, y, value, game, config) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.game = game;
        this.config = config;
        this.spriteFactory = new SpriteFactory_1.default();
        this.createSprite();
    }
    TileSprite.prototype.createSprite = function () {
        var id = this.getTileSprite(this.value);
        var sprite = this.spriteFactory.makeTile(this.x, this.y, id);
        this.sfxId = id + '-sfx';
        this.game.physics.enable(sprite, Phaser.Physics.ARCADE);
        sprite.body.collideWorldBounds = true;
        this.sprite = sprite;
    };
    TileSprite.prototype.getTileSprite = function (tile) {
        var list = this.config.gridSettings.tiles;
        var index = this.getArrayPositionFromNumber(tile);
        if (index >= 0) {
            if (list[index]) {
                return list[index].id;
            }
            else {
                return null;
            }
        }
        return null;
    };
    TileSprite.prototype.getArrayPositionFromNumber = function (tile) {
        return tile === this.config.gridSettings.minimumValue
            ? 0
            : this.getArrayPositionFromNumber(tile / 2) + 1;
    };
    return TileSprite;
}());
exports.default = TileSprite;
