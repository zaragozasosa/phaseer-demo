"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PowerModel = (function () {
    function PowerModel(id, name, description, backgroundId, requeriments) {
        if (requeriments === void 0) { requeriments = null; }
        this.id = id;
        this.name = name;
        this.description = description;
        this.requeriments = requeriments;
        this.backgroundId = backgroundId;
    }
    return PowerModel;
}());
exports.default = PowerModel;
