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
var InputManager_1 = require("./../InputManager");
var CharacterMenu_1 = require("./../Objects/CharacterMenu/CharacterMenu");
var Config_1 = require("./../Config/Config");
var CharacterSelection = (function (_super) {
    __extends(CharacterSelection, _super);
    function CharacterSelection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CharacterSelection.prototype.init = function (gameboardConfig, playTrack) {
        if (playTrack === void 0) { playTrack = false; }
        this.playTrack = playTrack;
        this.gameboardConfig = gameboardConfig;
    };
    CharacterSelection.prototype.preload = function () {
        var singleton = Config_1.Singleton.get();
        var config = singleton.config;
        this.tools = singleton.tools;
        if (this.playTrack) {
            this.tools.audio.play('title-bgm', true);
        }
        this.inputManager = new InputManager_1.default(config);
    };
    CharacterSelection.prototype.create = function () {
        this.tools.graphic.addBackground();
        this.characterMenu = new CharacterMenu_1.default(this.gameboardConfig);
        this.tools.button.make(630, 1275, ['start'], function () {
            this.gameStart();
        }.bind(this), 1.2);
        var returnToMainMenu = this.tools.text.makeStroked(30, 1290, 'Return', 50);
        returnToMainMenu.inputEnabled = true;
        returnToMainMenu.events.onInputDown.addOnce(this.returnToMainMenu, this);
    };
    CharacterSelection.prototype.update = function () {
        if (this.inputManager.checkEnter()) {
            this.gameStart();
        }
        if (this.inputManager.checkEscape()) {
            this.returnToMainMenu();
        }
        this.characterMenu.update(this.inputManager.checkCursor());
    };
    CharacterSelection.prototype.gameStart = function () {
        var selected = this.gameboardConfig.getTileModel(this.characterMenu.selectedId);
        this.gameboardConfig.mainTile = selected;
        this.tools.audio.playCharacterSound(selected);
        this.tools.transition.toLoaderConfig('Story', this.gameboardConfig);
    };
    CharacterSelection.prototype.returnToMainMenu = function () {
        this.tools.transition.smoothLoaderConfig('MainMenu', this.gameboardConfig, null);
    };
    return CharacterSelection;
}(Phaser.State));
exports.default = CharacterSelection;
