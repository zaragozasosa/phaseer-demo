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
var DetectiveWorkLogic_1 = require("./../../Logic/PlayerLogic/DetectiveWorkLogic");
var OldDetectiveWork = (function (_super) {
    __extends(OldDetectiveWork, _super);
    function OldDetectiveWork(config) {
        var _this = this;
        var gridLogic = new DetectiveWorkLogic_1.default(config);
        _this = _super.call(this, config, gridLogic) || this;
        return _this;
    }
    return OldDetectiveWork;
}(Grid_1.default));
exports.default = OldDetectiveWork;
