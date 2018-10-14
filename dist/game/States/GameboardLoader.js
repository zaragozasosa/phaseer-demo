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
    GameboardLoader.prototype.create = function () {
        var singleton = Config_1.Singleton.get();
        this.tools = singleton.tools;
        this.cursor = new InputManager_1.default(Config_1.Singleton.get().config);
        if (this.gameboardConfig.gameMode === GameboardConfig_1.default.GAME_MODE_SINGLE_PLAYER) {
            this.tools.audio.play('game-bgm', true);
        }
        else {
            this.tools.audio.play('boss-bgm', true);
        }
        var window = new InfoWindow_1.default(this.gameboardConfig.mainTile);
        window.show();
        var press = this.tools.text.makeXBounded(850, 'Press any key to continue.', 50, 'center', Config_1.ColorSettings.PRIMARY);
        this.tools.tween.blinkStart(press);
    };
    GameboardLoader.prototype.update = function () {
        if (this.cursor.checkClick() || this.cursor.checkKeys()) {
            if (this.gameboardConfig.gameMode ===
                GameboardConfig_1.default.GAME_MODE_SINGLE_PLAYER) {
                this.tools.transition.changeState('Unranked', this.gameboardConfig);
            }
            else {
                this.tools.transition.changeState('BossFight', this.gameboardConfig);
            }
        }
    };
    return GameboardLoader;
}(Phaser.State));
exports.default = GameboardLoader;
