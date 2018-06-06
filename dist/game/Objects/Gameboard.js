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
var Base_1 = require("./../Base");
var GridFactory_1 = require("./GridFactory");
var InputManager_1 = require("./../InputManager");
var PowerWindow_1 = require("./Windows/PowerWindow");
var PauseWindow_1 = require("./Windows/PauseWindow");
var Gameboard = (function (_super) {
    __extends(Gameboard, _super);
    function Gameboard(gameboardConfig) {
        var _this = _super.call(this) || this;
        _this.gameboardConfig = gameboardConfig;
        _this.tools.graphic.addBackground();
        _this.tools.sprite.createBackground();
        _this.debugArray = [];
        var updateScoreSignal = new Phaser.Signal();
        updateScoreSignal.add(function (addToMovement) {
            this.updateScore(addToMovement);
        }.bind(_this));
        var toogleButtonSignal = new Phaser.Signal();
        toogleButtonSignal.add(function (disabled) {
            this.toogleButton(disabled);
        }.bind(_this));
        _this.gameboardConfig.toogleButtonSignal = toogleButtonSignal;
        _this.gameboardConfig.updateScoreSignal = updateScoreSignal;
        _this.gameboardConfig.clickTileSignal = new Phaser.Signal();
        _this.gameboardConfig.mergeTileSignal = new Phaser.Signal();
        _this.gameboardConfig.updateAmmoSignal = new Phaser.Signal();
        _this.gameboardConfig.chargeSignal = new Phaser.Signal();
        _this.grid = GridFactory_1.default.create(gameboardConfig);
        _this.isPaused = false;
        _this.movements = 0;
        _this.points = _this.grid.calculatePoints();
        _this.addHeader();
        _this.addVolumeButton();
        _this.addPowerButton();
        _this.addTimer();
        _this.input = new InputManager_1.default(_this.config);
        return _this;
    }
    Gameboard.prototype.update = function () {
        var keys = this.input.checkKeys();
        if (keys === Phaser.Keyboard.ESC) {
            this.pauseToogle();
        }
        if (!this.isPaused) {
            var cursor = this.input.checkCursor();
            this.grid.update(cursor);
        }
    };
    Gameboard.prototype.activatePower = function () {
        this.actionButton.kill();
        this.grid.activatePower();
        var window = new PowerWindow_1.default(this.gameboardConfig.mainTile);
        this.tools.audio.playTwoSounds(this.gameboardConfig);
    };
    Gameboard.prototype.toogleButton = function (disabled) {
        if (disabled || this.isButtonSleeping) {
            this.actionButton.tint = Phaser.Color.GRAY;
            this.actionButton.inputEnabled = false;
        }
        else {
            this.actionButton.tint = Phaser.Color.WHITE;
            this.actionButton.inputEnabled = true;
        }
    };
    Gameboard.prototype.addHeader = function () {
        this.header = this.tools.text.make(20, 20, '', 50);
        this.updateHeader();
    };
    Gameboard.prototype.addVolumeButton = function () {
        this.muteToogleSprite = this.tools.sprite.createVolumeIcon();
        this.muteToogleSprite.events.onInputDown.add(function () {
            this.tools.audio.changeAudioLevel(this.muteToogleSprite);
        }.bind(this));
    };
    Gameboard.prototype.addPowerButton = function () {
        this.actionButton = this.tools.button.make(310, 1250, ['power'], function () {
            this.activatePower();
        }.bind(this), 1.5);
        this.isButtonSleeping = true;
        this.actionButton.inputEnabled = false;
        this.actionButton.tint = Phaser.Color.GRAY;
        var timer = this.tools.misc.createTimer();
        timer.start();
        timer.add(1000 * this.gameboardConfig.powerDelaySeconds, function () {
            this.isButtonSleeping = false;
        }.bind(this));
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
        var message = this.tools.text.make(20, 80, 'Time: 00:00', 50);
        this.timerSeconds = 0;
        this.timer = this.tools.misc.createTimer();
        this.timer.start();
        this.timer.loop(1000, function () {
            this.timerSeconds++;
            var min = Math.floor(this.timerSeconds / 60);
            var sec = this.timerSeconds - min * 60;
            message.setText("Time: " + this.num(min) + ":" + this.num(sec));
        }.bind(this));
    };
    Gameboard.prototype.num = function (n) {
        return n > 9 ? '' + n : '0' + n;
    };
    Gameboard.prototype.pauseToogle = function () {
        if (this.isPaused) {
            this.pausedWindow.hideAndDestroy();
            this.isPaused = false;
        }
        else {
            this.pausedWindow = new PauseWindow_1.default(this.gameboardConfig.mainTile);
            this.isPaused = true;
        }
    };
    return Gameboard;
}(Base_1.default));
exports.default = Gameboard;
