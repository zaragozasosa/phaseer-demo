"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = require("./Config");
var TextFactory_1 = require("./Tools/TextFactory");
var Grid_1 = require("./Grid");
var Gameboard = (function () {
    function Gameboard(gameboardConfig) {
        var singleton = Config_1.Singleton.getInstance();
        this.game = singleton.game;
        this.config = singleton.config;
        this.textFactory = new TextFactory_1.default();
        this.gameboardConfig = gameboardConfig;
        this.addBackground();
        this.grid = new Grid_1.default(gameboardConfig, function () {
            this.updateScore();
        }.bind(this));
        this.movements = 0;
        this.points = this.grid.tilesArray.calculateSum();
        this.addHeader();
        this.addDebuggingMatrix();
    }
    Gameboard.prototype.update = function () {
        this.grid.update();
    };
    Gameboard.prototype.addBackground = function () {
        var game = this.game;
        var config = this.config;
        var xPad = config.safeZone.paddingX;
        var yPad = config.safeZone.paddingY;
        var graphics = this.game.add.graphics(0, 0);
        graphics.lineStyle(0);
        graphics.beginFill(0xe7e5df, 1);
        graphics.drawRect(xPad, yPad, config.safeZone.safeWidth, config.safeZone.safeHeight);
        graphics.endFill();
    };
    Gameboard.prototype.addHeader = function () {
        this.header = this.textFactory.make(20, 80, '', 50);
        this.updateHeader();
    };
    Gameboard.prototype.addPowerButton = function () {
        var posX = this.config.safeZone.paddingX + 250 * this.config.scaleFactor;
        var posY = this.config.safeZone.paddingY + 1200 * this.config.scaleFactor;
        var button = this.game.add.button(posX, posY, 'button', null, this, 1, 0, 2);
        button.scale.setTo(this.config.scaleFactor, this.config.scaleFactor);
    };
    Gameboard.prototype.addDebuggingMatrix = function () {
        var posX = 250;
        var posY = 1300;
        this.debugArray = [];
        this.debugArray.push(this.textFactory.make(posX, posY, '', 30, true));
        this.debugArray.push(this.textFactory.make(posX + 150, posY, '', 30, true));
        this.debugArray.push(this.textFactory.make(posX + 300, posY, '', 30, true));
        this.debugArray.push(this.textFactory.make(posX + 450, posY, '', 30, true));
        this.updateDebuggingMatrix();
    };
    Gameboard.prototype.updateScore = function () {
        this.movements++;
        this.points = this.grid.tilesArray.calculateSum();
        this.updateHeader();
        this.updateDebuggingMatrix();
    };
    Gameboard.prototype.updateDebuggingMatrix = function () {
        this.debugArray.forEach(function (text, index) {
            text.setText(this.grid.tilesArray.get(index, 0) + "\n" + this.grid.tilesArray.get(index, 1) + "\n" + this.grid.tilesArray.get(index, 2) + "\n" + this.grid.tilesArray.get(index, 3));
        }.bind(this));
    };
    Gameboard.prototype.updateHeader = function () {
        this.header.setText("Score: " + this.points + "     Movements: " + this.movements);
    };
    return Gameboard;
}());
exports.default = Gameboard;
