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
var GameboardUI_1 = require("./../GameboardUI");
var GameOverWindow_1 = require("./../../Windows/GameOverWindow");
var PowerWindow_1 = require("./../../Windows/PowerWindow");
var BossGameUI = (function (_super) {
    __extends(BossGameUI, _super);
    function BossGameUI(gameboardConfig) {
        var _this = _super.call(this, gameboardConfig) || this;
        var bossId = 'mira-boss';
        _this.gameboardConfig.arraySize = _this.gameboardConfig.bossArraySize;
        _this.boss = _this.gameboardConfig.fullList.filter(function (x) { return x.id === bossId; })[0];
        return _this;
    }
    BossGameUI.prototype.drawBackground = function () {
        this.tools.graphic.addBackground();
        return this.tools.sprite.createBackground(this.boss.power.backgroundId);
    };
    BossGameUI.prototype.create = function (timer, pauseCallback) {
        this.addHeader();
        this.addMenuButton(pauseCallback);
    };
    BossGameUI.prototype.update = function (grid) {
        this.points = grid.alternativeScore;
        this.updateHeader();
    };
    BossGameUI.prototype.addHeader = function () {
        this.bossPortrait = this.tools.sprite.createFromSpriteSheet(20, 0, this.boss.spriteId, 0, 1.4);
        this.header = this.tools.text.make(300, 40, '', 45);
        this.tools.tween.appear(this.header);
        this.tools.tween.appear(this.bossPortrait);
        this.updateHeader();
    };
    BossGameUI.prototype.updateHeader = function () {
        this.header.setText("Boss score: " + this.points);
    };
    BossGameUI.prototype.gameOverScreen = function (gameState) {
        gameState.userControl = false;
        debugger;
        this.tools.audio.playCharacterSound(this.boss);
        new PowerWindow_1.default(this.boss);
        setTimeout(function () {
            var _this = this;
            gameState.userControl = true;
            new GameOverWindow_1.default(this.gameboardConfig.mainTile, function () { return _this.tools.transition.restartState(_this.gameboardConfig); }, function () {
                return _this.tools.transition.toLoaderConfig('MainMenu', _this.gameboardConfig);
            });
        }.bind(this), 2000);
    };
    return BossGameUI;
}(GameboardUI_1.default));
exports.default = BossGameUI;
