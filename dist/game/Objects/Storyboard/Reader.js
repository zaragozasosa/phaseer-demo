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
var Base_1 = require("./../../Base");
var Reader = (function (_super) {
    __extends(Reader, _super);
    function Reader(actionList, endCallback) {
        var _this = _super.call(this) || this;
        _this.actionList = actionList;
        _this.endCallback = endCallback;
        return _this;
    }
    Reader.prototype.start = function () {
        this.actionIndex = 0;
        this.play();
    };
    Reader.prototype.playNextAction = function () {
        var action = this.actionList[this.actionIndex];
        if (action) {
            if (action.isFinished) {
                action.clear();
            }
            else {
                action.isFinished = true;
                action.stop();
                return;
            }
        }
        this.actionIndex++;
        this.play();
    };
    Reader.prototype.play = function () {
        var action = this.actionList[this.actionIndex];
        if (action) {
            action.actionIsOverSignal.addOnce(function () {
                this.playNextAction();
            }.bind(this));
            action.play();
        }
        else {
            this.endCallback();
        }
    };
    Reader.TITLE_ACTION = 1;
    Reader.SPRITE_ACTION = 2;
    Reader.TEXT_ACTION = 3;
    Reader.SFX_ACTION = 4;
    Reader.CHANGE_STATE_ACTION = 5;
    Reader.SPRITE_RIGHT = 1;
    Reader.SPRITE_LEFT = 2;
    Reader.SPRITE_BOTH = 3;
    return Reader;
}(Base_1.default));
exports.default = Reader;
