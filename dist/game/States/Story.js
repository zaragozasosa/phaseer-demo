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
    Story.prototype.init = function (gameboardConfig, isFirstStory) {
        if (isFirstStory === void 0) { isFirstStory = true; }
        this.gameboardConfig = gameboardConfig;
        this.isFirstStory = isFirstStory;
    };
    Story.prototype.create = function () {
        var config = Config_1.Singleton.get().config;
        var tools = Config_1.Singleton.get().tools;
        this.tools = tools;
        this.cursor = new InputManager_1.default(config);
        tools.graphic.addBackground();
        var list = this.isFirstStory
            ? this.gameboardConfig.mainTile.getFirstStory()
            : this.gameboardConfig.mainTile.getSecondStory();
        this.reader = new TwoSpritesReader_1.default(list, function () {
            this.continue();
        }.bind(this));
        this.reader.start();
        var skip = tools.text.makeStroked(680, 1250, 'Skip', 90);
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
        if (this.isFirstStory) {
            this.tools.misc.hardTransition(this.gameboardConfig, 'GameboardLoader', this.tools.audio, this.gameboardConfig);
        }
        else {
            this.tools.audio.stopBgm();
            this.tools.misc.hardTransition(this.gameboardConfig, 'Boot', this.tools.audio);
        }
    };
    return Story;
}(Phaser.State));
exports.default = Story;
