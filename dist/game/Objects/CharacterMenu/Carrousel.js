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
var Carrousel = (function (_super) {
    __extends(Carrousel, _super);
    function Carrousel(array, callback) {
        var _this = _super.call(this) || this;
        array.unshift(array.pop());
        array.unshift(array.pop());
        _this.array = array;
        _this.callback = callback;
        _this.spriteArray = [];
        _this.spritesGroup = _this.tools.misc.addGroup();
        _this.showCharacters();
        _this.distance = _this.config.grid.tileSize * 8 / 6 * _this.config.scaleFactor;
        _this.isAnimating = false;
        return _this;
    }
    Object.defineProperty(Carrousel.prototype, "isBusy", {
        get: function () {
            return this.isAnimating;
        },
        enumerable: true,
        configurable: true
    });
    Carrousel.prototype.nextCharacter = function (actual) {
        var index = this.visibleArray.findIndex(function (x) { return x.id === actual.id; });
        this.setSelectedCharacter(this.visibleArray[index + 1]);
    };
    Carrousel.prototype.previousCharacter = function (actual) {
        var index = this.visibleArray.findIndex(function (x) { return x.id === actual.id; });
        this.setSelectedCharacter(this.visibleArray[index - 1]);
    };
    Carrousel.prototype.showCharacters = function () {
        this.updateVisibleArray();
        this.setSelectedCharacter(this.visibleArray[4]);
    };
    Carrousel.prototype.updateVisibleArray = function () {
        this.visibleArray = this.array.slice(0, 10);
        var column = 0;
        this.spritesGroup.removeAll();
        this.spritesGroup = this.tools.misc.addGroup();
        this.spritesGroup.enableBody = true;
        this.spriteArray.forEach(function (s) { return s.destroy(); });
        this.spriteArray = [];
        var _loop_1 = function (char) {
            var sprite = void 0;
            sprite = this_1.tools.sprite.makeMenuTile(column - 2, 0, char.id, 20, 35, 4 / 6);
            this_1.spriteArray.push(sprite);
            sprite.inputEnabled = true;
            this_1.spritesGroup.add(sprite);
            sprite.tint = Phaser.Color.GRAY;
            sprite.events.destroy();
            sprite.events.onInputDown.add(function () {
                this.setSelectedCharacter(char);
            }.bind(this_1));
            column++;
        };
        var this_1 = this;
        for (var _i = 0, _a = this.visibleArray; _i < _a.length; _i++) {
            var char = _a[_i];
            _loop_1(char);
        }
        this.spriteArray[0].alpha = 0;
        this.spriteArray[1].alpha = 0;
        this.spriteArray[8].alpha = 0;
        this.spriteArray[9].alpha = 0;
        this.addBlinking();
    };
    Carrousel.prototype.setSelectedCharacter = function (char) {
        var changePage = false;
        if (char.id === this.visibleArray[2].id ||
            char.id === this.visibleArray[3].id) {
            this.moveRight();
            changePage = true;
        }
        else if (char.id === this.visibleArray[6].id ||
            char.id === this.visibleArray[7].id) {
            this.moveLeft();
            changePage = true;
        }
        this.spriteArray[4].tint = Phaser.Color.WHITE;
        this.spriteArray[5].tint = Phaser.Color.WHITE;
        this.callback(char, changePage);
    };
    Carrousel.prototype.addBlinking = function () {
        this.spriteArray[4].tint = Phaser.Color.WHITE;
        this.spriteArray[5].tint = Phaser.Color.WHITE;
        this.leftBlink = this.tools.misc.tweenLoop(this.spriteArray[4], { alpha: 0.4 }, { alpha: 1 }, 1000, 1000);
        this.rightBlink = this.tools.misc.tweenLoop(this.spriteArray[5], { alpha: 0.4 }, { alpha: 1 }, 1000, 1000);
        this.rightBlink.start();
        this.leftBlink.start();
    };
    Carrousel.prototype.moveLeft = function () {
        this.rightBlink.stop();
        this.leftBlink.stop();
        this.isAnimating = true;
        this.spritesGroup.forEach(function (sprite) {
            sprite.body.moveTo(200, this.distance, Phaser.ANGLE_LEFT);
        }.bind(this));
        debugger;
        this.tools.misc.tweenTo(this.spriteArray[8], { alpha: 1 }, 50, true, 100);
        this.tools.misc.tweenTo(this.spriteArray[9], { alpha: 1 }, 100, true, 200);
        this.tools.misc.tweenTo(this.spriteArray[2], { alpha: 0 }, 25, true);
        this.tools.misc.tweenTo(this.spriteArray[3], { alpha: 0 }, 100, true);
        this.tools.misc.runLater(200, function () {
            this.isAnimating = false;
            this.array.push(this.array.shift());
            this.array.push(this.array.shift());
            this.updateVisibleArray();
        }.bind(this));
    };
    Carrousel.prototype.moveRight = function () {
        this.tools.misc.removeTween(this.rightBlink);
        this.tools.misc.removeTween(this.leftBlink);
        this.isAnimating = true;
        this.spritesGroup.forEach(function (sprite) {
            sprite.body.moveTo(200, this.distance, Phaser.ANGLE_RIGHT);
        }.bind(this));
        this.tools.misc.tweenTo(this.spriteArray[1], { alpha: 1 }, 50, true, 100);
        this.tools.misc.tweenTo(this.spriteArray[0], { alpha: 1 }, 100, true, 200);
        this.tools.misc.tweenTo(this.spriteArray[6], { alpha: 0 }, 100, true);
        this.tools.misc.tweenTo(this.spriteArray[7], { alpha: 0 }, 25, true);
        this.tools.misc.runLater(200, function () {
            this.isAnimating = false;
            this.array.unshift(this.array.pop());
            this.array.unshift(this.array.pop());
            this.updateVisibleArray();
        }.bind(this));
    };
    return Carrousel;
}(Base_1.default));
exports.default = Carrousel;
