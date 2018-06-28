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
var BaseAction_1 = require("./BaseAction");
var Reader_1 = require("./../Reader");
var TextAction = (function (_super) {
    __extends(TextAction, _super);
    function TextAction(parameters) {
        var _this = _super.call(this, Reader_1.default.TEXT_ACTION, parameters) || this;
        _this.words = [];
        _this.word = '';
        _this.letterIndex = 0;
        _this.wordIndex = 0;
        _this.wordDelay = 50;
        _this.content = _this.parameters[0];
        return _this;
    }
    TextAction.prototype.play = function () {
        this.wordIndex = 0;
        this.text = this.tools.text.makeXBounded(670, '', 45, 'left');
        this.words = this.content.split(' ');
        this.nextWord();
    };
    TextAction.prototype.stop = function () {
        this.isFinished = true;
        this.letterLoop.loop = false;
        this.wordIndex = this.words.length;
        this.text.text = this.content;
    };
    TextAction.prototype.nextWord = function () {
        this.letterIndex = 0;
        this.word = this.words[this.wordIndex];
        if (!this.word) {
            this.isFinished = true;
            return;
        }
        this.letterLoop = this.tools.misc.repeatEvent(this.wordDelay, this.word.length, function () {
            this.nextLetter();
        }.bind(this));
        this.wordIndex++;
    };
    TextAction.prototype.nextLetter = function () {
        if (this.isFinished) {
            return;
        }
        this.text.text += this.word[this.letterIndex];
        this.letterIndex++;
        if (this.letterIndex === this.word.length) {
            this.tools.misc.runLater(this.word[this.letterIndex - 1] !== '.'
                ? this.wordDelay
                : this.wordDelay * 10, function () {
                this.text.text += ' ';
                this.nextWord();
            }.bind(this));
        }
    };
    TextAction.prototype.clear = function () {
        this.text.destroy();
    };
    return TextAction;
}(BaseAction_1.default));
exports.default = TextAction;
