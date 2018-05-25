"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = require("./../Models/Config");
var TextFactory_1 = require("./../Tools/TextFactory");
var GraphicsFactory_1 = require("./../Tools/GraphicsFactory");
var Grid_1 = require("./Grid");
var Gameboard = (function () {
    function Gameboard(gameboardConfig) {
        var singleton = Config_1.Singleton.getInstance();
        this.game = singleton.game;
        this.config = singleton.config;
        this.textFactory = new TextFactory_1.default();
        this.graphicsFactory = new GraphicsFactory_1.default();
        this.gameboardConfig = gameboardConfig;
        this.graphicsFactory.addBackground();
        this.debugArray = [];
        this.grid = new Grid_1.default(gameboardConfig, function () {
            this.updateScore();
        }.bind(this));
        this.movements = 0;
        this.points = this.grid.calculatePoints();
        this.addHeader();
        this.addDebuggingMatrix();
    }
    Gameboard.prototype.update = function () {
        this.grid.update();
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
        this.debugArray.push(this.textFactory.makeCenteredAnchor(posX, posY, '', 30));
        this.debugArray.push(this.textFactory.makeCenteredAnchor(posX + 150, posY, '', 30));
        this.debugArray.push(this.textFactory.makeCenteredAnchor(posX + 300, posY, '', 30));
        this.debugArray.push(this.textFactory.makeCenteredAnchor(posX + 450, posY, '', 30));
        this.updateDebuggingMatrix();
    };
    Gameboard.prototype.updateScore = function () {
        this.movements++;
        this.points = this.grid.calculatePoints();
        this.updateHeader();
        this.updateDebuggingMatrix();
    };
    Gameboard.prototype.updateDebuggingMatrix = function () {
        this.debugArray.forEach(function (text, index) {
            text.setText(this.grid.getColumnForDebug(index));
        }.bind(this));
    };
    Gameboard.prototype.updateHeader = function () {
        this.header.setText("Score: " + this.points + "     Movements: " + this.movements);
    };
    return Gameboard;
}());
exports.default = Gameboard;
