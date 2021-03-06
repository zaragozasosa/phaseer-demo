"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MainMenuLoader = (function () {
    function MainMenuLoader() {
    }
    MainMenuLoader.prototype.loadResources = function (loader) {
        loader.audio('title-bgm', ['assets/audio/meet-the-cast.ogg']);
        loader.audio('title-bgm-intro', ['assets/audio/meet-the-cast-intro.ogg']);
        loader.audio('beep', 'assets/sfx/beep.wav');
    };
    return MainMenuLoader;
}());
exports.default = MainMenuLoader;
