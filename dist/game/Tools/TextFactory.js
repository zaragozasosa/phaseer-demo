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
var Config_1 = require("./../Config/Config");
var TextFactory = (function (_super) {
    __extends(TextFactory, _super);
    function TextFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextFactory.prototype.makeTileNumber = function (x, y, value, size) {
        var settings = this.config.grid;
        var xPos = settings.tileNumberPadX + x * settings.tileSize;
        var yPos = settings.tileNumberPadY + y * settings.tileSize;
        var txt = this.make(xPos, yPos, value.toString(), size, Config_1.ColorSettings.TEXT, settings.gridPaddingX, settings.gridPaddingY);
        this.game.physics.enable(txt, Phaser.Physics.ARCADE);
        return this.addStroke(txt, size);
    };
    TextFactory.prototype.updateTileNumber = function (x, y, text) {
        var settings = this.config.grid;
        var xPos = settings.tileNumberPadX + x * settings.tileSize;
        var yPos = settings.tileNumberPadY + y * settings.tileSize;
        var posX = this.config.safeZone.paddingX + xPos * this.config.scaleFactor;
        var posY = this.config.safeZone.paddingY + yPos * this.config.scaleFactor;
        text.position.x = posX + settings.gridPaddingX;
        text.position.y = posY + settings.gridPaddingY;
    };
    TextFactory.prototype.make = function (posX, posY, text, textSize, color, padX, padY) {
        if (color === void 0) { color = Config_1.ColorSettings.TEXT; }
        if (padX === void 0) { padX = 0; }
        if (padY === void 0) { padY = 0; }
        if (color === null) {
            color = Config_1.ColorSettings.TEXT;
        }
        var colorString = this.getColor(color);
        var x = this.config.safeZone.paddingX + padX + posX * this.config.scaleFactor;
        var y = this.config.safeZone.paddingY + padY + posY * this.config.scaleFactor;
        var textObj = this.game.add.text(x, y, text);
        textObj.font = this.config.grid.font;
        textObj.fontSize = textSize * this.config.scaleFactor;
        textObj.addColor(colorString, 0);
        return textObj;
    };
    TextFactory.prototype.makeXBounded = function (posY, text, textSize, align, color, stroked) {
        if (color === void 0) { color = Config_1.ColorSettings.TEXT; }
        if (stroked === void 0) { stroked = false; }
        var safeZone = this.config.safeZone;
        var boundPadding = 15 * this.config.scaleFactor;
        var textObj = stroked
            ? this.makeStroked(0, posY, text, textSize, color)
            : this.make(0, posY, text, textSize, color);
        textObj.wordWrap = true;
        textObj.wordWrapWidth = safeZone.safeWidth;
        textObj.boundsAlignH = align;
        textObj.setTextBounds(boundPadding, boundPadding, safeZone.safeWidth - boundPadding, safeZone.safeHeight - boundPadding);
        return textObj;
    };
    TextFactory.prototype.makeXBoundedOptions = function (posY, text, textSize, align, wordWrapWidth, padding, lineHeight, color, stroked) {
        if (color === void 0) { color = Config_1.ColorSettings.TEXT; }
        if (stroked === void 0) { stroked = false; }
        var safeZone = this.config.safeZone;
        var textObj = stroked
            ? this.makeStroked(0, posY, text, textSize, color)
            : this.make(0, posY, text, textSize, color);
        var pad = padding * this.config.scaleFactor;
        textObj.wordWrap = true;
        textObj.wordWrapWidth = wordWrapWidth * this.config.scaleFactor;
        textObj.boundsAlignH = align;
        textObj.lineSpacing = lineHeight;
        textObj.setTextBounds(pad, pad, safeZone.safeWidth - pad, safeZone.safeHeight - pad);
        return textObj;
    };
    TextFactory.prototype.makeCenteredAnchor = function (posX, posY, text, textSize, color) {
        if (color === void 0) { color = Config_1.ColorSettings.TEXT; }
        var textObj = this.make(posX, posY, text, color);
        textObj.anchor.set(0.5);
        return textObj;
    };
    TextFactory.prototype.changeColor = function (text, color) {
        text.addColor(this.getColor(color), 0);
    };
    TextFactory.prototype.makeStroked = function (posX, posY, text, textSize, color, padX, padY) {
        if (color === void 0) { color = Config_1.ColorSettings.TEXT; }
        if (padX === void 0) { padX = 0; }
        if (padY === void 0) { padY = 0; }
        var txt = this.make(posX, posY, text, textSize, color, padX, padY);
        return this.addStroke(txt, textSize);
    };
    TextFactory.prototype.addStroke = function (text, size) {
        text.stroke = '#000000';
        text.strokeThickness = this.config.scaleFactor * size / 5;
        return text;
    };
    return TextFactory;
}(Factory_1.default));
exports.default = TextFactory;
