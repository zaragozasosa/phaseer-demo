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
var Preloader = (function (_super) {
    __extends(Preloader, _super);
    function Preloader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Preloader.prototype.preload = function () {
        var singleton = Config_1.Singleton.get();
        var tools = singleton.tools;
        this.preloadBar = tools.sprite.makeCentered(300, 'preloadBar', 2);
        this.load.setPreloadSprite(this.preloadBar);
        this.load.image('title', 'assets/images/concept.png');
        this.game.load.audio('bgm', ['assets/audio/Puzzle-Action-2.mp3']);
        this.load.audio('beep', 'assets/sfx/beep.wav');
        this.load.image('start-1', 'assets/images/start-1.png');
        this.load.image('start-2', 'assets/images/start-2.png');
        this.load.image('start-3', 'assets/images/start-3.png');
        this.load.image('frame', 'assets/images/frame.png');
    };
    Preloader.prototype.create = function () {
        this.game.state.start('MainMenu');
    };
    return Preloader;
}(Phaser.State));
exports.default = Preloader;
