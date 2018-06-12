"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DiamondModel = (function () {
    function DiamondModel(id, requiredDiamonds, cooldown, endText, scale, paddingX, type) {
        if (cooldown === void 0) { cooldown = false; }
        if (endText === void 0) { endText = ''; }
        if (scale === void 0) { scale = 1; }
        if (paddingX === void 0) { paddingX = 0; }
        if (type === void 0) { type = DiamondModel.DEFAULT_TYPE; }
        this.id = id;
        this.requiredDiamonds = requiredDiamonds;
        this.cooldown = cooldown;
        this.endText = endText;
        this.scale = scale;
        this.paddingX = paddingX;
        this.type = type;
    }
    DiamondModel.DEFAULT_TYPE = 1;
    DiamondModel.TIME_TYPE = 2;
    return DiamondModel;
}());
exports.default = DiamondModel;
