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
var SpriteFactory_1 = require("./../Tools/SpriteFactory");
var TextFactory_1 = require("./../Tools/TextFactory");
var AudioFactory_1 = require("./../Tools/AudioFactory");
var InputManager_1 = require("./../InputManager");
var Config_1 = require("./../Config/Config");
var MainMenu = (function (_super) {
    __extends(MainMenu, _super);
    function MainMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainMenu.prototype.create = function () {
        var config = Config_1.Singleton.get().config;
        this.spriteFactory = new SpriteFactory_1.default(config);
        this.textFactory = new TextFactory_1.default(config);
        this.cursor = new InputManager_1.default(config);
        this.audioFactory = new AudioFactory_1.default(config);
        this.audioFactory.play('bgm');
        this.textFactory.makeXBounded(600, 'Click to start', 70, 'center', true);
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
