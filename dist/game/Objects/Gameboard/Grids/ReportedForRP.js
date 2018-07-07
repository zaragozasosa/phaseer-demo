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
var ReportedForRPLogic_1 = require("./../GridLogic/ReportedForRPLogic");
var ChargeModel_1 = require("./../../../Models/ChargeModel");
var ReportedForRP = (function (_super) {
    __extends(ReportedForRP, _super);
    function ReportedForRP(config) {
        var _this = this;
        var gridLogic = new ReportedForRPLogic_1.default(config);
        _this = _super.call(this, config, gridLogic) || this;
        return _this;
    }
    ReportedForRP.prototype.getPowerConfiguration = function () {
        var _this = this;
        var config = [];
        config.push(new ChargeModel_1.default('sage', 50, function () { return _this.sagedClick(); }));
        config.push(new ChargeModel_1.default('report', 350, function () { return _this.reportedClick(); }));
        config.push(new ChargeModel_1.default('ban', 650, function () { return _this.bannedClick(); }));
        return config;
    };
    ReportedForRP.prototype.sagedClick = function () {
        if (this.gridLogic.sagePower()) {
            this.gameboardConfig.chargeSignal.dispatch();
        }
        else {
            this.tools.audio.playBeep();
        }
    };
    ReportedForRP.prototype.reportedClick = function () {
        if (this.gridLogic.reportedPower()) {
            this.gameboardConfig.chargeSignal.dispatch();
        }
        else {
            this.tools.audio.playBeep();
        }
    };
    ReportedForRP.prototype.bannedClick = function () {
        if (this.gridLogic.bannedPower()) {
            this.gameboardConfig.chargeSignal.dispatch();
        }
        else {
            this.tools.audio.playBeep();
        }
    };
    return ReportedForRP;
}(Grid_1.default));
exports.default = ReportedForRP;
