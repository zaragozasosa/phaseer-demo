"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DiamondModel = (function () {
    function DiamondModel(id, requiredDiamonds, cooldown, startText, endText) {
        if (cooldown === void 0) { cooldown = false; }
        if (startText === void 0) { startText = ''; }
        if (endText === void 0) { endText = ''; }
        this.id = id;
        this.requiredDiamonds = requiredDiamonds;
        this.cooldown = cooldown;
        this.startText = startText;
        this.endText = endText;
    }
    return DiamondModel;
}());
exports.default = DiamondModel;
