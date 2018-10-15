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
var GameboardState_1 = require("./../../Models/GameboardState");
var Config_1 = require("./../../Config/Config");
var Gameboard = (function (_super) {
    __extends(Gameboard, _super);
    function Gameboard(gameboardConfig, gameboardUI, playerUI) {
        var _this = _super.call(this) || this;
        _this.gameboardUI = gameboardUI;
        _this.playerUI = playerUI;
        _this.gameState = new GameboardState_1.default();
        _this.movements = 0;
        _this.showOnce = true;
        _this.gameboardConfig = gameboardConfig;
        _this.background = _this.gameboardUI.drawBackground();
        var updateMovementsSignal = new Phaser.Signal();
        updateMovementsSignal.add(function () {
            this.updateMovements();
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
        _this.gameboardConfig.updateMovementsSignal = updateMovementsSignal;
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
    ;
    Object.defineProperty(Gameboard.prototype, "isPaused", {
        get: function () {
            return this.grid.isPaused;
        },
        set: function (value) {
            this.grid.isPaused = value;
        },
        enumerable: true,
        configurable: true
    });
    Gameboard.prototype.updateMovements = function () {
        this.movements++;
    };
    Gameboard.prototype.createGameboardUI = function () {
        this.gameboardUI.create(this.timer, function () {
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
        this.points = this.grid.points;
        this.input = new InputManager_1.default(this.config);
        this.gameState.userControl = true;
        this.createGameboardUI();
    };
    Gameboard.prototype.start = function () {
        this.createGrid();
        this.createPlayerUI();
    };
    Gameboard.prototype.update = function () {
        if (!this.gameState.userControl) {
            return;
        }
        var cursor;
        if (!this.gameState.gameOver) {
            this.gameboardUI.update(this.grid);
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
        if (this.gameState.wonGame) {
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
        if (this.gameState.gameOver) {
            return;
        }
        this.playerUI.activatePower();
        this.grid.activatePower();
    };
    Gameboard.prototype.gameover = function (win) {
        this.gameState.gameOver = true;
        if (win) {
            this.gameState.wonGame = true;
            var nextState = this.gameboardConfig.playStory ? 'Story' : 'MainMenu';
            this.gameboardUI.winScreen(nextState);
        }
        else {
            this.gameboardUI.gameOverScreen(this.gameState);
        }
    };
    Gameboard.prototype.showMessage = function (message, size, color, delay) {
        if (color === void 0) { color = Config_1.ColorSettings.TEXT; }
        if (delay === void 0) { delay = 1500; }
        this.gameboardUI.showMessage(message, size, color, delay);
    };
    Gameboard.prototype.toggleButton = function (buttonStatus) {
        if (this.gameState.gameOver) {
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
