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
var Config_1 = require("./../Config/Config");
var GameboardConfig_1 = require("./../Config/GameboardConfig");
var MainMenuLoader_1 = require("./../Loaders/MainMenuLoader");
var Preloader = (function (_super) {
    __extends(Preloader, _super);
    function Preloader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Preloader.prototype.preload = function () {
        var singleton = Config_1.Singleton.get();
        var tools = singleton.tools;
        this.tools = tools;
        tools.graphic.addBackground();
        this.gameboardConfig = new GameboardConfig_1.default();
        this.preloadBar = tools.sprite.makeCentered(600, 'preloadBar', 2);
        this.load.setPreloadSprite(this.preloadBar);
        for (var _i = 0, _a = this.gameboardConfig.tiles; _i < _a.length; _i++) {
            var sprite = _a[_i];
            var path = "assets/images/" + sprite.imagePath;
            var specialPath = "assets/images/" + sprite.specialImagePath;
            this.load.image(sprite.id, path);
            this.load.image(sprite.specialId, specialPath);
        }
    };
    Preloader.prototype.create = function () {
        this.tools.transition.toLoaderConfig('MainMenu', this.gameboardConfig, new MainMenuLoader_1.default());
    };
    return Preloader;
}(Phaser.State));
exports.default = Preloader;
