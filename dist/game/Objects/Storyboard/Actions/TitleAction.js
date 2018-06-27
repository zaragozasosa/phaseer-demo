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
var SpriteActionModel_1 = require("./../SpriteActionModel");
var TitleAction = (function (_super) {
    __extends(TitleAction, _super);
    function TitleAction(parameters) {
        var _this = _super.call(this, Reader_1.default.SPRITE_ACTION, parameters) || this;
        _this.isFinished = true;
        _this.name = _this.parameters[0];
        _this.position =
            _this.parameters[1] === 'right' ? Reader_1.default.SPRITE_RIGHT : Reader_1.default.SPRITE_LEFT;
        _this.oppositeDirection =
            _this.parameters[1] === 'left' ? Reader_1.default.SPRITE_RIGHT : Reader_1.default.SPRITE_LEFT;
        return _this;
    }
    TitleAction.prototype.play = function () {
        this.config.storyboard.storyboardSignal.dispatch(Reader_1.default.TITLE_ACTION, this.name + ':');
        this.config.storyboard.storyboardSignal.dispatch(Reader_1.default.SPRITE_ACTION, new SpriteActionModel_1.default(null, 0, this.oppositeDirection, Phaser.Color.GRAY));
        this.actionIsOverSignal.dispatch();
    };
    return TitleAction;
}(BaseAction_1.default));
exports.default = TitleAction;
