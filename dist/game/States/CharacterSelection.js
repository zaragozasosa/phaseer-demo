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
var GameboardConfig_1 = require("./../Objects/GameboardConfig");
var SpriteFactory_1 = require("./../Tools/SpriteFactory");
var GraphicsFactory_1 = require("./../Tools/GraphicsFactory");
var InputManager_1 = require("./../Tools/InputManager");
var Tile_1 = require("./../Objects/Tile");
var TextFactory_1 = require("./../Tools/TextFactory");
var Config_1 = require("./../Config");
var ButtonFactory_1 = require("./../Tools/ButtonFactory");
var CharacterSelection = (function (_super) {
    __extends(CharacterSelection, _super);
    function CharacterSelection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CharacterSelection.prototype.preload = function () {
        var singleton = Config_1.Singleton.getInstance();
        this.game = singleton.game;
        this.config = singleton.config;
        this.gameboardConfig = new GameboardConfig_1.default();
        this.spriteFactory = new SpriteFactory_1.default();
        this.textFactory = new TextFactory_1.default();
        this.graphicsFactory = new GraphicsFactory_1.default();
        this.buttonFactory = new ButtonFactory_1.default();
        this.inputManager = new InputManager_1.default();
        for (var _i = 0, _a = this.gameboardConfig.tiles; _i < _a.length; _i++) {
            var sprite = _a[_i];
            var path = "assets/images/tiles/" + sprite.id + ".png";
            var sfx = "assets/sfx/" + sprite.id + "-" + sprite.sfxId;
            this.load.image(sprite.id, path);
            this.load.audio(sprite.id + "-sfx", [sfx]);
        }
        this.load.image('random', 'assets/images/tiles/random.png');
        this.load.audio("random-sfx", 'assets/sfx/random-sound.wav');
        this.preloadBar = this.spriteFactory.makeCentered(300, 'preloadBar', 2);
        this.load.setPreloadSprite(this.preloadBar);
    };
    CharacterSelection.prototype.create = function () {
        this.preloadBar.destroy();
        this.updated = false;
        var yMenuPad = 20;
        var row = 0;
        var column = 0;
        var arraySize = this.gameboardConfig.arraySize + 1;
        var maxColumns = 6;
        var ratio = arraySize / maxColumns;
        var characters;
        var displayArray = [];
        this.menuItems = [];
        characters = JSON.parse(JSON.stringify(this.gameboardConfig.tiles));
        displayArray = characters.filter(function (x) { return x.playable; });
        this.graphicsFactory.addBackground();
        displayArray.push(new Tile_1.default('random', 'Random', 'Select a random character', '', 'sound.wav', '', '?????', 'Decision paralysis? Just click the button and start playing, you fool!'));
        var _loop_1 = function (char) {
            var sprite = this_1.spriteFactory.makeMenuTile(column, row, char.id, yMenuPad, ratio);
            var frame = this_1.spriteFactory.makeMenuTile(column, row, 'frame', yMenuPad, ratio);
            sprite.inputEnabled = true;
            sprite.events.onInputDown.add(function () {
                this.setSelectedCharacter(char);
            }.bind(this_1));
            char.frame = frame;
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
        var rnd = this.game.rnd.between(0, displayArray.length - 2);
        this.setSelectedCharacter(displayArray[rnd]);
        this.buttonFactory.make(635, 935, ['start-1', 'start-2', 'start-3'], function () {
            this.gameStart();
        }.bind(this));
        this.selectedSprite = this.spriteFactory.createSprite(590, 550, this.selectedCharacter.id, 2);
    };
    CharacterSelection.prototype.gameStart = function () {
        if (this.selectedCharacter.id === 'random') {
            this.selectedCharacter = this.displayArray[this.game.rnd.between(0, this.displayArray.length - 1)];
        }
        this.gameboardConfig.mainTile = this.selectedCharacter;
        this.game.sound.play(this.selectedCharacter.id + "-sfx", 1);
        this.state.start('Unranked', true, false, this.gameboardConfig);
    };
    CharacterSelection.prototype.setSelectedCharacter = function (char) {
        this.game.sound.play('beep', 1.5);
        this.selectedCharacter = char;
        if (this.selectedSprite) {
            this.selectedSprite.loadTexture(char.id);
        }
        if (this.selectedFrame) {
            this.selectedFrame.tint = Phaser.Color.WHITE;
        }
        char.frame.tint = Phaser.Color.BLACK;
        this.selectedFrame = char.frame;
        if (!this.selectedName) {
            this.selectedName = this.textFactory.make(18, 700, char.name, 50);
        }
        else {
            this.selectedName.setText(char.name);
        }
        if (!this.selectedFullName) {
            this.selectedFullName = this.textFactory.makeXBoundedOptions(740, char.fullName, 35, 'left', 600, 20, -10);
        }
        else {
            this.selectedFullName.setText(char.fullName);
        }
        if (!this.selectedPower) {
            this.selectedPower = this.textFactory.make(20, 875, "Special Power: " + char.powerName, 30);
        }
        else {
            this.selectedPower.setText("Special Power: " + char.powerName);
        }
        if (!this.selectedSummary) {
            this.selectedSummary = this.textFactory.makeXBounded(1040, char.summary, 30, 'left', true);
        }
        else {
            this.selectedSummary.setText(char.summary);
        }
    };
    CharacterSelection.prototype.update = function () {
        if (this.inputManager.checkKeys()) {
            this.gameStart();
        }
    };
    return CharacterSelection;
}(Phaser.State));
exports.default = CharacterSelection;
