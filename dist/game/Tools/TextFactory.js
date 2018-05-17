"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = require("../Config");
var TextFactory = (function () {
    function TextFactory() {
        var singleton = Config_1.Singleton.getInstance();
        this.game = singleton.game;
        this.config = singleton.config;
    }
    TextFactory.prototype.makeTileNumber = function (x, y, value, size) {
        var xPos = x * this.config.gridSettings.tileSize +
            this.config.gridSettings.gridPaddingX;
        var yPos = y * this.config.gridSettings.tileSize +
            this.config.gridSettings.gridPaddingY;
        return this.makeStroked(xPos, yPos, value.toString(), size);
    };
    TextFactory.prototype.makeStroked = function (posX, posY, text, textSize, center) {
        if (center === void 0) { center = false; }
        var x = this.config.safeZone.paddingX + posX * this.config.scaleFactor;
        var y = this.config.safeZone.paddingY + posY * this.config.scaleFactor;
        var textObj = this.game.add.text(x, y, text);
        textObj.font = 'Arial Black';
        textObj.fontSize = textSize * this.config.scaleFactor;
        textObj.stroke = '#000000';
        textObj.strokeThickness = textSize / 4 * this.config.scaleFactor;
        textObj.addColor('#ffffff', 0);
        if (center) {
            textObj.anchor.set(0.5);
        }
        this.game.physics.enable(textObj, Phaser.Physics.ARCADE);
        return textObj;
    };
    TextFactory.prototype.makeHorizontalCentered = function (posY, text, textSize) {
        var y = this.config.safeZone.paddingY + posY * this.config.scaleFactor;
        var style = { boundsAlignH: 'center' };
        var textObj = this.game.add.text(0, y, text, style);
        textObj.font = 'Arial Black';
        textObj.fontSize = textSize * this.config.scaleFactor;
        textObj.stroke = '#000000';
        textObj.strokeThickness = textSize / 4 * this.config.scaleFactor;
        textObj.addColor('#ffffff', 0);
        textObj.setTextBounds(this.config.safeZone.paddingX, this.config.safeZone.paddingY, this.config.safeZone.safeWidth, this.config.safeZone.safeHeight);
        textObj.padding = new Phaser.Point(20, 20);
        ;
        return textObj;
    };
    return TextFactory;
}());
exports.default = TextFactory;
