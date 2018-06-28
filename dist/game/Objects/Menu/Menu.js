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
var MenuList_1 = require("./MenuList");
var Base_1 = require("./../../Base");
var Menu = (function (_super) {
    __extends(Menu, _super);
    function Menu(list, posY, fontSize) {
        if (posY === void 0) { posY = 700; }
        if (fontSize === void 0) { fontSize = 50; }
        var _this = _super.call(this) || this;
        _this.parentElement = list;
        _this.list = list;
        _this.posY = posY;
        _this.fontSize = fontSize;
        if (_this.config.storyboard.menuInputSignal) {
            _this.config.storyboard.menuInputSignal.dispose();
        }
        _this.config.storyboard.menuInputSignal = new Phaser.Signal();
        _this.config.storyboard.menuInputSignal.add(function (key) {
            if (key === Phaser.Keyboard.ENTER) {
                this.action();
            }
            else if (key === Phaser.Keyboard.ESC) {
                this.back();
            }
            else {
                this.update(key);
            }
        }.bind(_this));
        if (_this.config.storyboard.optionClickSignal) {
            _this.config.storyboard.optionClickSignal.dispose();
        }
        _this.config.storyboard.optionClickSignal = new Phaser.Signal();
        _this.config.storyboard.optionClickSignal.add(function (option) {
            this.selectedList.setSelectedOption(option);
            this.action();
        }.bind(_this));
        return _this;
    }
    Menu.prototype.show = function () {
        this.selectedList = this.list;
        this.selectedList.show(this.posY, this.fontSize);
    };
    Menu.prototype.update = function (cursor) {
        if (cursor === Phaser.Keyboard.UP || cursor === Phaser.Keyboard.LEFT) {
            this.selectedList.goPrev();
        }
        else if (cursor === Phaser.Keyboard.DOWN ||
            cursor === Phaser.Keyboard.RIGHT) {
            this.selectedList.goNext();
        }
    };
    Menu.prototype.action = function () {
        this.tools.audio.playBeep();
        if (this.selectedList.selectedOption.isBackOption) {
            this.back();
        }
        else {
            this.selectedList.selectedOption.action();
            if (this.selectedList.selectedOption instanceof MenuList_1.default) {
                this.selectedList.clearAll();
                this.selectedList = this.selectedList.selectedOption;
            }
        }
    };
    Menu.prototype.back = function () {
        if (this.selectedList.parentObject) {
            this.selectedList.clearAll();
            this.tools.audio.playBeep();
            this.selectedList.parentObject.show(this.posY, this.fontSize);
            this.selectedList = this.selectedList.parentObject;
        }
    };
    Menu.prototype.destroy = function () {
        this.config.storyboard.menuInputSignal.dispose();
        this.config.storyboard.optionClickSignal.dispose();
        this.selectedList.clearAll();
    };
    return Menu;
}(Base_1.default));
exports.default = Menu;
