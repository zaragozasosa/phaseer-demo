"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = require("../Config");
var TextFactory = (function () {
    function TextFactory() {
        var singleton = Config_1.Singleton.getInstance();
        this.game = singleton.game;
        this.config = singleton.config;
        this.font = 'Verdana';
    }
    TextFactory.prototype.makeTileNumber = function (x, y, value, size) {
        var xPos = x * this.config.gridSettings.tileSize +
            this.config.gridSettings.gridPaddingX;
        var yPos = y * this.config.gridSettings.tileSize +
            this.config.gridSettings.gridPaddingY;
        return this.make(xPos, yPos, value.toString(), size);
    };
    TextFactory.prototype.make = function (posX, posY, text, textSize, center, stroked, color) {
        if (center === void 0) { center = false; }
        if (stroked === void 0) { stroked = true; }
        if (color === void 0) { color = '#ffffff'; }
        var x = this.config.safeZone.paddingX + posX * this.config.scaleFactor;
        var y = this.config.safeZone.paddingY + posY * this.config.scaleFactor;
        var textObj = this.game.add.text(x, y, text);
        textObj.font = this.font;
        textObj.fontSize = textSize * this.config.scaleFactor;
        textObj.addColor(color, 0);
        if (stroked) {
            textObj.stroke = '#000000';
            textObj.strokeThickness = textSize / 4 * this.config.scaleFactor;
        }
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
        textObj.font = this.font;
        textObj.fontSize = textSize * this.config.scaleFactor;
        textObj.stroke = '#000000';
        textObj.strokeThickness = textSize / 4 * this.config.scaleFactor;
        textObj.addColor('#ffffff', 0);
        textObj.setTextBounds(this.config.safeZone.paddingX, this.config.safeZone.paddingY, this.config.safeZone.safeWidth, this.config.safeZone.safeHeight);
        return textObj;
    };
    TextFactory.prototype.makeYBounded = function (posX, text, textSize, align, color) {
        if (color === void 0) { color = '#ffffff'; }
        var safeZone = this.config.safeZone;
        var graphic = this.make(posX, 0, text, textSize, false, false, color);
        graphic.wordWrap = true;
        graphic.wordWrapWidth = safeZone.safeWidth;
        graphic.boundsAlignV = align;
        graphic.setTextBounds(10, 10, safeZone.safeWidth - 10, safeZone.safeHeight - 10);
        return graphic;
    };
    TextFactory.prototype.makeXBounded = function (posY, text, textSize, align, color, stroked) {
        if (color === void 0) { color = '#ffffff'; }
        if (stroked === void 0) { stroked = false; }
        var safeZone = this.config.safeZone;
        var graphic = this.make(0, posY, text, textSize, false, stroked, color);
        graphic.wordWrap = true;
        graphic.wordWrapWidth = safeZone.safeWidth;
        graphic.boundsAlignH = align;
        graphic.setTextBounds(10, 10, safeZone.safeWidth - 10, safeZone.safeHeight - 10);
        return graphic;
    };
    return TextFactory;
}());
exports.default = TextFactory;
