"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = require("../Config");
var ButtonFactory = (function () {
    function ButtonFactory() {
        var singleton = Config_1.Singleton.getInstance();
        this.game = singleton.game;
        this.config = singleton.config;
    }
    ButtonFactory.prototype.make = function (x, y, list, click) {
        var scale = this.config.scaleFactor;
        var safe = this.config.safeZone;
        var xPos = x * scale + safe.paddingX;
        var yPos = y * scale + safe.paddingY;
        var button = this.game.add.button(xPos, yPos, list[0], click, null);
        if (list.length == 3) {
            button.onInputOver.add(function () {
                button.loadTexture(list[1]);
            }, this);
            button.onInputOut.add(function () {
                button.loadTexture(list[0]);
            }, this);
            button.onInputDown.add(function () {
                button.loadTexture(list[2]);
            }, this);
            button.onInputUp.add(function () {
                button.loadTexture(list[0]);
            }, this);
        }
        return button;
    };
    return ButtonFactory;
}());
exports.default = ButtonFactory;
