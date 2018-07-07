"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChargeModel = (function () {
    function ChargeModel(buttonId, positionX, callback) {
        this.callback = callback;
        this.buttonId = buttonId;
        this.positionX = positionX;
    }
    return ChargeModel;
}());
exports.default = ChargeModel;
