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
var SfxAction = (function (_super) {
    __extends(SfxAction, _super);
    function SfxAction(parameters) {
        var _this = _super.call(this, Reader_1.default.SPRITE_ACTION, parameters) || this;
        _this.isFinished = true;
        _this.id = _this.parameters[0];
        return _this;
    }
    SfxAction.prototype.play = function () {
        this.tools.audio.playSound(this.id);
        this.actionIsOverSignal.dispatch();
    };
    return SfxAction;
}(BaseAction_1.default));
exports.default = SfxAction;
