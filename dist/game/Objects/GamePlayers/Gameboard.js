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
var Grid_1 = require("./Grid");
var Gameboard = (function (_super) {
    __extends(Gameboard, _super);
    function Gameboard(gameboardConfig) {
        var _this = _super.call(this) || this;
        _this.gameboardConfig = gameboardConfig;
        _this.tools.graphic.addBackground();
        _this.tools.sprite.createBackground();
        _this.debugArray = [];
        _this.grid = new Grid_1.default(gameboardConfig, function () {
            this.updateScore();
        }.bind(_this));
        _this.movements = 0;
        _this.points = _this.grid.calculatePoints();
        _this.addHeader();
        _this.addVolumeButton();
        _this.addPowerButton();
        _this.addTimer();
        return _this;
    }
    Gameboard.prototype.update = function () {
        this.grid.update();
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
        this.actionButton = this.tools.button.make(310, 1250, ['button'], null, 2);
        this.actionButton.inputEnabled = false;
        this.actionButton.tint = Phaser.Color.GRAY;
        var timer = this.tools.misc.createTimer();
        timer.start();
        timer.add(1000 * 10, function () {
            this.actionButton.inputEnabled = false;
            this.actionButton.tint = Phaser.Color.WHITE;
        }.bind(this));
    };
    Gameboard.prototype.updateScore = function () {
        this.movements++;
        this.points = this.grid.calculatePoints();
        this.updateHeader();
        this.updateDebuggingMatrix();
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
            var sec = this.timerSeconds - (min * 60);
            message.setText("Time: " + this.num(min) + ":" + this.num(sec));
        }.bind(this));
    };
    Gameboard.prototype.num = function (n) {
        return n > 9 ? "" + n : "0" + n;
    };
    Gameboard.prototype.addDebuggingMatrix = function () {
        var posX = 250;
        var posY = 1300;
        this.debugArray = [];
        this.debugArray.push(this.tools.text.makeCenteredAnchor(posX, posY, '', 30));
        this.debugArray.push(this.tools.text.makeCenteredAnchor(posX + 150, posY, '', 30));
        this.debugArray.push(this.tools.text.makeCenteredAnchor(posX + 300, posY, '', 30));
        this.debugArray.push(this.tools.text.makeCenteredAnchor(posX + 450, posY, '', 30));
        this.updateDebuggingMatrix();
    };
    Gameboard.prototype.updateDebuggingMatrix = function () {
        this.debugArray.forEach(function (text, index) {
            text.setText(this.grid.getColumnForDebug(index));
        }.bind(this));
    };
    return Gameboard;
}(Base_1.default));
exports.default = Gameboard;
