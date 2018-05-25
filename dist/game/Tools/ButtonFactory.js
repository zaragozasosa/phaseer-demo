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
var Factory_1 = require("./Factory");
var ButtonFactory = (function (_super) {
    __extends(ButtonFactory, _super);
    function ButtonFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
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
}(Factory_1.default));
exports.default = ButtonFactory;
