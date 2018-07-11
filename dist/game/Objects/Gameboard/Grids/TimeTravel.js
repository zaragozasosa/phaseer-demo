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
var TimeTravelLogic_1 = require("./../Logic/TimeTravelLogic");
var TimeTravel = (function (_super) {
    __extends(TimeTravel, _super);
    function TimeTravel(config) {
        var _this = this;
        var gridLogic = new TimeTravelLogic_1.default(config);
        _this = _super.call(this, config, gridLogic) || this;
        return _this;
    }
    TimeTravel.prototype.activatePower = function () {
        this.gridLogic.power();
    };
    TimeTravel.prototype.getPowerConfiguration = function () {
        this.bugInfo = this.gridLogic.getPowerInfo();
        return this.bugInfo;
    };
    return TimeTravel;
}(Grid_1.default));
exports.default = TimeTravel;
