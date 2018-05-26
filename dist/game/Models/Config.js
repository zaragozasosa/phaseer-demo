"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SpriteFactory_1 = require("./../Tools/SpriteFactory");
var ButtonFactory_1 = require("./../Tools/ButtonFactory");
var TextFactory_1 = require("./../Tools/TextFactory");
var GraphicsFactory_1 = require("./../Tools/GraphicsFactory");
var Singleton = (function () {
    function Singleton() {
    }
    Singleton.get = function () {
        if (!Singleton.instance) {
            var setup = new ConfigSetup();
            Singleton.instance = new Singleton();
            Singleton.instance._tools = new Tools();
            Singleton.instance._config = setup.config;
        }
        return Singleton.instance;
    };
    Object.defineProperty(Singleton.prototype, "config", {
        get: function () {
            return this._config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Singleton.prototype, "tools", {
        get: function () {
            return this._tools;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Singleton.prototype, "game", {
        get: function () {
            return this._game;
        },
        set: function (game) {
            this._game = game;
        },
        enumerable: true,
        configurable: true
    });
    return Singleton;
}());
exports.Singleton = Singleton;
var GameInstance = (function () {
    function GameInstance() {
    }
    GameInstance.set = function (game) {
        if (!GameInstance.instance && game) {
            GameInstance.instance = new GameInstance();
            GameInstance.instance._game = game;
            return GameInstance.instance;
        }
    };
    GameInstance.get = function () {
        if (GameInstance.instance) {
            return GameInstance.instance;
        }
        return null;
    };
    Object.defineProperty(GameInstance.prototype, "game", {
        get: function () {
            return this._game;
        },
        enumerable: true,
        configurable: true
    });
    return GameInstance;
}());
exports.GameInstance = GameInstance;
var Config = (function () {
    function Config() {
    }
    return Config;
}());
exports.Config = Config;
var ColorSettings = (function () {
    function ColorSettings() {
    }
    return ColorSettings;
}());
exports.ColorSettings = ColorSettings;
var SafeZone = (function () {
    function SafeZone(safeWidth, safeHeight, paddingX, paddingY) {
        this.safeWidth = safeWidth;
        this.safeHeight = safeHeight;
        this.paddingX = paddingX;
        this.paddingY = paddingY;
    }
    return SafeZone;
}());
exports.SafeZone = SafeZone;
var GridSettings = (function () {
    function GridSettings() {
    }
    return GridSettings;
}());
exports.GridSettings = GridSettings;
var Tools = (function () {
    function Tools() {
        this._text = new TextFactory_1.default();
        this._graphics = new GraphicsFactory_1.default();
        this._sprite = new SpriteFactory_1.default();
        this._button = new ButtonFactory_1.default();
    }
    Object.defineProperty(Tools.prototype, "text", {
        get: function () {
            return this._text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tools.prototype, "graphics", {
        get: function () {
            return this._graphics;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tools.prototype, "button", {
        get: function () {
            return this._button;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tools.prototype, "sprite", {
        get: function () {
            return this._sprite;
        },
        enumerable: true,
        configurable: true
    });
    return Tools;
}());
exports.Tools = Tools;
var ConfigSetup = (function () {
    function ConfigSetup() {
        this.config = new Config();
        this.resolutionSetup();
        this.colorConfig();
        this.gridSettings();
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
        this.config.screenHeight = screenHeight;
        this.config.screenWidth = screenWidth;
        this.config.safeZone = new SafeZone(safeWidth, safeHeight, paddingX, paddingY);
        this.config.scaleFactor = scaleFactor;
    };
    ConfigSetup.prototype.gridSettings = function () {
        var config = this.config;
        var scaleFactor = config.scaleFactor;
        var gridSettings;
        gridSettings = new GridSettings();
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
        var color = new ColorSettings();
        color.background = '#2f3136';
        color.primary = '#99AAB5';
        color.selected = '#000000';
        color.text = '#FFFFFF';
        color.altText = '#99AAB5';
        this.config.colorSettings = color;
    };
    return ConfigSetup;
}());
