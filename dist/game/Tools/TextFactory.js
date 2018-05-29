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
var Factory_1 = require("./Base/Factory");
var TextFactory = (function (_super) {
    __extends(TextFactory, _super);
    function TextFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextFactory.prototype.makeTileNumber = function (x, y, value, size) {
        var settings = this.config.grid;
        var xPos = settings.gridPaddingX + settings.tileNumberPadX + x * settings.tileSize;
        var yPos = settings.gridPaddingY + settings.tileNumberPadY + y * settings.tileSize;
        var txt = this.make(xPos, yPos, value.toString(), size);
        this.game.physics.enable(txt, Phaser.Physics.ARCADE);
        return txt;
    };
    TextFactory.prototype.updateTileNumber = function (x, y, text) {
        var settings = this.config.grid;
        var xPos = settings.tileNumberPadX + x * settings.tileSize + settings.gridPaddingX;
        var yPos = settings.tileNumberPadY + y * settings.tileSize + settings.gridPaddingY;
        var posX = this.config.safeZone.paddingX + xPos * this.config.scaleFactor;
        var posY = this.config.safeZone.paddingY + yPos * this.config.scaleFactor;
        text.position.x = posX;
        text.position.y = posY;
    };
    TextFactory.prototype.make = function (posX, posY, text, textSize, altColor) {
        if (altColor === void 0) { altColor = false; }
        var colorConfig = this.config.color;
        var x = this.config.safeZone.paddingX + posX * this.config.scaleFactor;
        var y = this.config.safeZone.paddingY + posY * this.config.scaleFactor;
        var color = altColor ? colorConfig.altText : colorConfig.text;
        var textObj = this.game.add.text(x, y, text);
        textObj.font = this.config.grid.font;
        textObj.fontSize = textSize * this.config.scaleFactor;
        textObj.addColor(color, 0);
        return textObj;
    };
    TextFactory.prototype.makeXBounded = function (posY, text, textSize, align, altColor) {
        if (altColor === void 0) { altColor = false; }
        var safeZone = this.config.safeZone;
        var boundPadding = 15 * this.config.scaleFactor;
        var textObj = this.make(0, posY, text, textSize, altColor);
        textObj.wordWrap = true;
        textObj.wordWrapWidth = safeZone.safeWidth;
        textObj.boundsAlignH = align;
        textObj.setTextBounds(boundPadding, boundPadding, safeZone.safeWidth - boundPadding, safeZone.safeHeight - boundPadding);
        return textObj;
    };
    TextFactory.prototype.makeXBoundedOptions = function (posY, text, textSize, align, wordWrapWidth, padding, lineHeight, altColor) {
        if (altColor === void 0) { altColor = false; }
        var safeZone = this.config.safeZone;
        var textObj = this.make(0, posY, text, textSize, altColor);
        var pad = padding * this.config.scaleFactor;
        textObj.wordWrap = true;
        textObj.wordWrapWidth = wordWrapWidth * this.config.scaleFactor;
        textObj.boundsAlignH = align;
        textObj.lineSpacing = lineHeight;
        textObj.setTextBounds(pad, pad, safeZone.safeWidth - pad, safeZone.safeHeight - pad);
        return textObj;
    };
    TextFactory.prototype.makeYBounded = function (posX, text, textSize, align, altColor, wordWrapWidth, padding) {
        if (altColor === void 0) { altColor = false; }
        if (wordWrapWidth === void 0) { wordWrapWidth = 0; }
        if (padding === void 0) { padding = 0; }
        var boundPadding = padding ? padding : 15;
        var safeZone = this.config.safeZone;
        var graphic = this.make(posX, 0, text, textSize, altColor);
        graphic.wordWrap = true;
        graphic.wordWrapWidth = wordWrapWidth
            ? wordWrapWidth * this.config.scaleFactor
            : safeZone.safeWidth;
        graphic.boundsAlignV = align;
        graphic.setTextBounds(boundPadding, boundPadding, safeZone.safeWidth - boundPadding, safeZone.safeHeight - boundPadding);
        return graphic;
    };
    TextFactory.prototype.makeCenteredAnchor = function (posX, posY, text, textSize, altColor) {
        if (altColor === void 0) { altColor = false; }
        var textObj = this.make(posX, posY, text, textSize, altColor);
        textObj.anchor.set(0.5);
        return textObj;
    };
    return TextFactory;
}(Factory_1.default));
exports.default = TextFactory;
