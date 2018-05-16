"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SpriteFactory_1 = require("./Tools/SpriteFactory");
var Tile = (function () {
    function Tile(x, y, value, game, config) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.game = game;
        this.config = config;
        this.spriteFactory = new SpriteFactory_1.default();
        this.createSprite();
    }
    Tile.prototype.createSprite = function () {
        var id = this.getTileSprite(this.value);
        var sprite = this.spriteFactory.makeTile(this.x, this.y, id);
        this.game.physics.enable(sprite, Phaser.Physics.ARCADE);
        sprite.body.collideWorldBounds = true;
        this.sprite = sprite;
    };
    Tile.prototype.getTileSprite = function (tile) {
        var list = this.config.tileSettings.tiles;
        while (list[0] !== this.config.tileSettings.mainTile) {
            var last = list.pop();
            list.unshift(last);
        }
        var index = this.getArrayPositionFromNumber(tile);
        if (index >= 0) {
            return this.config.tileSettings.tiles[index];
        }
        return null;
    };
    Tile.prototype.getArrayPositionFromNumber = function (tile) {
        return tile === this.config.tileSettings.minimumValue
            ? 0
            : this.getArrayPositionFromNumber(tile / 2) + 1;
    };
    return Tile;
}());
exports.default = Tile;
