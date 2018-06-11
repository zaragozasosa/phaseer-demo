"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DiamondModel = (function () {
    function DiamondModel(id, requiredDiamonds, cooldown, endText, scale, paddingX) {
        if (cooldown === void 0) { cooldown = false; }
        if (endText === void 0) { endText = ''; }
        if (scale === void 0) { scale = 1; }
        if (paddingX === void 0) { paddingX = 0; }
        this.id = id;
        this.requiredDiamonds = requiredDiamonds;
        this.cooldown = cooldown;
        this.endText = endText;
        this.scale = scale;
        this.paddingX = paddingX;
    }
    return DiamondModel;
}());
exports.default = DiamondModel;
