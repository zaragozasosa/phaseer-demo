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
var AmmoModel_1 = require("./../Models/AmmoModel");
var GameboardMode_1 = require("./../Models/GameboardMode");
var PowerWindow_1 = require("./Windows/PowerWindow");
var Window_1 = require("./Windows/Window");
var Config_1 = require("./../Config/Config");
var AmmoBar_1 = require("./AmmoBar");
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
        var updateAmmoSignal = new Phaser.Signal();
        updateAmmoSignal.add(function () {
            this.updateAmmo();
        }.bind(_this));
        _this.gameboardConfig.toogleButtonSignal = toogleButtonSignal;
        _this.gameboardConfig.updateScoreSignal = updateScoreSignal;
        _this.gameboardConfig.updateAmmoSignal = updateAmmoSignal;
        _this.gameboardConfig.clickTileSignal = new Phaser.Signal();
        _this.grid = GridFactory_1.default.create(gameboardConfig);
        _this.isPaused = false;
        _this.movements = 0;
        _this.points = _this.grid.calculatePoints();
        _this.addHeader();
        _this.addVolumeButton();
        _this.addPowerButton();
        _this.addTimer();
        _this.input = new InputManager_1.default(_this.config);
        _this.mode = GameboardMode_1.default.DEFAULT;
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
        var window = new PowerWindow_1.default(this.gameboardConfig.mainTile);
        var response = this.grid.activatePower();
        if (response && response instanceof AmmoModel_1.default) {
            this.mode = GameboardMode_1.default.AMMO;
            var model = response;
            this.ammoBar = new AmmoBar_1.default(model);
        }
    };
    Gameboard.prototype.updateAmmo = function () {
        if (this.mode === GameboardMode_1.default.AMMO) {
            if (this.ammoBar.update() === 0) {
                this.mode = GameboardMode_1.default.DEFAULT;
                this.gameboardConfig.clickTileSignal.removeAll();
            }
        }
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
        timer.add(1000 * 30, function () {
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
            this.pausedWindow = new Window_1.default();
            var group = this.tools.misc.addGroup();
            var text = this.tools.text.makeXBounded(400, '- PAUSED -', 80, 'center', Config_1.ColorSettings.PRIMARY);
            var text2 = this.tools.text.make(80, 560, 'Power name:', 50);
            var text3 = this.tools.text.make(80, 630, 'Description blah blah blah blah', 40, Config_1.ColorSettings.ALT_TEXT);
            var text4 = this.tools.text.make(80, 800, 'Requirements:', 50);
            var text5 = this.tools.text.make(80, 860, 'Description blah blah blah blah', 40, Config_1.ColorSettings.ALT_TEXT);
            group.add(text);
            group.add(text2);
            group.add(text3);
            group.add(text4);
            group.add(text5);
            this.pausedWindow.init(group);
            this.pausedWindow.show();
            this.isPaused = true;
        }
    };
    return Gameboard;
}(Base_1.default));
exports.default = Gameboard;
