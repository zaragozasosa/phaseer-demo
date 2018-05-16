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
var Config_1 = require("./Config");
var Boot_1 = require("./States/Boot");
var Preloader_1 = require("./States/Preloader");
var MainMenu_1 = require("./States/MainMenu");
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = this;
        var scaleFactor;
        var safeZone;
        var tileSettings;
        var config = Config_1.Singleton.getInstance().config;
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        var paddingX = 0;
        var paddingY = 0;
        var safeWidth = 0;
        var safeHeight = 0;
        var baseWidth = 320;
        var baseHeight = 480;
        var maxPixelRatio = 3;
        var baseProportion = baseHeight / baseWidth;
        var screenPixelRatio = window.devicePixelRatio <= maxPixelRatio
            ? window.devicePixelRatio
            : maxPixelRatio;
        var screenWidth = window.innerWidth * screenPixelRatio;
        screenWidth = !isMobile && screenWidth > 1080 ? 1080 : screenWidth;
        var screenHeight = window.innerHeight * screenPixelRatio;
        screenHeight = !isMobile
            ? screenHeight / screenPixelRatio - 20
            : screenHeight > 940 ? 940 : screenHeight;
        var screenProportion = screenHeight / screenWidth;
        var widthProportion = window.innerWidth / baseWidth;
        _this = _super.call(this, screenWidth, screenHeight, Phaser.CANVAS, 'content', null, true) || this;
        if (screenProportion > baseProportion) {
            safeWidth = screenWidth;
            safeHeight = safeWidth * baseProportion;
            paddingY = (screenHeight - safeHeight) / 2;
            scaleFactor = screenPixelRatio / 3 * widthProportion;
        }
        else if (screenProportion < baseProportion) {
            safeHeight = screenHeight;
            safeWidth = safeHeight / baseProportion;
            paddingX = (screenWidth - safeWidth) / 2;
            scaleFactor = safeWidth / (baseWidth * maxPixelRatio);
        }
        safeZone = new Config_1.SafeZone(safeWidth, safeHeight, paddingX, paddingY);
        tileSettings = new Config_1.TileSettings();
        tileSettings.tileSize = 240;
        tileSettings.frameLineWidth = 4;
        tileSettings.lineColor = 0x003399;
        tileSettings.gridPaddingX = 0 * scaleFactor;
        tileSettings.gridPaddingY = 200 * scaleFactor;
        tileSettings.tileScale = 240 / 180;
        tileSettings.arraySize = 3;
        tileSettings.initialArray = [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
        ];
        tileSettings.minimumValue = 1;
        tileSettings.tiles = [
            'nacho',
            'chili',
            'mira',
            'lord_fancy',
            'choco',
            'rox',
            'kinjo',
            'shy_senpai',
            'magil',
            'jessy',
            'agent_smith',
            'lily',
            'r1r1',
            'astaroth',
            'bren',
            'joji'
        ];
        tileSettings.mainTile = tileSettings.tiles[_this.rnd.integerInRange(0, 15)];
        config.scaleFactor = scaleFactor;
        config.safeZone = safeZone;
        config.tileSettings = tileSettings;
        Config_1.Singleton.getInstance().config = config;
        Config_1.Singleton.getInstance().game = _this;
        _this.state.add('Boot', Boot_1.default, false);
        _this.state.add('Preloader', Preloader_1.default, false);
        _this.state.add('MainMenu', MainMenu_1.default, false);
        _this.state.start('Boot');
        return _this;
    }
    return Game;
}(Phaser.Game));
exports.default = Game;
new Game();
