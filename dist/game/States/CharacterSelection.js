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
var TileModel_1 = require("./../Models/TileModel");
var Config_1 = require("./../Config/Config");
var CharacterSelection = (function (_super) {
    __extends(CharacterSelection, _super);
    function CharacterSelection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CharacterSelection.prototype.preload = function () {
        var singleton = Config_1.Singleton.get();
        this.config = singleton.config;
        this.tools = singleton.tools;
        this.gameboardConfig = new GameboardConfig_1.default();
        this.inputManager = new InputManager_1.default(this.config);
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
        this.preloadBar = this.tools.sprite.makeCentered(300, 'preloadBar', 2);
        this.load.setPreloadSprite(this.preloadBar);
    };
    CharacterSelection.prototype.create = function () {
        this.preloadBar.destroy();
        this.updated = false;
        var yMenuPad = 5;
        var row = 0;
        var column = 0;
        var arraySize = this.gameboardConfig.arraySize + 1;
        var maxColumns = 6;
        var ratio = arraySize / maxColumns;
        var characters;
        var displayArray = [];
        this.spriteArray = [];
        this.menuItems = [];
        characters = JSON.parse(JSON.stringify(this.gameboardConfig.tiles));
        displayArray = characters.filter(function (x) { return x.playable; });
        this.selectedSprite = null;
        this.selectedFullName = null;
        this.selectedName = null;
        this.selectedPower = null;
        this.selectedSummary = null;
        this.tools.graphic.addBackground();
        displayArray.push(new TileModel_1.default('random', 'Random', 'Select a random character', '', 'sound.wav', 0, null, null, 'Decision paralysis? Just click the button and start playing, you fool!'));
        var _loop_1 = function (char) {
            var sprite = this_1.tools.sprite.makeMenuTile(column, row, char.id, yMenuPad, ratio);
            sprite.tint = Phaser.Color.GRAY;
            this_1.spriteArray.push(sprite);
            sprite.inputEnabled = true;
            sprite.events.onInputDown.add(function () {
                this.setSelectedCharacter(sprite, char);
            }.bind(this_1));
            column++;
            if (column === maxColumns) {
                row++;
                var finalRowIncomplete = displayArray.length < (row + 1) * column;
                if (finalRowIncomplete) {
                    var finalRowCount = (row + 1) * column - displayArray.length;
                    if ((maxColumns - finalRowCount) % 2 === 0) {
                        column = (maxColumns - finalRowCount) / 2 - 1;
                    }
                    else {
                        column = 0;
                    }
                }
                else {
                    column = 0;
                }
            }
        };
        var this_1 = this;
        for (var _i = 0, displayArray_1 = displayArray; _i < displayArray_1.length; _i++) {
            var char = displayArray_1[_i];
            _loop_1(char);
        }
        this.yMenuPad = yMenuPad;
        this.ratio = ratio;
        this.displayArray = displayArray;
        var select = this.tools.text.makeXBounded(480, 'Select your character', 50, 'center', Config_1.ColorSettings.PRIMARY);
        var rnd = this.tools.misc.randomBetween(0, displayArray.length - 2);
        this.setSelectedCharacter(this.spriteArray[rnd], displayArray[rnd]);
        this.tools.button.make(675, 965, ['start-1', 'start-2', 'start-3'], function () {
            this.gameStart();
        }.bind(this), 1.5);
        this.selectedSprite = this.tools.sprite.createSprite(590, 580, this.selectedCharacter.id, 2);
        this.tools.text.make(20, 860, "Special Power:", 35);
    };
    CharacterSelection.prototype.gameStart = function () {
        var _this = this;
        if (this.selectedCharacter.id === 'random') {
            this.selectedCharacter = this.displayArray[this.tools.misc.randomBetween(0, this.displayArray.length - 1)];
        }
        this.gameboardConfig.mainTile = this.gameboardConfig.tiles.find(function (tile) {
            return tile.id === this.selectedCharacter.id;
        }.bind(this));
        this.tools.audio.playCharacterSound(this.gameboardConfig.tiles.find(function (x) { return x.id === _this.selectedCharacter.id; }));
        this.state.start('GameboardLoader', true, false, this.gameboardConfig);
    };
    CharacterSelection.prototype.setSelectedCharacter = function (sprite, char) {
        this.tools.audio.playSound('beep');
        this.spriteArray.forEach(function (x) { return (x.tint = Phaser.Color.GRAY); });
        sprite.tint = Phaser.Color.WHITE;
        this.selectedCharacter = char;
        if (this.selectedSprite) {
            this.selectedSprite.loadTexture(char.id);
        }
        if (!this.selectedName) {
            this.selectedName = this.tools.text.make(18, 700, char.name, 50);
        }
        else {
            this.selectedName.setText(char.name);
        }
        if (!this.selectedFullName) {
            this.selectedFullName = this.tools.text.makeXBoundedOptions(740, char.fullName, 35, 'left', 600, 20, -10);
        }
        else {
            this.selectedFullName.setText(char.fullName);
        }
        if (!this.selectedPower) {
            this.selectedPower = this.tools.text.make(20, 900, "" + (char.power ? char.power.name : '?????'), 40);
        }
        else {
            this.selectedPower.setText("" + (char.power ? char.power.name : '?????'));
        }
        if (!this.selectedSummary) {
            this.selectedSummary = this.tools.text.makeXBounded(1040, char.summary, 35, 'left', Config_1.ColorSettings.ALT_TEXT);
        }
        else {
            this.selectedSummary.setText(char.summary);
        }
    };
    CharacterSelection.prototype.update = function () {
        if (this.inputManager.checkKeys() === Phaser.Keyboard.ENTER) {
            this.gameStart();
        }
    };
    return CharacterSelection;
}(Phaser.State));
exports.default = CharacterSelection;
