"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PowerModel = (function () {
    function PowerModel(id, name, description, requeriments, backgroundId) {
        if (requeriments === void 0) { requeriments = null; }
        if (backgroundId === void 0) { backgroundId = 'witch'; }
        this.id = id;
        this.name = name;
        this.description = description;
        this.requeriments = requeriments;
        this.backgroundId = backgroundId;
    }
    return PowerModel;
}());
exports.default = PowerModel;
