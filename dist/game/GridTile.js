"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = require("./Config");
var SpriteFactory_1 = require("./Tools/SpriteFactory");
var GridTile = (function () {
    function GridTile(x, y, value, gameboardConfig) {
        var singleton = Config_1.Singleton.getInstance();
        this.game = singleton.game;
        this.config = singleton.config;
        this.gameboardConfig = gameboardConfig;
        this.x = x;
        this.y = y;
        this.value = value;
        this.spriteFactory = new SpriteFactory_1.default();
        this.createSprite();
    }
    GridTile.prototype.createSprite = function () {
        var id = this.getTileSprite(this.value);
        var sprite = this.spriteFactory.makeTile(this.x, this.y, id);
        this.sfxId = id + '-sfx';
        this.game.physics.enable(sprite, Phaser.Physics.ARCADE);
        sprite.body.collideWorldBounds = true;
        this.sprite = sprite;
    };
    GridTile.prototype.getTileSprite = function (tile) {
        var list = this.gameboardConfig.tiles;
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
    GridTile.prototype.getArrayPositionFromNumber = function (tile) {
        return tile === this.gameboardConfig.minimumValue
            ? 0
            : this.getArrayPositionFromNumber(tile / 2) + 1;
    };
    return GridTile;
}());
exports.default = GridTile;
