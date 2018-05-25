"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = require("./../Models/Config");
var SpriteFactory_1 = require("./../Tools/SpriteFactory");
var GridTile = (function () {
    function GridTile(x, y, gameboardConfig, position, value) {
        if (position === void 0) { position = 0; }
        if (value === void 0) { value = 0; }
        var singleton = Config_1.Singleton.getInstance();
        this.game = singleton.game;
        this.config = singleton.config;
        this.gameboardConfig = gameboardConfig;
        this.willBeDestroyed = false;
        this.willBeMerged = false;
        if (value === 0) {
            this.model = gameboardConfig.tiles[position];
        }
        else {
            this.model = gameboardConfig.tiles.find(function (x) { return x.staticValue === value; });
        }
        this.value = this.model.staticValue;
        this.posX = x;
        this.posY = y;
        this.spriteFactory = new SpriteFactory_1.default();
        this.sprite = this.createSprite();
    }
    GridTile.prototype.createSprite = function () {
        var tile = this.model;
        var sprite = this.spriteFactory.makeTile(this.posX, this.posY, tile.id);
        this.game.physics.enable(sprite, Phaser.Physics.ARCADE);
        sprite.body.collideWorldBounds = true;
        return sprite;
    };
    GridTile.prototype.updateSprite = function () {
        var model = this.model;
        var sprite = this.spriteFactory.updateTile(this.posX, this.posY, this.sprite);
        this.sprite = sprite;
    };
    return GridTile;
}());
exports.default = GridTile;
