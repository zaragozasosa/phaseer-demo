"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = require("./Config");
var ConfigSetup = (function () {
    function ConfigSetup() {
        this.config = new Config_1.Config();
        this.resolutionSetup();
        this.colorConfig();
        this.grid();
        this.windowConfig();
    }
    ConfigSetup.prototype.resolutionSetup = function () {
        var scaleFactor;
        var safeZone;
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        var paddingX = 0;
        var paddingY = 0;
        var bgPaddingX = 0;
        var bgPaddingY = 0;
        var bgWidth = 0;
        var bgHeight = 0;
        var safeWidth = 0;
        var safeHeight = 0;
        var baseWidth = 320;
        var baseHeight = 480;
        var maxPixelRatio = 3;
        var desktopPadding = !isMobile ? 0 : 0;
        var baseProportion = baseHeight / baseWidth;
        var screenPixelRatio = window.devicePixelRatio <= maxPixelRatio
            ? window.devicePixelRatio
            : maxPixelRatio;
        screenPixelRatio = !isMobile ? 1 : screenPixelRatio;
        var screenWidth = window.innerWidth * screenPixelRatio;
        screenWidth = !isMobile ? screenWidth / screenPixelRatio : screenWidth;
        var screenHeight = window.innerHeight * screenPixelRatio;
        screenHeight = !isMobile ? screenHeight / screenPixelRatio : screenHeight;
        var screenProportion = screenHeight / screenWidth;
        var widthProportion = window.innerWidth / baseWidth;
        bgHeight = screenHeight;
        bgWidth = screenWidth;
        if (screenProportion > baseProportion) {
            safeWidth = screenWidth;
            safeHeight = safeWidth * baseProportion;
            paddingY = (screenHeight - safeHeight) / 2;
            scaleFactor = screenPixelRatio / 3 * widthProportion;
        }
        else if (screenProportion < baseProportion) {
            safeHeight = screenHeight - desktopPadding * 2;
            safeWidth = safeHeight / baseProportion;
            bgWidth = safeWidth;
            paddingX = (screenWidth - safeWidth) / 2;
            scaleFactor = safeWidth / (baseWidth * maxPixelRatio);
        }
        if (!isMobile) {
            bgPaddingX = paddingX;
            bgWidth = safeHeight / baseProportion;
        }
        paddingY += desktopPadding;
        this.config.safeZone = new Config_1.SafeZone(safeWidth, safeHeight, paddingX, paddingY, bgPaddingX, bgPaddingY, bgWidth, bgHeight);
        this.config.scaleFactor = scaleFactor;
        this.config.screenWidth = screenWidth;
        this.config.screenHeight = screenHeight;
    };
    ConfigSetup.prototype.grid = function () {
        var config = this.config;
        var scaleFactor = config.scaleFactor;
        var grid;
        grid = new Config_1.GridSettings();
        grid.tileSize = 230;
        grid.physicalTileSize = 180;
        grid.frameLineWidth = 30;
        grid.lineColor = config.color.primary;
        grid.activeLineColor = config.color.selected;
        grid.gridPaddingX = 25 * scaleFactor;
        grid.gridPaddingY = 250 * scaleFactor;
        grid.tileScale = grid.tileSize / (grid.physicalTileSize + 10);
        grid.font = 'Verdana,Geneva,sans-serif';
        grid.tileNumberPadX = 20;
        grid.tileNumberPadY = 15;
        config.grid = grid;
        config.sound = new Config_1.SoundSettings();
        config.sound.bgmVolume = 1;
        config.sound.sfxVolume = 1;
        config.sound.volumeLevels = [1, 0.5, 0];
        config.sound.actualVolumeIndex = 0;
        config.sound.volumeSprite = 'volume';
    };
    ConfigSetup.prototype.colorConfig = function () {
        var color = new Config_1.ColorSettings();
        color.background = '#1C1C1C';
        color.primary = '#B1851E';
        color.selected = '#837B97';
        color.text = '#EEF2FC';
        color.altText = '#7E7E7E';
        this.config.color = color;
    };
    ConfigSetup.prototype.windowConfig = function () {
        this.config.window = new Config_1.WindowSettings();
        var window = this.config.window;
        window.defaultLineWidth = 15;
        window.defaultWidth =
            this.config.safeZone.safeWidth -
                4 * window.defaultLineWidth * this.config.scaleFactor;
        window.defaultHeight = this.config.safeZone.safeHeight * (1 / 2);
        window.defaultX = window.defaultLineWidth * 2 * this.config.scaleFactor;
        window.defaultY = this.config.safeZone.safeHeight * (1 / 4);
        window.centerHeight = this.config.safeZone.safeHeight * (1 / 3);
        window.centerY = this.config.safeZone.safeHeight * (1 / 3);
    };
    return ConfigSetup;
}());
exports.default = ConfigSetup;
