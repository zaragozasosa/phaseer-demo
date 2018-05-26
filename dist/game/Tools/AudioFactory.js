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
var Factory_1 = require("./Base/Factory");
var AudioFactory = (function (_super) {
    __extends(AudioFactory, _super);
    function AudioFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AudioFactory.prototype.playSound = function (id, volume, loop) {
        if (volume === void 0) { volume = 1; }
        if (loop === void 0) { loop = false; }
        this.game.sound.play(id, volume, loop);
    };
    return AudioFactory;
}(Factory_1.default));
exports.default = AudioFactory;
