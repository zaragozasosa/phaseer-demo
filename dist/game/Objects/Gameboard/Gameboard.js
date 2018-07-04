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
var GridFactory_1 = require("./GridFactory");
var GameboardConfig_1 = require("./../../Config/GameboardConfig");
var InputManager_1 = require("./../../InputManager");
var PowerWindow_1 = require("./../Windows/PowerWindow");
var GameOverWindow_1 = require("./../Windows/GameOverWindow");
var WinWindow_1 = require("./../Windows/WinWindow");
var PauseWindow_1 = require("./../Windows/PauseWindow");
var Config_1 = require("./../../Config/Config");
var Gameboard = (function (_super) {
    __extends(Gameboard, _super);
    function Gameboard(gameboardConfig) {
        var _this = _super.call(this) || this;
        _this.gameboardConfig = gameboardConfig;
        _this.tools.graphic.addBackground();
        _this.background = _this.tools.sprite.createBackground();
        var win = _this.tools.text.makeXBounded(1350, 'Click to win', 30, 'right');
        win.inputEnabled = true;
        win.events.onInputDown.addOnce(function () {
            this.gameover(true);
        }.bind(_this));
        var lose = _this.tools.text.makeXBounded(150, 'Click to lose ', 30, 'right');
        lose.inputEnabled = true;
        lose.events.onInputDown.addOnce(function () {
            this.gameover(false);
        }.bind(_this));
        _this.gameOver = false;
        _this.wonGame = false;
        var updateScoreSignal = new Phaser.Signal();
        updateScoreSignal.add(function (addToMovement) {
            this.updateScore(addToMovement);
        }.bind(_this));
        var toggleButtonSignal = new Phaser.Signal();
        toggleButtonSignal.add(function (status) {
            this.toggleButton(status);
        }.bind(_this));
        var gameoverSignal = new Phaser.Signal();
        gameoverSignal.add(function (win) {
            this.gameover(win);
        }.bind(_this));
        _this.gameboardConfig.toggleButtonSignal = toggleButtonSignal;
        _this.gameboardConfig.updateScoreSignal = updateScoreSignal;
        _this.gameboardConfig.gameOverSignal = gameoverSignal;
        _this.gameboardConfig.clickTileSignal = new Phaser.Signal();
        _this.gameboardConfig.mergeTileSignal = new Phaser.Signal();
        _this.gameboardConfig.updateAmmoSignal = new Phaser.Signal();
        _this.gameboardConfig.chargeSignal = new Phaser.Signal();
        _this.gameboardConfig.cooldownSignal = new Phaser.Signal();
        _this.gameboardConfig.turnsSignal = new Phaser.Signal();
        _this.config.storyboard.optionClickSignal = new Phaser.Signal();
        _this.grid = GridFactory_1.default.create(gameboardConfig);
        _this.isPaused = false;
        _this.movements = 0;
        _this.points = _this.grid.calculatePoints();
        _this.addHeader();
        _this.addMenuButton();
        _this.addPowerButton();
        _this.addTimer();
        _this.input = new InputManager_1.default(_this.config);
        _this.showOnce = true;
        return _this;
    }
    Gameboard.prototype.update = function () {
        var cursor;
        if (!this.gameOver) {
            this.updateTimer();
            if (this.input.checkEscape()) {
                this.pausetoggle();
                return;
            }
            else if (!this.isPaused) {
                cursor = this.input.checkCursor();
                this.grid.update(cursor);
                return;
            }
        }
        var enter = this.input.checkEnter();
        if (this.wonGame) {
            if (enter || this.input.checkClick()) {
                if (this.config.storyboard.windowActionSignal) {
                    this.config.storyboard.windowActionSignal.dispatch();
                }
            }
            return;
        }
        cursor = this.input.checkCursor();
        if (cursor) {
            this.config.storyboard.menuInputSignal.dispatch(cursor);
        }
        else if (enter) {
            this.config.storyboard.menuInputSignal.dispatch(Phaser.Keyboard.ENTER);
        }
    };
    Gameboard.prototype.activatePower = function () {
        if (this.gameOver) {
            return;
        }
        this.actionButton.kill();
        this.grid.activatePower();
        var window = new PowerWindow_1.default(this.gameboardConfig.mainTile);
        this.tools.audio.playTwoSounds(this.gameboardConfig);
    };
    Gameboard.prototype.gameover = function (win) {
        this.gameOver = true;
        if (win) {
            this.wonGame = true;
            this.showGameOverWindow(win, function () {
                this.tools.misc.changeState('Story', this.gameboardConfig, false);
            }.bind(this));
        }
        else {
            this.showGameOverWindow(win, function () {
                this.tools.misc.changeState('CharacterSelection');
            }.bind(this));
        }
    };
    Gameboard.prototype.showGameOverWindow = function (win, callback) {
        if (win) {
            new WinWindow_1.default(this.gameboardConfig.mainTile, function () {
                callback();
            }.bind(this));
        }
        else {
            new GameOverWindow_1.default(this.gameboardConfig.mainTile, function () {
                callback();
            }.bind(this), function () {
                this.tools.misc.changeState('Boot');
            }.bind(this));
        }
    };
    Gameboard.prototype.showMessage = function (message, size, color, delay) {
        if (color === void 0) { color = Config_1.ColorSettings.TEXT; }
        if (delay === void 0) { delay = 1500; }
        var text = this.tools.text.makeXBounded(650, message, size, 'center', color, true);
        this.tools.misc.tweenVanishAndDestroy(text, { alpha: 0 }, delay, 'Linear', true, delay);
    };
    Gameboard.prototype.toggleButton = function (buttonStatus) {
        if (this.gameOver) {
            return;
        }
        if (buttonStatus === GameboardConfig_1.default.BUTTON_ACTIVE) {
            this.actionButton.inputEnabled = true;
            this.actionButton.tint = Phaser.Color.WHITE;
        }
        if (buttonStatus === GameboardConfig_1.default.BUTTON_SLEEP) {
            this.actionButton.inputEnabled = false;
            this.actionButton.tint = Phaser.Color.WHITE;
        }
        else if (buttonStatus === GameboardConfig_1.default.BUTTON_SLEEP_DISABLED) {
            this.actionButton.inputEnabled = false;
            this.actionButton.tint = Phaser.Color.GRAY;
        }
    };
    Gameboard.prototype.addHeader = function () {
        this.header = this.tools.text.make(20, 20, '', 50);
        this.updateHeader();
    };
    Gameboard.prototype.addMenuButton = function () {
        var menu = this.tools.sprite.createSprite(840, 30, 'menu', 0.8);
        menu.inputEnabled = true;
        menu.events.onInputDown.add(function () {
            if (!this.isPaused) {
                this.pausetoggle();
            }
        }.bind(this));
    };
    Gameboard.prototype.addPowerButton = function () {
        this.actionButton = this.tools.button.make(310, 1250, ['power'], function () {
            if (!this.isPaused) {
                this.activatePower();
            }
        }.bind(this), 1.5);
        this.actionButton.inputEnabled = false;
        this.actionButton.tint = Phaser.Color.GRAY;
    };
    Gameboard.prototype.updateScore = function (addToMovement) {
        if (addToMovement === void 0) { addToMovement = true; }
        if (addToMovement) {
            this.movements++;
        }
        this.points = this.grid.calculatePoints();
        this.updateHeader();
    };
    Gameboard.prototype.updateHeader = function () {
        this.header.setText("Score: " + this.points);
    };
    Gameboard.prototype.addTimer = function () {
        this.timerMessage = this.tools.text.make(20, 80, 'Time: 00:00', 50);
        this.timer = this.tools.misc.createTimer();
        this.timer.start();
    };
    Gameboard.prototype.updateTimer = function () {
        var min = Math.floor(this.timer.seconds / 60);
        var sec = Math.floor(this.timer.seconds - min * 60);
        this.timerMessage.setText("Time: " + this.num(min) + ":" + this.num(sec));
    };
    Gameboard.prototype.num = function (n) {
        return n > 9 ? '' + n : '0' + n;
    };
    Gameboard.prototype.pausetoggle = function () {
        if (this.isPaused) {
            this.pausedWindow.hideAndDestroy();
            this.isPaused = false;
            this.timer.resume();
        }
        else {
            this.pausedWindow = new PauseWindow_1.default(this.gameboardConfig.mainTile, function () {
                this.pausetoggle();
            }.bind(this), function () {
                this.tools.misc.changeState('Boot');
            }.bind(this));
            this.isPaused = true;
            this.timer.pause();
        }
    };
    return Gameboard;
}(Base_1.default));
exports.default = Gameboard;
