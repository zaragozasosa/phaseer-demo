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
var GridFactory_1 = require("./Factories/GridFactory");
var InputManager_1 = require("./../../InputManager");
var Config_1 = require("./../../Config/Config");
var Gameboard = (function (_super) {
    __extends(Gameboard, _super);
    function Gameboard(gameboardConfig, gameboardUI, playerUI) {
        var _this = _super.call(this) || this;
        _this.gameboardUI = gameboardUI;
        _this.playerUI = playerUI;
        _this.gameStarted = false;
        _this.isPaused = false;
        _this.movements = 0;
        _this.showOnce = true;
        _this.gameboardConfig = gameboardConfig;
        _this.tools.graphic.addBackground();
        var backId = _this.gameboardConfig.mainTile.power.backgroundId;
        _this.background = _this.tools.sprite.createBackground(backId);
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
        return _this;
    }
    Gameboard.prototype.updateScore = function (addToMovement) {
        if (addToMovement === void 0) { addToMovement = true; }
        if (addToMovement) {
            this.movements++;
        }
        this.points = this.grid.calculatePoints();
    };
    Gameboard.prototype.start = function () {
        this.createGrid();
        this.createPlayerUI();
    };
    Gameboard.prototype.createGameboardUI = function () {
        this.gameboardUI.create(this.points, this.timer, function () {
            if (!this.isPaused) {
                this.pausetoggle();
            }
        }.bind(this));
    };
    Gameboard.prototype.createPlayerUI = function () {
        this.playerUI.create(function () {
            if (!this.isPaused) {
                this.activatePower();
            }
        }.bind(this));
    };
    Gameboard.prototype.createGrid = function () {
        this.grid = GridFactory_1.default.create(this.gameboardConfig);
        this.timer = this.tools.misc.createTimer();
        this.points = this.grid.calculatePoints();
        this.input = new InputManager_1.default(this.config);
        this.gameStarted = true;
        this.createGameboardUI();
    };
    Gameboard.prototype.update = function () {
        if (!this.gameStarted) {
            return;
        }
        var cursor;
        if (!this.gameOver) {
            this.gameboardUI.update(this.points);
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
        this.playerUI.activatePower();
        this.grid.activatePower();
    };
    Gameboard.prototype.gameover = function (win) {
        this.gameOver = true;
        if (win) {
            this.wonGame = true;
            var nextState = this.gameboardConfig.playStory ? 'Story' : 'MainMenu';
            this.gameboardUI.winScreen(nextState);
        }
        else {
            this.gameboardUI.gameOverScreen();
        }
    };
    Gameboard.prototype.showMessage = function (message, size, color, delay) {
        if (color === void 0) { color = Config_1.ColorSettings.TEXT; }
        if (delay === void 0) { delay = 1500; }
        this.gameboardUI.showMessage(message, size, color, delay);
    };
    Gameboard.prototype.toggleButton = function (buttonStatus) {
        if (this.gameOver) {
            return;
        }
        this.playerUI.toggleButton(buttonStatus);
    };
    Gameboard.prototype.pausetoggle = function () {
        var _this = this;
        if (this.isPaused) {
            this.gameboardUI.unpause();
            this.isPaused = false;
            this.timer.resume();
        }
        else {
            this.gameboardUI.pause(function () { return _this.pausetoggle(); });
            this.isPaused = true;
            this.timer.pause();
        }
    };
    return Gameboard;
}(Base_1.default));
exports.default = Gameboard;
