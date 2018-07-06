"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MainMenuLoader = (function () {
    function MainMenuLoader() {
    }
    MainMenuLoader.prototype.loadResources = function (loader) {
        loader.audio('test-bgm', ['assets/audio/Puzzle-Action-2.mp3']);
        loader.audio('title-bgm', ['assets/audio/meet-the-cast.mp3']);
        loader.audio('title-bgm-intro', ['assets/audio/meet-the-cast-intro.mp3']);
        loader.audio('beep', 'assets/sfx/beep.wav');
    };
    return MainMenuLoader;
}());
exports.default = MainMenuLoader;
