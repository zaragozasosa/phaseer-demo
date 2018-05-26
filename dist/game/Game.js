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
var Config_1 = require("./Config/Config");
var ConfigSetup_1 = require("./Config/ConfigSetup");
var Boot_1 = require("./States/Boot");
var Preloader_1 = require("./States/Preloader");
var MainMenu_1 = require("./States/MainMenu");
var Unranked_1 = require("./States/Unranked");
var CharacterSelection_1 = require("./States/CharacterSelection");
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = this;
        var setup = new ConfigSetup_1.default();
        var height = setup.config.screenHeight;
        var width = setup.config.screenWidth;
        _this = _super.call(this, width, height, Phaser.CANVAS, 'content', null, true) || this;
        Config_1.GameInstance.initialize(_this);
        Config_1.Singleton.initialize(setup.config, _this);
        _this.bootGame();
        return _this;
    }
    Game.prototype.bootGame = function () {
        this.state.add('Boot', Boot_1.default, false);
        this.state.add('Preloader', Preloader_1.default, false);
        this.state.add('MainMenu', MainMenu_1.default, false);
        this.state.add('CharacterSelection', CharacterSelection_1.default, false);
        this.state.add('Unranked', Unranked_1.default, false);
        this.state.start('Boot');
    };
    return Game;
}(Phaser.Game));
exports.default = Game;
new Game();
