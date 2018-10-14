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
var Base_1 = require("./../../Base");
var GridTile = (function (_super) {
    __extends(GridTile, _super);
    function GridTile(x, y, gameboardConfig, newTile, value) {
        if (newTile === void 0) { newTile = true; }
        if (value === void 0) { value = 0; }
        var _this = _super.call(this) || this;
        var tween = _this.tools.tween;
        _this.gameboardConfig = gameboardConfig;
        _this.nextTile = null;
        if (newTile) {
            _this.model = gameboardConfig.tiles[0];
        }
        else {
            _this.model = gameboardConfig.tiles.find(function (x) { return x.staticValue === value; });
        }
        _this.value = _this.model.staticValue;
        _this.posX = x;
        _this.posY = y;
        _this.frame = _this.createFrame();
        _this.sprite = _this.createSprite();
        _this.group = _this.tools.misc.addGroup();
        _this.sprite.anchor.setTo(0, 0);
        var modeScale = _this.gameboardConfig.gameModeTileScale;
        _this.number = _this.tools.text.makeTileNumber(_this.posX, _this.posY, _this.value, 50, modeScale);
        _this.group.addChild(_this.sprite);
        _this.group.addChild(_this.number);
        _this.group.addChild(_this.frame);
        _this.group.angle = 0;
        var t1 = tween.to(_this.group, { alpha: 0.3 }, 150);
        var t2 = tween.to(_this.group, { alpha: 1 }, 350);
        _this.mergeTween = t1.chain(t2);
        _this.randomizeTween = _this.tools.tween.to(_this.sprite, { angle: 360 }, 500);
        tween.appear(_this.group, 750);
        _this.sprite.inputEnabled = true;
        _this.sprite.events.onInputDown.add(function () {
            this.gameboardConfig.clickTileSignal.dispatch(this);
        }.bind(_this));
        if (newTile && _this.tools.misc.randomBetween(0, 6) === 0) {
            _this.sprite.play('hey');
        }
        return _this;
    }
    Object.defineProperty(GridTile.prototype, "isAlive", {
        get: function () {
            return this.sprite && this.sprite.alive;
        },
        enumerable: true,
        configurable: true
    });
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
    Object.defineProperty(GridTile.prototype, "getGroup", {
        get: function () {
            return this.group;
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
            for (var _i = 0, _a = this.group.getAll(); _i < _a.length; _i++) {
                var item = _a[_i];
                item.body.moves = true;
                item.body.moveTo(500, this.config.safeZone.safeWidth, direction);
            }
            body.onMoveComplete.addOnce(this.update, this);
        }
    };
    GridTile.prototype.overlaps = function (tilesGroup, wallsGroup) {
        var group = this.group;
        for (var _i = 0, _a = tilesGroup.getAll(); _i < _a.length; _i++) {
            var groupItem = _a[_i];
            this.tools.misc.overlap(this.sprite, groupItem.getBottom(), function (s, g) {
                if (s && g) {
                    if (s.key === g.key) {
                        return false;
                    }
                    else {
                        var velocity = this.sprite.body.velocity;
                        if (velocity.x || velocity.y) {
                            for (var _i = 0, _a = group.getAll(); _i < _a.length; _i++) {
                                var item = _a[_i];
                                item.body.stopMovement(true);
                            }
                            return true;
                        }
                    }
                }
            }.bind(this));
        }
        this.tools.misc.overlap(this.sprite, wallsGroup, function (a, b) {
            if (a && b) {
                var velocity = this.sprite.body.velocity;
                if (velocity.x || velocity.y) {
                    for (var _i = 0, _a = group.getAll(); _i < _a.length; _i++) {
                        var item = _a[_i];
                        item.body.stopMovement(true);
                    }
                    return true;
                }
            }
        }.bind(this));
    };
    GridTile.prototype.destroy = function (destroyChildren) {
        if (destroyChildren === void 0) { destroyChildren = false; }
        this.group.destroy(destroyChildren);
    };
    GridTile.prototype.kill = function () {
        for (var _i = 0, _a = this.group.getAll(); _i < _a.length; _i++) {
            var item = _a[_i];
            item.kill();
        }
    };
    GridTile.prototype.duplicate = function () {
        this.changeValue(this.value * 2);
    };
    GridTile.prototype.changeValue = function (newValue) {
        this.value = newValue;
        this.mergeTransform();
    };
    GridTile.prototype.randomize = function (maxVal, maxChance, minVal, minChance, meanVal, meanChance) {
        var randomChance = this.tools.misc.randomBetween(0, 99);
        if (randomChance == 0 || randomChance < maxChance) {
            this.value = maxVal;
        }
        else if (randomChance == maxChance ||
            randomChance < maxChance + minChance) {
            this.value = minVal;
        }
        else if (randomChance == maxChance + minChance ||
            randomChance < maxChance + minChance + meanChance) {
            this.value = meanVal;
        }
        else {
            var valuesBetween = this.getValuesBetween(maxVal, minVal);
            var random = this.tools.misc.randomBetween(0, valuesBetween.length - 1);
            this.value = valuesBetween[random];
        }
        this.randomizeTransform();
    };
    GridTile.prototype.startTimeStop = function () {
        this.timeStopped = true;
        this.sprite.loadTexture(this.model.negativeId, this.spriteFrame);
    };
    GridTile.prototype.stopTimeStop = function () {
        this.timeStopped = false;
        this.sprite.loadTexture(this.model.id, this.spriteFrame);
    };
    GridTile.prototype.update = function () {
        for (var _i = 0, _a = this.group.getAll(); _i < _a.length; _i++) {
            var item = _a[_i];
            item.body.moves = false;
        }
        if (this.nextTile) {
            for (var _b = 0, _c = this.group.getAll(); _b < _c.length; _b++) {
                var item = _c[_b];
                item.kill();
            }
            this.nextTile.mergeTransform();
        }
        else {
            var modeScale = this.gameboardConfig.gameModeTileScale;
            for (var _d = 0, _e = this.group.getAll(); _d < _e.length; _d++) {
                var item = _e[_d];
                if (item instanceof Phaser.Sprite) {
                    this.tools.sprite.updateTile(this.posX, this.posY, item, modeScale);
                }
                if (item instanceof Phaser.Text) {
                    this.tools.text.updateTileNumber(this.posX, this.posY, item, modeScale);
                }
            }
        }
    };
    GridTile.prototype.mergeTransform = function () {
        this.transform();
        this.mergeTween.start();
        this.sprite.play('hey');
    };
    GridTile.prototype.randomizeTransform = function () {
        this.transform();
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.position.x += this.sprite.width / 2;
        this.sprite.position.y += this.sprite.height / 2;
        this.randomizeTween.start().onComplete.add(function () {
            var scale = this.gameboardConfig.gameModeTileScale;
            this.sprite.anchor.setTo(0, 0);
            this.tools.sprite.updateTile(this.posX, this.posY, this.sprite, scale);
        }.bind(this));
    };
    GridTile.prototype.transform = function () {
        var _this = this;
        var tile = this.gameboardConfig.tiles.find(function (x) { return x.staticValue === _this.value; });
        this.model = tile;
        if (this.timeStopped) {
            this.sprite.loadTexture(tile.negativeId, this.spriteFrame);
        }
        else {
            this.sprite.loadTexture(tile.id, this.spriteFrame);
        }
        this.number.setText(this.value + '');
    };
    GridTile.prototype.createSprite = function () {
        var tile = this.model;
        var sca = this.gameboardConfig.gameModeTileScale;
        this.spriteFrame = this.tools.misc.randomBetween(0, 3);
        var sprite = this.tools.sprite.makeTile(this.posX, this.posY, tile.id, sca, this.spriteFrame);
        sprite.body.collideWorldBounds = true;
        return sprite;
    };
    GridTile.prototype.createFrame = function () {
        var modeScale = this.gameboardConfig.gameModeTileScale;
        var tile = this.model;
        var sprite = this.tools.sprite.makeFrame(this.posX, this.posY, modeScale);
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
    GridTile.prototype.getValuesBetween = function (max, min) {
        var array = [];
        max = max / 2;
        while (max > min) {
            array.push(max);
            max = max / 2;
        }
        return array;
    };
    GridTile.prototype.toString = function () {
        return this.sprite.key + "  " + this.value + " -  " + this.posX + ":" + this.posY;
    };
    return GridTile;
}(Base_1.default));
exports.default = GridTile;
