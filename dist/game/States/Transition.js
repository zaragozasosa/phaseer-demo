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
var Config_1 = require("./../Config/Config");
var LoadingScreen_1 = require("./../Objects/LoadingScreen");
var Transition = (function (_super) {
    __extends(Transition, _super);
    function Transition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Transition.prototype.init = function (gameboardConfig, callback, stopTrack, loader) {
        if (stopTrack === void 0) { stopTrack = false; }
        if (loader === void 0) { loader = null; }
        this.callback = callback;
        this.gameboardConfig = gameboardConfig;
        this.stopTrack = stopTrack;
        this.loader = loader;
    };
    Transition.prototype.preload = function () {
        var singleton = Config_1.Singleton.get();
        this.tools = singleton.tools;
        this.tools.graphic.addBackground();
        this.timer = this.tools.misc.createTimer();
        this.timer.start();
        if (this.loader) {
            this.loader.loadResources(this.game.load);
        }
        if (this.stopTrack) {
            this.tools.audio.stopBgm();
        }
        new LoadingScreen_1.default(this.gameboardConfig);
    };
    Transition.prototype.update = function () {
        if (this.timer.ms >= 1500) {
            this.callback();
        }
    };
    return Transition;
}(Phaser.State));
exports.default = Transition;
