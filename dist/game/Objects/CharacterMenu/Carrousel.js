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
        _this.showCharacters();
        return _this;
    }
    Carrousel.prototype.showCharacters = function () {
        this.updateVisibleArray();
        this.setSelectedCharacter(this.spriteArray[2], this.visibleArray[2]);
    };
    Carrousel.prototype.updateVisibleArray = function () {
        this.visibleArray = this.array.slice(0, 5);
        this.spriteArray = [];
        var column = 0;
        var _loop_1 = function (char) {
            var sprite = this_1.tools.sprite.makeMenuTile(column, 0, char.id, 150, 4 / 6);
            sprite.tint = Phaser.Color.GRAY;
            this_1.spriteArray.push(sprite);
            sprite.inputEnabled = true;
            sprite.events.onInputDown.add(function () {
                this.setSelectedCharacter(sprite, char);
            }.bind(this_1));
        };
        var this_1 = this;
        for (var _i = 0, _a = this.visibleArray; _i < _a.length; _i++) {
            var char = _a[_i];
            _loop_1(char);
        }
    };
    Carrousel.prototype.setSelectedCharacter = function (sprite, char) {
        if (char.id === this.visibleArray[0].id || char.id === this.visibleArray[0].id) {
            this.moveLeft();
        }
        else if (char.id === this.visibleArray[4].id || char.id === this.visibleArray[5].id) {
            this.moveRight();
        }
        this.callback(char);
    };
    Carrousel.prototype.moveLeft = function () {
        this.array.push(this.array.shift());
        this.array.push(this.array.shift());
        this.visibleArray = this.array.slice(0, 5);
    };
    Carrousel.prototype.moveRight = function () {
        this.array.unshift(this.array.pop());
        this.array.unshift(this.array.pop());
        this.visibleArray = this.array.slice(0, 5);
    };
    return Carrousel;
}(Base_1.default));
exports.default = Carrousel;
