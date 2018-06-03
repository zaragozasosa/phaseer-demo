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
var InputManager_1 = require("./../InputManager");
var Config_1 = require("./../Config/Config");
var MainMenu = (function (_super) {
    __extends(MainMenu, _super);
    function MainMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainMenu.prototype.create = function () {
        var config = Config_1.Singleton.get().config;
        var tools = Config_1.Singleton.get().tools;
        this.cursor = new InputManager_1.default(config);
        tools.graphic.addBackground();
        tools.audio.play('bgm', true);
        tools.text.makeXBounded(600, 'Click to start', 70, 'center', Config_1.ColorSettings.TEXT);
    };
    MainMenu.prototype.update = function () {
        if (this.game.input.activePointer.isDown) {
            this.game.state.start('CharacterSelection');
        }
        if (this.cursor.checkKeys()) {
            this.game.state.start('CharacterSelection');
        }
    };
    return MainMenu;
}(Phaser.State));
exports.default = MainMenu;
