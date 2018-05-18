"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Singleton = (function () {
    function Singleton() {
    }
    Singleton.getInstance = function () {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
            Singleton.instance._config = new Config();
            Singleton.instance._game = null;
        }
        return Singleton.instance;
    };
    Object.defineProperty(Singleton.prototype, "config", {
        get: function () {
            return this._config;
        },
        set: function (config) {
            this._config = config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Singleton.prototype, "game", {
        get: function () {
            return this._game;
        },
        set: function (config) {
            this._game = config;
        },
        enumerable: true,
        configurable: true
    });
    return Singleton;
}());
exports.Singleton = Singleton;
var Config = (function () {
    function Config() {
    }
    return Config;
}());
exports.Config = Config;
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
