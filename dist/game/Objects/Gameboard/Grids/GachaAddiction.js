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
var Grid_1 = require("./../Grid");
var GachaAddictionLogic_1 = require("./../GridLogic/GachaAddictionLogic");
var GachaAddiction = (function (_super) {
    __extends(GachaAddiction, _super);
    function GachaAddiction(config) {
        var _this = this;
        var gridLogic = new GachaAddictionLogic_1.default(config);
        _this = _super.call(this, config, gridLogic) || this;
        return _this;
    }
    GachaAddiction.prototype.activatePower = function () {
        this.gridLogic.power();
    };
    GachaAddiction.prototype.getPowerConfiguration = function () {
        this.diamondInfo = this.gridLogic.getPowerInfo();
        return this.diamondInfo;
    };
    return GachaAddiction;
}(Grid_1.default));
exports.default = GachaAddiction;
