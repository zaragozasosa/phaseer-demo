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
        _this.debugArray = [];
        _this.grid = new Grid_1.default(gameboardConfig, function () {
            this.updateScore();
        }.bind(_this));
        _this.movements = 0;
        _this.points = _this.grid.calculatePoints();
        _this.addHeader();
        var volIcon = _this.tools.sprite.createVolumeIcon();
        volIcon.events.onInputDown.add(function () {
            this.tools.audio.changeAudioLevel(volIcon);
        }.bind(_this));
        _this.actionButton = _this.tools.button.make(260, 1200, ['button-mayo'], null);
        return _this;
    }
    Gameboard.prototype.update = function () {
        this.grid.update();
    };
    Gameboard.prototype.addHeader = function () {
        this.header = this.tools.text.make(20, 80, '', 40);
        this.updateHeader();
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
}(Base_1.default));
exports.default = Gameboard;
