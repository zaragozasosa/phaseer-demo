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
var Base_1 = require("./../../Base");
var GameOverWindow_1 = require("./../Windows/GameOverWindow");
var WinWindow_1 = require("./../Windows/WinWindow");
var PauseWindow_1 = require("./../Windows/PauseWindow");
var Config_1 = require("./../../Config/Config");
var GameboardUI = (function (_super) {
    __extends(GameboardUI, _super);
    function GameboardUI(gameboardConfig) {
        var _this = _super.call(this) || this;
        _this.gameboardConfig = gameboardConfig;
        return _this;
    }
    GameboardUI.prototype.create = function (timer, pauseCallback) {
        this.points = 0;
        this.timer = timer;
        this.addHeader();
        this.addMenuButton(pauseCallback);
        this.addTimer();
    };
    GameboardUI.prototype.changeTimerColor = function (color) {
        if (this.timerMessage) {
            this.timerMessage.tint = color;
        }
    };
    GameboardUI.prototype.showMessage = function (message, size, color, delay) {
        if (color === void 0) { color = Config_1.ColorSettings.TEXT; }
        if (delay === void 0) { delay = 1500; }
        var text = this.tools.text.makeXBounded(650, message, size, 'center', color, true);
        this.tools.tween.vanishAndDestroy(text, { alpha: 0 }, delay, 'Linear', delay);
    };
    GameboardUI.prototype.pause = function (callbackFunction) {
        this.pausedWindow = new PauseWindow_1.default(this.gameboardConfig.mainTile, function () { return callbackFunction(); }, function () {
            this.tools.transition.toLoaderConfig('MainMenu', this.gameboardConfig);
        }.bind(this));
    };
    GameboardUI.prototype.unpause = function () {
        this.pausedWindow.hideAndDestroy();
    };
    GameboardUI.prototype.winScreen = function (nextState) {
        var _this = this;
        new WinWindow_1.default(this.gameboardConfig.mainTile, function () {
            return _this.tools.transition.toLoaderConfig(nextState, _this.gameboardConfig, null, false);
        });
    };
    GameboardUI.prototype.gameOverScreen = function () {
        var _this = this;
        new GameOverWindow_1.default(this.gameboardConfig.mainTile, function () { return _this.tools.transition.restartState(_this.gameboardConfig); }, function () {
            return _this.tools.transition.toLoaderConfig('MainMenu', _this.gameboardConfig);
        });
    };
    GameboardUI.prototype.addMenuButton = function (callbackFunction) {
        var menu = this.tools.sprite.createSprite(840, 30, 'menu', 0.8);
        menu.inputEnabled = true;
        menu.events.onInputDown.add(function () { return callbackFunction(); });
        this.tools.tween.appear(menu);
    };
    GameboardUI.prototype.addHeader = function () {
        this.header = this.tools.text.make(20, 20, '', 50);
        this.tools.tween.appear(this.header);
        this.updateHeader();
    };
    GameboardUI.prototype.updateHeader = function () {
        this.header.setText("Score: " + this.points);
    };
    GameboardUI.prototype.addTimer = function () {
        this.timerMessage = this.tools.text.make(20, 80, 'Time: 00:00', 50);
        this.tools.tween.appear(this.timerMessage).onComplete.addOnce(function () {
            this.timer.start();
        }.bind(this));
    };
    GameboardUI.prototype.updateTimer = function () {
        if (this.timer) {
            var min = Math.floor(this.timer.seconds / 60);
            var sec = Math.floor(this.timer.seconds - min * 60);
            this.timerMessage.setText("Time: " + this.num(min) + ":" + this.num(sec));
        }
    };
    GameboardUI.prototype.num = function (n) {
        return n > 9 ? '' + n : '0' + n;
    };
    return GameboardUI;
}(Base_1.default));
exports.default = GameboardUI;
