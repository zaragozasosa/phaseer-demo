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
var Config_1 = require("./../../Config/Config");
var Carrousel = (function (_super) {
    __extends(Carrousel, _super);
    function Carrousel(array, callback) {
        var _this = _super.call(this) || this;
        array.unshift(array.pop());
        array.unshift(array.pop());
        _this.array = array;
        _this.callback = callback;
        _this.spriteArray = [];
        _this.showCharacters();
        var leftSign = _this.tools.text.makeStroked(30, 90, '<', 80, Config_1.ColorSettings.ALT_TEXT);
        leftSign.alpha = 0.5;
        var rightSign = _this.tools.text.makeStroked(850, 90, '>', 80, Config_1.ColorSettings.ALT_TEXT);
        rightSign.alpha = 0.5;
        return _this;
    }
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
        this.setSelectedCharacter(this.visibleArray[2]);
    };
    Carrousel.prototype.updateVisibleArray = function () {
        this.visibleArray = this.array.slice(0, 6);
        var column = 0;
        var _loop_1 = function (char) {
            var sprite = void 0;
            if (this_1.spriteArray.length >= 6) {
                this_1.spriteArray[column].loadTexture(char.id);
                sprite = this_1.spriteArray[column];
            }
            else {
                sprite = this_1.tools.sprite.makeMenuTile(column, 0, char.id, 35, 4 / 6);
                this_1.spriteArray.push(sprite);
                sprite.inputEnabled = true;
            }
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
    };
    Carrousel.prototype.setSelectedCharacter = function (char) {
        if (char.id === this.visibleArray[0].id ||
            char.id === this.visibleArray[1].id) {
            this.moveRight();
        }
        else if (char.id === this.visibleArray[4].id ||
            char.id === this.visibleArray[5].id) {
            this.moveLeft();
        }
        this.spriteArray[2].tint = Phaser.Color.WHITE;
        this.spriteArray[3].tint = Phaser.Color.WHITE;
        this.callback(char);
    };
    Carrousel.prototype.moveLeft = function () {
        this.array.push(this.array.shift());
        this.array.push(this.array.shift());
        this.updateVisibleArray();
    };
    Carrousel.prototype.moveRight = function () {
        this.array.unshift(this.array.pop());
        this.array.unshift(this.array.pop());
        this.updateVisibleArray();
    };
    return Carrousel;
}(Base_1.default));
exports.default = Carrousel;
