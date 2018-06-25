"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SpriteActionModel = (function () {
    function SpriteActionModel(id, frame, position, tint, alpha) {
        if (alpha === void 0) { alpha = 1; }
        this.id = id;
        this.frame = frame;
        this.position = position;
        this.alpha = alpha;
        this.tint = tint;
    }
    return SpriteActionModel;
}());
exports.default = SpriteActionModel;
