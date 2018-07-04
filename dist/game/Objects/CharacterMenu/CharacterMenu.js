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
var Carrousel_1 = require("./Carrousel");
var Base_1 = require("./../../Base");
var Config_1 = require("./../../Config/Config");
var CharacterMenu = (function (_super) {
    __extends(CharacterMenu, _super);
    function CharacterMenu(config) {
        var _this = _super.call(this) || this;
        _this.gameboardConfig = config;
        _this.create();
        return _this;
    }
    Object.defineProperty(CharacterMenu.prototype, "selectedId", {
        get: function () {
            return this.selectedCharacter.id;
        },
        enumerable: true,
        configurable: true
    });
    CharacterMenu.prototype.update = function (cursor) {
        if (cursor === Phaser.Keyboard.RIGHT) {
            this.carrousel.nextCharacter(this.selectedCharacter);
        }
        else if (cursor === Phaser.Keyboard.LEFT) {
            this.carrousel.previousCharacter(this.selectedCharacter);
        }
    };
    CharacterMenu.prototype.create = function () {
        this.initializeUI();
        this.displayArray = this.gameboardConfig.menuTiles;
        this.carrousel = new Carrousel_1.default(this.displayArray, function (character) {
            this.setSelectedCharacter(character);
        }.bind(this));
    };
    CharacterMenu.prototype.setSelectedCharacter = function (char) {
        this.tools.audio.playBeep();
        var spritePosition = this.findSpritePosition(char);
        if (spritePosition === Phaser.RIGHT) {
            this.rightSprite.events.destroy();
            this.rightSprite.loadTexture(char.id);
            this.rightSprite.tint = Phaser.Color.WHITE;
            this.leftSprite.loadTexture(char.getMenuFriendId);
            this.leftSprite.events.onInputDown.addOnce(function () {
                this.setSelectedCharacter(this.gameboardConfig.getTileModel(char.getMenuFriendId));
            }.bind(this));
            this.leftSprite.tint = Phaser.Color.GRAY;
        }
        else {
            this.leftSprite.events.destroy();
            this.leftSprite.loadTexture(char.id);
            this.leftSprite.tint = Phaser.Color.WHITE;
            this.rightSprite.loadTexture(char.getMenuFriendId);
            this.rightSprite.tint = Phaser.Color.GRAY;
            this.rightSprite.events.onInputDown.addOnce(function () {
                this.setSelectedCharacter(this.gameboardConfig.getTileModel(char.getMenuFriendId));
            }.bind(this));
        }
        this.selectedCharacter = char;
        this.selectedName.setText(char.name);
        this.selectedFullName.setText(char.fullName);
        this.selectedPower.setText("" + (char.power ? char.power.name : '?????'));
        this.selectedSummary.setText(char.summary);
    };
    CharacterMenu.prototype.findSpritePosition = function (char) {
        var i = this.gameboardConfig.tiles.findIndex(function (tile) { return tile.id === char.id; });
        return i % 2 ? Phaser.RIGHT : Phaser.LEFT;
    };
    CharacterMenu.prototype.initializeUI = function () {
        this.tools.text.makeXBounded(225, 'Select your character', 50, 'center', Config_1.ColorSettings.TEXT, true);
        this.selectedName = this.tools.text.make(18, 730, '', 50);
        this.selectedFullName = this.tools.text.make(18, 795, '', 35);
        this.tools.text.make(20, 850, "Special:", 40);
        this.selectedPower = this.tools.text.makeStroked(205, 843, '', 45, Config_1.ColorSettings.PRIMARY);
        this.selectedSummary = this.tools.text.makeXBounded(930, '', 35, 'left', Config_1.ColorSettings.ALT_TEXT);
        this.rightSprite = this.tools.sprite.createSprite(530, 350, null, 2);
        this.rightSprite.inputEnabled = true;
        this.leftSprite = this.tools.sprite.createSprite(30, 350, null, 2);
        this.leftSprite.inputEnabled = true;
    };
    return CharacterMenu;
}(Base_1.default));
exports.default = CharacterMenu;
