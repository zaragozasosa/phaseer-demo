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
var GameboardUI_1 = require("./GameboardUI");
var PlayerUI_1 = require("./PlayerUI");
var InputManager_1 = require("./../../InputManager");
var Config_1 = require("./../../Config/Config");
var Gameboard = (function (_super) {
    __extends(Gameboard, _super);
    function Gameboard(gameboardConfig, gameboardUI, playerUI) {
        if (gameboardUI === void 0) { gameboardUI = null; }
        if (playerUI === void 0) { playerUI = null; }
        var _this = _super.call(this) || this;
        _this.gameboardUI = gameboardUI;
        if (!gameboardUI) {
            _this.gameboardUI = new GameboardUI_1.default(gameboardConfig);
        }
        _this.playerUI = playerUI;
        if (!playerUI) {
            _this.playerUI = new PlayerUI_1.default(gameboardConfig);
        }
        _this.gameStarted = false;
        _this.isPaused = false;
        _this.movements = 0;
        _this.showOnce = true;
        _this.gameboardConfig = gameboardConfig;
        _this.tools.graphic.addBackground();
        _this.background = _this.tools.sprite.createBackground();
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
    };
    Gameboard.prototype.createGrid = function () {
        this.grid = GridFactory_1.default.create(this.gameboardConfig);
        this.timer = this.tools.misc.createTimer();
        this.points = this.grid.calculatePoints();
        this.gameboardUI.create(this.points, this.timer, function () {
            if (!this.isPaused) {
                this.pausetoggle();
            }
        }.bind(this));
        this.playerUI.create(function () {
            if (!this.isPaused) {
                this.activatePower();
            }
        }.bind(this));
        this.input = new InputManager_1.default(this.config);
        this.gameStarted = true;
        this.debugWin();
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
        this.tools.audio.playTwoSounds(this.gameboardConfig);
    };
    Gameboard.prototype.gameover = function (win) {
        this.gameOver = true;
        if (win) {
            this.wonGame = true;
            this.gameboardUI.winScreen('Story');
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
    Gameboard.prototype.debugWin = function () {
        var win = this.tools.text.makeXBounded(1350, 'Click to win', 30, 'right');
        win.inputEnabled = true;
        win.events.onInputDown.addOnce(function () {
            this.gameover(true);
        }.bind(this));
        var lose = this.tools.text.makeXBounded(150, 'Click to lose ', 30, 'right');
        lose.inputEnabled = true;
        lose.events.onInputDown.addOnce(function () {
            this.gameover(false);
        }.bind(this));
    };
    return Gameboard;
}(Base_1.default));
exports.default = Gameboard;
