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
var GameboardConfig_1 = require("./../Config/GameboardConfig");
var CharacterSelectionLoader_1 = require("./../Loaders/CharacterSelectionLoader");
var MenuList_1 = require("./../Objects/Menu/MenuList");
var MenuObject_1 = require("./../Objects/Menu/MenuObject");
var Menu_1 = require("./../Objects/Menu/Menu");
var MainMenu = (function (_super) {
    __extends(MainMenu, _super);
    function MainMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainMenu.prototype.init = function (gameboardConfig) {
        this.gameboardConfig = gameboardConfig;
    };
    MainMenu.prototype.create = function () {
        this.config = Config_1.Singleton.get().config;
        var tools = Config_1.Singleton.get().tools;
        this.cursor = new InputManager_1.default(this.config);
        this.started = false;
        tools.graphic.addBackground();
        tools.audio.playIfSilent('title-bgm', true);
        var loader = new CharacterSelectionLoader_1.default(this.gameboardConfig.tiles);
        this.gameboardConfig.playStory = true;
        var menuList = new MenuList_1.default('Menu');
        menuList.addChild(new MenuObject_1.default('Free mode', function () {
            this.gameboardConfig.playStory = false;
            this.gameboardConfig.gameMode = GameboardConfig_1.default.GAME_MODE_SINGLE_PLAYER;
            this.menu.destroy();
            tools.transition.smoothLoaderConfig('CharacterSelection', this.gameboardConfig, loader, 'Unranked');
        }.bind(this)));
        menuList.addChild(new MenuObject_1.default('Story mode', function () {
            this.gameboardConfig.gameMode = GameboardConfig_1.default.GAME_MODE_SINGLE_PLAYER;
            this.menu.destroy();
            tools.transition.smoothLoaderConfig('CharacterSelection', this.gameboardConfig, loader, 'Story');
        }.bind(this)));
        menuList.addChild(new MenuObject_1.default('Special mode', function () {
            this.gameboardConfig.playStory = false;
            this.gameboardConfig.gameMode = GameboardConfig_1.default.GAME_MODE_BOSS_FIGHT;
            this.menu.destroy();
            tools.transition.smoothLoaderConfig('CharacterSelection', this.gameboardConfig, loader, 'BossFight');
        }.bind(this)));
        menuList.addChild(new MenuObject_1.default('Project site', function () {
            window.location.href = 'https://github.com/zaragozasosa/phaseer-demo';
        }.bind(this)));
        var options = new MenuList_1.default('Options');
        options.addChild(tools.audio.makeVolumeMenuOption());
        menuList.addChild(options);
        this.menu = new Menu_1.default(menuList);
        var startText = tools.text.makeXBounded(700, 'Press any key!', 60, 'center', Config_1.ColorSettings.TEXT);
        tools.tween.blinkStart(startText);
        this.startText = startText;
        this.logoPlaceholder = tools.text.makeXBounded(100, 'Logo goes here', 80, 'center', Config_1.ColorSettings.PRIMARY);
        this.logoPlaceholder.alpha = 0.5;
        tools.tween.moveY(this.logoPlaceholder, 350, 5000, true, Phaser.Easing.Cubic.Out, { alpha: 1 });
    };
    MainMenu.prototype.update = function () {
        if (!this.started) {
            if (this.cursor.checkClick() || this.cursor.checkKeys()) {
                this.menu.show();
                this.started = true;
                this.startText.destroy();
            }
        }
        else {
            var cursor = this.cursor.checkCursor();
            if (cursor) {
                this.config.storyboard.menuInputSignal.dispatch(cursor);
            }
            var enter = this.cursor.checkEnter();
            if (enter) {
                this.config.storyboard.menuInputSignal.dispatch(Phaser.Keyboard.ENTER);
            }
            var escape_1 = this.cursor.checkEscape();
            if (escape_1) {
                this.config.storyboard.menuInputSignal.dispatch(Phaser.Keyboard.ESC);
            }
        }
    };
    return MainMenu;
}(Phaser.State));
exports.default = MainMenu;
