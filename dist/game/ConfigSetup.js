"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = require("./Models/Config");
var ConfigSetup = (function () {
    function ConfigSetup() {
        this.config = new Config_1.Config();
        this.resolutionSetup();
        this.gridSettings();
        this.colorConfig();
    }
    ConfigSetup.prototype.resolutionSetup = function () {
        var scaleFactor;
        var safeZone;
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
        this.config.safeZone = new Config_1.SafeZone(safeWidth, safeHeight, paddingX, paddingY);
        this.config.scaleFactor = scaleFactor;
    };
    ConfigSetup.prototype.gridSettings = function () {
        var config = this.config;
        var scaleFactor = config.scaleFactor;
        var gridSettings;
        gridSettings = new Config_1.GridSettings();
        gridSettings.tileSize = 230;
        gridSettings.realTileSize = 180;
        gridSettings.frameLineWidth = 30;
        gridSettings.lineColor = config.colorSettings.primary;
        gridSettings.activeLineColor = config.colorSettings.selected;
        gridSettings.gridPaddingX = 20 * scaleFactor;
        gridSettings.gridPaddingY = 200 * scaleFactor;
        gridSettings.tileScale =
            gridSettings.tileSize / (gridSettings.realTileSize + 10);
        gridSettings.font = 'Verdana,Geneva,sans-serif';
        config.gridSettings = gridSettings;
    };
    ConfigSetup.prototype.colorConfig = function () {
        var color = new Config_1.ColorSettings();
        color.background = '#2f3136';
        color.primary = '#99AAB5';
        color.selected = '#000000';
        color.text = '#FFFFFF';
        color.altText = '#99AAB5';
        this.config.colorSettings = color;
    };
    return ConfigSetup;
}());
exports.default = ConfigSetup;
