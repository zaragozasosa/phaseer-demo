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
var InfoWindow_1 = require("./../Objects/Windows/InfoWindow");
var InputManager_1 = require("./../InputManager");
var GameboardLoader = (function (_super) {
    __extends(GameboardLoader, _super);
    function GameboardLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameboardLoader.prototype.init = function (gameboardConfig) {
        this.gameboardConfig = gameboardConfig;
    };
    GameboardLoader.prototype.preload = function () {
        var singleton = Config_1.Singleton.get();
        this.tools = singleton.tools;
        var window = new InfoWindow_1.default(this.gameboardConfig.mainTile);
        window.show();
        this.preloadBar = this.tools.sprite.makeCentered(1000, 'preloadBar', 2);
        this.game.load.audio('game-bgm', ['assets/audio/number-crunching.mp3']);
        this.load.setPreloadSprite(this.preloadBar);
        this.load.image('bullet', 'assets/images/bullet.png');
        this.load.image('dice', 'assets/images/dice.png');
        this.load.image('diamond', 'assets/images/diamond.png');
        this.load.image('volume-0', 'assets/images/volume-0.png');
        this.load.image('volume-1', 'assets/images/volume-1.png');
        this.load.image('volume-2', 'assets/images/volume-2.png');
        this.load.spritesheet('power', 'assets/images/power.png', 249, 93);
        this.load.image('witch', 'assets/images/witch.jpeg');
        this.load.image('menu', 'assets/images/menu.png');
        this.load.image('blue', 'assets/images/blue.png');
        this.load.image('bug', 'assets/images/bug.png');
        this.cursor = new InputManager_1.default(Config_1.Singleton.get().config);
    };
    GameboardLoader.prototype.create = function () {
        this.preloadBar.kill();
        this.tools.audio.stopBgm();
    };
    GameboardLoader.prototype.update = function () {
        if (this.cursor.checkClick() || this.cursor.checkKeys()) {
            this.tools.audio.play('game-bgm', true);
            this.state.start('Unranked', true, false, this.gameboardConfig);
        }
    };
    return GameboardLoader;
}(Phaser.State));
exports.default = GameboardLoader;
