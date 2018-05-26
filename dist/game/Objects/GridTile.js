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
var Base_1 = require("./../Base");
var GridTile = (function (_super) {
    __extends(GridTile, _super);
    function GridTile(x, y, gameboardConfig, position, value) {
        if (position === void 0) { position = 0; }
        if (value === void 0) { value = 0; }
        var _this = _super.call(this) || this;
        _this.gameboardConfig = gameboardConfig;
        _this.nextTile = null;
        if (value === 0) {
            _this.model = gameboardConfig.tiles[position];
        }
        else {
            _this.model = gameboardConfig.tiles.find(function (x) { return x.staticValue === value; });
        }
        _this.value = _this.model.staticValue;
        _this.posX = x;
        _this.posY = y;
        _this.sprite = _this.createSprite();
        _this.sprite.alpha = 0;
        _this.game.add.tween(_this.sprite).to({ alpha: 1 }, 500, 'Linear', true);
        var tween1 = _this.game.add
            .tween(_this.sprite)
            .to({ alpha: 0.3 }, 100, 'Linear');
        var tween2 = _this.game.add
            .tween(_this.sprite)
            .to({ alpha: 1 }, 300, 'Linear');
        _this.mergeTween = tween1.chain(tween2);
        return _this;
    }
    Object.defineProperty(GridTile.prototype, "isMoving", {
        get: function () {
            if (!this.sprite) {
                return false;
            }
            var velocity = this.sprite.body.velocity;
            return velocity.x || velocity.y;
        },
        enumerable: true,
        configurable: true
    });
    GridTile.prototype.animate = function (keyboardInput) {
        var direction = this.getDirection(keyboardInput);
        var body = this.sprite.body;
        var config = this.config;
        if (direction !== null) {
            var distance = config.safeZone.safeWidth * config.scaleFactor;
            body.moves = true;
            body.moveTo(500, this.config.safeZone.safeWidth, direction);
            body.onMoveComplete.addOnce(this.updateTile, this);
        }
    };
    GridTile.prototype.overlaps = function (tilesGroup, wallsGroup) {
        this.game.physics.arcade.overlap(this.sprite, tilesGroup, function (a, b) {
            if (a && b) {
                if (a.key === b.key) {
                    console.log('collision, merging');
                    return false;
                }
                else {
                    var velocity = this.sprite.body.velocity;
                    if (velocity.x || velocity.y) {
                        console.log('collision in sprites x sprite');
                        this.sprite.body.stopMovement(true);
                        return true;
                    }
                }
            }
        }.bind(this));
        this.game.physics.arcade.overlap(this.sprite, wallsGroup, function (a, b) {
            if (a && b) {
                var velocity = this.sprite.body.velocity;
                if (velocity.x || velocity.y) {
                    console.log('collision in sprites x wall');
                    this.sprite.body.stopMovement(true);
                    return true;
                }
            }
        }.bind(this));
    };
    GridTile.prototype.updateTile = function () {
        this.sprite.body.moves = false;
        if (this.nextTile) {
            this.sprite.kill();
            this.nextTile.merge();
        }
        else {
            this.tools.sprite.updateTile(this.posX, this.posY, this.sprite);
        }
    };
    GridTile.prototype.merge = function () {
        var _this = this;
        var tile = this.gameboardConfig.tiles.find(function (x) { return x.staticValue === _this.value; });
        this.model = tile;
        this.sprite.loadTexture(tile.id);
        this.mergeTween.start();
    };
    GridTile.prototype.createSprite = function () {
        var tile = this.model;
        var sprite = this.tools.sprite.makeTile(this.posX, this.posY, tile.id);
        this.game.physics.enable(sprite, Phaser.Physics.ARCADE);
        sprite.body.collideWorldBounds = true;
        return sprite;
    };
    GridTile.prototype.getDirection = function (keyboardInput) {
        return keyboardInput === Phaser.Keyboard.UP
            ? Phaser.ANGLE_UP
            : keyboardInput === Phaser.Keyboard.DOWN
                ? Phaser.ANGLE_DOWN
                : keyboardInput === Phaser.Keyboard.RIGHT
                    ? Phaser.ANGLE_RIGHT
                    : keyboardInput === Phaser.Keyboard.LEFT ? Phaser.ANGLE_LEFT : null;
    };
    GridTile.prototype.toString = function () {
        return this.sprite.key + "  " + this.value + " -  " + this.posX + ":" + this.posY;
    };
    return GridTile;
}(Base_1.default));
exports.default = GridTile;
