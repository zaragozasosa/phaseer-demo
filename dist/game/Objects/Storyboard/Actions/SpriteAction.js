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
var SpriteAction = (function (_super) {
    __extends(SpriteAction, _super);
    function SpriteAction(parameters) {
        var _this = _super.call(this, Reader_1.default.SPRITE_ACTION, parameters) || this;
        _this.isFinished = true;
        _this.id = _this.parameters[0];
        _this.frame = parseInt(_this.parameters[1]);
        _this.position =
            _this.parameters[2].toLocaleLowerCase() === 'right'
                ? Reader_1.default.SPRITE_RIGHT
                : _this.parameters[2].toLocaleLowerCase() === 'left'
                    ? Reader_1.default.SPRITE_LEFT
                    : Reader_1.default.SPRITE_BOTH;
        _this.tint = _this.parameters[3] ? Phaser.Color.BLACK : Phaser.Color.WHITE;
        return _this;
    }
    SpriteAction.prototype.play = function () {
        this.config.storyboard.storyboardSignal.dispatch(Reader_1.default.SPRITE_ACTION, new SpriteActionModel_1.default(this.id, this.frame, this.position, this.tint));
        this.actionIsOverSignal.dispatch();
    };
    return SpriteAction;
}(BaseAction_1.default));
exports.default = SpriteAction;
