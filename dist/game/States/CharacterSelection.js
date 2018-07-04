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
    CharacterSelection.prototype.preload = function () {
        var singleton = Config_1.Singleton.get();
        var config = singleton.config;
        this.tools = singleton.tools;
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
        this.tools.button.make(675, 1250, ['start-1', 'start-2', 'start-3'], function () {
            this.gameStart();
        }.bind(this), 1.8);
    };
    CharacterSelection.prototype.update = function () {
        if (this.inputManager.checkKeys() === Phaser.Keyboard.ENTER) {
            this.gameStart();
        }
    };
    CharacterSelection.prototype.gameStart = function () {
        var selected;
        if (this.characterMenu.selectedCharacter.id === 'random') {
            selected = this.gameboardConfig.tiles[this.tools.misc.randomBetween(0, this.gameboardConfig.tiles.length - 1)];
        }
        else {
            selected = this.characterMenu.selectedCharacter;
        }
        this.gameboardConfig.mainTile = this.gameboardConfig.tiles.find(function (tile) {
            return tile.id === selected.id;
        }.bind(this));
        this.tools.audio.playCharacterSound(this.gameboardConfig.tiles.find(function (x) { return x.id === selected.id; }));
        this.state.start('Story', true, false, this.gameboardConfig);
    };
    return CharacterSelection;
}(Phaser.State));
exports.default = CharacterSelection;
