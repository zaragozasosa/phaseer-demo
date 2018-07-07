"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CharacterSelectionLoader = (function () {
    function CharacterSelectionLoader() {
    }
    CharacterSelectionLoader.prototype.loadResources = function (loader) {
        loader.image('bullet', 'assets/images/bullet.png');
        loader.image('dice', 'assets/images/dice.png');
        loader.image('diamond', 'assets/images/diamond.png');
        loader.image('witch', 'assets/images/witch.jpeg');
        loader.image('menu', 'assets/images/menu.png');
        loader.image('bug', 'assets/images/bug.png');
        loader.image('bullet', 'assets/images/bullet.png');
        loader.image('dice', 'assets/images/dice.png');
        loader.image('diamond', 'assets/images/diamond.png');
        loader.audio('game-bgm', ['assets/audio/number-crunching.mp3']);
        loader.audio('game-bgm-intro', ['assets/audio/number-crunching-intro.mp3']);
        loader.spritesheet('power', 'assets/images/power.png', 249, 93);
        loader.spritesheet('sage', 'assets/images/sage.png', 249, 93);
        loader.spritesheet('ban', 'assets/images/ban.png', 249, 93);
        loader.spritesheet('report', 'assets/images/report.png', 249, 93);
    };
    return CharacterSelectionLoader;
}());
exports.default = CharacterSelectionLoader;
