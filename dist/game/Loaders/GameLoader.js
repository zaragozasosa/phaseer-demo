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
        loader.audio('game-bgm', ['assets/audio/number-crunching.ogg']);
        loader.audio('game-bgm-intro', ['assets/audio/number-crunching-intro.ogg']);
        loader.spritesheet('power', 'assets/images/buttons/power.png', 249, 93);
        loader.spritesheet('sage', 'assets/images/buttons/sage.png', 249, 93);
        loader.spritesheet('ban', 'assets/images/buttons/ban.png', 249, 93);
        loader.spritesheet('report', 'assets/images/buttons/report.png', 249, 93);
    };
    return CharacterSelectionLoader;
}());
exports.default = CharacterSelectionLoader;
