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
var Factory_1 = require("./Tools/Factory");
var InputManager = (function (_super) {
    __extends(InputManager, _super);
    function InputManager(config) {
        var _this = _super.call(this, config) || this;
        _this.cursors = _this.game.input.keyboard.createCursorKeys();
        _this.swipe = new Swipe(_this.game);
        _this.game.input.keyboard
            .addKey(Phaser.Keyboard.SPACEBAR)
            .onDown.add(_this.keyPressedEvent, _this);
        _this.game.input.keyboard
            .addKey(Phaser.Keyboard.ENTER)
            .onDown.add(_this.keyPressedEvent, _this);
        return _this;
    }
    InputManager.prototype.keyPressedEvent = function () {
        this.keyPressed = true;
    };
    InputManager.prototype.checkCursor = function () {
        if (this.game.device.desktop) {
            if (this.cursors.left.justDown) {
                return Phaser.Keyboard.LEFT;
            }
            else if (this.cursors.right.justDown) {
                return Phaser.Keyboard.RIGHT;
            }
            else if (this.cursors.up.justDown) {
                return Phaser.Keyboard.UP;
            }
            else if (this.cursors.down.justDown) {
                return Phaser.Keyboard.DOWN;
            }
        }
        else {
            var direction = this.swipe.check();
            if (direction !== null) {
                switch (direction.direction) {
                    case this.swipe.DIRECTION_LEFT:
                        return Phaser.Keyboard.LEFT;
                    case this.swipe.DIRECTION_RIGHT:
                        return Phaser.Keyboard.RIGHT;
                    case this.swipe.DIRECTION_UP:
                        return Phaser.Keyboard.UP;
                    case this.swipe.DIRECTION_DOWN:
                        return Phaser.Keyboard.DOWN;
                }
            }
        }
        return null;
    };
    InputManager.prototype.checkKeys = function () {
        if (this.keyPressed) {
            this.keyPressed = false;
            return true;
        }
        return false;
    };
    InputManager.prototype.check = function () {
        var cursor = this.checkCursor();
        return cursor === null ? this.checkKeys : cursor;
    };
    return InputManager;
}(Factory_1.default));
exports.default = InputManager;
