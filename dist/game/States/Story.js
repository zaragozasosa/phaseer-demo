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
var TwoSpritesReader_1 = require("./../Objects/Storyboard/TwoSpritesReader");
var Story = (function (_super) {
    __extends(Story, _super);
    function Story() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Story.prototype.init = function (gameboardConfig) {
        this.gameboardConfig = gameboardConfig;
    };
    Story.prototype.create = function () {
        var config = Config_1.Singleton.get().config;
        var tools = Config_1.Singleton.get().tools;
        this.cursor = new InputManager_1.default(config);
        tools.graphic.addBackground();
        var list = this.gameboardConfig.mainTile.getFirstStory();
        this.reader = new TwoSpritesReader_1.default(list, function () {
            this.continue();
        }.bind(this));
        this.reader.start();
        var skip = tools.text.make(700, 1200, 'Skip', 50);
        skip.inputEnabled = true;
        skip.events.onInputDown.addOnce(function () {
            this.continue();
        }.bind(this));
    };
    Story.prototype.update = function () {
        if (this.cursor.checkClick()) {
            this.reader.playNextAction();
        }
        if (this.cursor.checkEnter()) {
            this.reader.playNextAction();
        }
        if (this.cursor.checkEscape()) {
            this.continue();
        }
    };
    Story.prototype.continue = function () {
        this.state.start('GameboardLoader', true, false, this.gameboardConfig);
    };
    return Story;
}(Phaser.State));
exports.default = Story;
