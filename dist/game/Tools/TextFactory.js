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
        var xPos = x * this.config.tileSettings.tileSize +
            this.config.tileSettings.gridPaddingX;
        var yPos = y * this.config.tileSettings.tileSize +
            this.config.tileSettings.gridPaddingY;
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
    return TextFactory;
}());
exports.default = TextFactory;
