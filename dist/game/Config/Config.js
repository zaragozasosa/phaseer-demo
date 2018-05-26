"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SpriteFactory_1 = require("./../Tools/SpriteFactory");
var ButtonFactory_1 = require("./../Tools/ButtonFactory");
var TextFactory_1 = require("./../Tools/TextFactory");
var GraphicsFactory_1 = require("./../Tools/GraphicsFactory");
var Singleton = (function () {
    function Singleton() {
    }
    Singleton.initialize = function (config, game) {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
            Singleton.instance._tools = new Tools(config);
            Singleton.instance._config = config;
            Singleton.instance._game = game;
        }
    };
    Singleton.get = function () {
        if (Singleton.instance) {
            return Singleton.instance;
        }
        return null;
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
    GameInstance.initialize = function (game) {
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
    function Tools(config) {
        this._text = new TextFactory_1.default(config);
        this._graphics = new GraphicsFactory_1.default(config);
        this._sprite = new SpriteFactory_1.default(config);
        this._button = new ButtonFactory_1.default(config);
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