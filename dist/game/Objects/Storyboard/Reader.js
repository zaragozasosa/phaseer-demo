"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Reader = (function () {
    function Reader(actionList, endCallback) {
        this.actionList = actionList;
        this.endCallback = endCallback;
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
    return Reader;
}());
exports.default = Reader;
