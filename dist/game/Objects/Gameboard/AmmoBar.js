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
var AmmoBar = (function (_super) {
    __extends(AmmoBar, _super);
    function AmmoBar(model) {
        var _this = _super.call(this) || this;
        _this.model = model;
        _this.ammo = model.ammo;
        _this.group = _this.tools.misc.addGroup();
        _this.create();
        return _this;
    }
    AmmoBar.prototype.create = function () {
        var y = 1250;
        var x = 80;
        var model = this.model;
        for (var i = 0; i < this.ammo; i++) {
            this.group.add(this.tools.sprite.createSprite(x + i * model.length, y, model.id, 0.4));
        }
    };
    AmmoBar.prototype.update = function () {
        var sprite = this.group.getTop();
        if (sprite) {
            this.group.removeChild(sprite);
            this.ammo--;
        }
        return this.ammo;
    };
    return AmmoBar;
}(Base_1.default));
exports.default = AmmoBar;
