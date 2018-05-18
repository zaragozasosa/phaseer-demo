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
var InputManager_1 = require("./../Tools/InputManager");
var MainMenu = (function (_super) {
    __extends(MainMenu, _super);
    function MainMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainMenu.prototype.create = function () {
        this.spriteFactory = new SpriteFactory_1.default();
        this.textFactory = new TextFactory_1.default();
        this.cursor = new InputManager_1.default();
        var music = this.game.add.audio('bgm');
        music.play('', 0, 0.5, true);
        this.spriteFactory.makeCentered(100, 'title', 0.8);
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
