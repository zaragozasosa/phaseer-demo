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
var TileModel_1 = require("./../../Models/TileModel");
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
    CharacterMenu.prototype.create = function () {
        this.initializeUI();
        this.displayArray = this.gameboardConfig.tiles.filter(function (x) { return x.playable; });
        this.displayArray.push(new TileModel_1.default('random', 'Random', 'Select a random character', 'nacho', '', 0, null, null, null, null, 'Decision paralysis? Just click the button and start playing, you fool!'));
        this.carrousel = new Carrousel_1.default(this.displayArray, function (sprite, character) {
            this.setSelectedCharacter(sprite, character);
        }.bind(this));
    };
    CharacterMenu.prototype.setSelectedCharacter = function (sprite, char) {
        this.tools.audio.playBeep();
        var leftOrRight = this.tools.misc.randomBetween(0, 1);
        if (leftOrRight) {
            this.rightSprite.loadTexture(char.id);
            this.rightSprite.tint = Phaser.Color.WHITE;
            this.leftSprite.loadTexture(char.id === 'nacho' ? 'random' : char.friendId);
            this.leftSprite.tint = Phaser.Color.GRAY;
        }
        else {
            this.leftSprite.loadTexture(char.id);
            this.leftSprite.tint = Phaser.Color.WHITE;
            this.rightSprite.loadTexture(char.id === 'nacho' ? 'random' : char.friendId);
            this.rightSprite.tint = Phaser.Color.GRAY;
        }
        this.selectedCharacter = char;
        this.selectedName.setText(char.name);
        this.selectedFullName.setText(char.fullName);
        this.selectedPower.setText("" + (char.power ? char.power.name : '?????'));
        this.selectedSummary.setText(char.summary);
    };
    CharacterMenu.prototype.initializeUI = function () {
        this.tools.text.makeXBounded(210, 'Select your character', 50, 'center', Config_1.ColorSettings.TEXT, true);
        this.selectedName = this.tools.text.make(18, 700, '', 50);
        this.selectedFullName = this.tools.text.make(18, 765, '', 35);
        this.tools.text.make(20, 820, "Special:", 40);
        this.selectedPower = this.tools.text.makeStroked(205, 813, '', 45, Config_1.ColorSettings.PRIMARY);
        this.selectedSummary = this.tools.text.makeXBounded(900, '', 35, 'left', Config_1.ColorSettings.ALT_TEXT);
        this.rightSprite = this.tools.sprite.createSprite(530, 320, null, 2);
        this.leftSprite = this.tools.sprite.createSprite(30, 320, null, 2);
    };
    return CharacterMenu;
}(Base_1.default));
exports.default = CharacterMenu;
