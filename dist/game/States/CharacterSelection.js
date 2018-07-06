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
var GameboardConfig_1 = require("./../Config/GameboardConfig");
var InputManager_1 = require("./../InputManager");
var CharacterMenu_1 = require("./../Objects/CharacterMenu/CharacterMenu");
var Config_1 = require("./../Config/Config");
var CharacterSelection = (function (_super) {
    __extends(CharacterSelection, _super);
    function CharacterSelection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CharacterSelection.prototype.init = function (playTrack) {
        if (playTrack === void 0) { playTrack = false; }
        this.playTrack = playTrack;
    };
    CharacterSelection.prototype.preload = function () {
        var singleton = Config_1.Singleton.get();
        var config = singleton.config;
        this.tools = singleton.tools;
        if (this.playTrack) {
            this.tools.audio.play('title-bgm', true);
        }
        this.gameboardConfig = new GameboardConfig_1.default();
        this.inputManager = new InputManager_1.default(config);
        for (var _i = 0, _a = this.gameboardConfig.tiles; _i < _a.length; _i++) {
            var sprite = _a[_i];
            var path = "assets/images/" + sprite.imagePath;
            var specialPath = "assets/images/" + sprite.specialImagePath;
            var sfx = "assets/sfx/" + sprite.sfxRoute;
            this.load.image(sprite.id, path);
            this.load.image(sprite.specialId, specialPath);
            this.load.audio(sprite.sfxLabel, [sfx]);
        }
        this.load.image('random', 'assets/images/tiles/random.png');
        this.preloadBar = this.tools.sprite.makeCentered(600, 'preloadBar', 2);
        this.load.setPreloadSprite(this.preloadBar);
    };
    CharacterSelection.prototype.create = function () {
        this.preloadBar.destroy();
        this.tools.graphic.addBackground();
        this.characterMenu = new CharacterMenu_1.default(this.gameboardConfig);
        this.tools.button.make(675, 1290, ['start-1', 'start-2', 'start-3'], function () {
            this.gameStart();
        }.bind(this), 1.8);
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
        this.tools.misc.transitionToState(this.gameboardConfig, 'Story', this.gameboardConfig);
    };
    CharacterSelection.prototype.returnToMainMenu = function () {
        this.tools.misc.transitionToState(this.gameboardConfig, 'Boot');
    };
    return CharacterSelection;
}(Phaser.State));
exports.default = CharacterSelection;
