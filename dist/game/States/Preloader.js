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
var SpriteFactory_1 = require("./../Tools/SpriteFactory");
var Preloader = (function (_super) {
    __extends(Preloader, _super);
    function Preloader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Preloader.prototype.preload = function () {
        var singleton = Config_1.Singleton.getInstance();
        var config = singleton.config;
        var spriteFactory = new SpriteFactory_1.default();
        this.preloadBar = spriteFactory.makeCentered(300, 'preloadBar', 2);
        this.load.setPreloadSprite(this.preloadBar);
        for (var _i = 0, _a = config.gridSettings.tiles; _i < _a.length; _i++) {
            var sprite = _a[_i];
            var path = "assets/images/tiles/" + sprite.id + ".png";
            var sfx = "assets/sfx/" + sprite.id + "-" + sprite.sfxId;
            this.load.image(sprite.id, path);
            this.load.audio(sprite.id + "-sfx", [sfx]);
        }
        this.load.image('title', 'assets/images/concept.png');
        this.game.load.audio('bgm', ['assets/audio/Puzzle-Action-2.mp3']);
    };
    Preloader.prototype.create = function () {
        this.game.state.start('MainMenu');
    };
    return Preloader;
}(Phaser.State));
exports.default = Preloader;
