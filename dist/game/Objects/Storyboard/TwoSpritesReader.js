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
var Reader_1 = require("./Reader");
var TwoSpritesReader = (function (_super) {
    __extends(TwoSpritesReader, _super);
    function TwoSpritesReader(actionList, endCallback) {
        var _this = _super.call(this, actionList, endCallback) || this;
        _this.leftSprite = _this.tools.sprite.createSprite(50, 300, null, 1.5);
        _this.rightSprite = _this.tools.sprite.createSprite(650, 300, null, 1.5);
        _this.title = _this.tools.text.make(20, 600, '', 60);
        _this.config.storyboard.storyboardSignal.add(function (type, model) {
            debugger;
            if (type === Reader_1.default.TITLE_ACTION) {
                this.updateTitle(model);
            }
            else {
                this.updateSprite(model);
            }
        }.bind(_this));
        return _this;
    }
    TwoSpritesReader.prototype.updateTitle = function (title) {
        this.title.text = title;
    };
    TwoSpritesReader.prototype.updateSprite = function (model) {
        var sprite = model.position === Reader_1.default.SPRITE_LEFT ? this.leftSprite : this.rightSprite;
        if (model.id) {
            sprite.loadTexture(model.id, model.frame);
            sprite.tint = model.tint;
        }
        else {
            sprite.tint = model.tint;
        }
    };
    return TwoSpritesReader;
}(Reader_1.default));
exports.default = TwoSpritesReader;
