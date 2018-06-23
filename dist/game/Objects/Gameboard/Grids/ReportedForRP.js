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
var ReportedForRP = (function (_super) {
    __extends(ReportedForRP, _super);
    function ReportedForRP(config) {
        var _this = this;
        var gridLogic = new ReportedForRPLogic_1.default(config);
        _this = _super.call(this, config, gridLogic) || this;
        return _this;
    }
    ReportedForRP.prototype.activatePower = function () {
        if (!this.buttons) {
            this.buttons = this.makeButtons();
            return this.buttons;
        }
    };
    ReportedForRP.prototype.makeButtons = function () {
        var buttons = this.tools.misc.addGroup();
        buttons.add(this.tools.button.make(50, 1250, ['power'], function () {
            this.sageClick();
        }.bind(this)));
        buttons.add(this.tools.button.make(350, 1250, ['power'], function () {
            this.reportedClick();
        }.bind(this)));
        buttons.add(this.tools.button.make(650, 1250, ['power'], function () {
            this.bannedClick();
        }.bind(this)));
        return buttons;
    };
    ReportedForRP.prototype.sageClick = function () {
        if (this.gridLogic.sagePower()) {
            this.gameboardConfig.chargeSignal.dispatch();
        }
        else {
            this.tools.audio.playSound('beep');
        }
    };
    ReportedForRP.prototype.reportedClick = function () {
        if (this.gridLogic.reportedPower()) {
            this.gameboardConfig.chargeSignal.dispatch();
        }
        else {
            this.tools.audio.playSound('beep');
        }
    };
    ReportedForRP.prototype.bannedClick = function () {
        if (this.gridLogic.bannedPower()) {
            this.gameboardConfig.chargeSignal.dispatch();
        }
        else {
            this.tools.audio.playSound('beep');
        }
    };
    return ReportedForRP;
}(Grid_1.default));
exports.default = ReportedForRP;
