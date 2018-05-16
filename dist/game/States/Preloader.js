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
var Config_1 = require("../Config");
var Preloader = (function (_super) {
    __extends(Preloader, _super);
    function Preloader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Preloader.prototype.preload = function () {
        var singleton = Config_1.Singleton.getInstance();
        var config = singleton.config;
        this.preloadBar = this.add.sprite(0, 0, 'preloadBar');
        this.load.setPreloadSprite(this.preloadBar);
        this.game.load.spritesheet('button', 'assets/images/button-mayo.png', 480, 180);
        for (var _i = 0, _a = config.tileSettings.tiles; _i < _a.length; _i++) {
            var sprite = _a[_i];
            var path = "assets/images/" + sprite + ".png";
            var altPath = "assets/images/" + sprite + "_alt.png";
            this.load.image(sprite, path);
        }
        this.game.load.audio('bgm', ['assets/audio/Mellow-Puzzler.mp3']);
    };
    Preloader.prototype.create = function () {
        this.game.state.start('MainMenu');
    };
    return Preloader;
}(Phaser.State));
exports.default = Preloader;
