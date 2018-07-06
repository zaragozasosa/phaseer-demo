"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CharacterSelectionLoader = (function () {
    function CharacterSelectionLoader(tiles) {
        this.tiles = tiles;
    }
    CharacterSelectionLoader.prototype.loadResources = function (loader) {
        loader.image('start-1', 'assets/images/start-1.png');
        loader.image('start-2', 'assets/images/start-2.png');
        loader.image('start-3', 'assets/images/start-3.png');
        loader.image('frame', 'assets/images/frame.png');
        loader.image('random', 'assets/images/tiles/random.png');
        loader.spritesheet('smith-sheet', 'assets/images/smith.png', 180, 180);
        loader.spritesheet('lily-sheet', 'assets/images/lily.png', 180, 180);
        for (var _i = 0, _a = this.tiles; _i < _a.length; _i++) {
            var sprite = _a[_i];
            var sfx = "assets/sfx/" + sprite.sfxRoute;
            loader.audio(sprite.sfxLabel, [sfx]);
        }
    };
    return CharacterSelectionLoader;
}());
exports.default = CharacterSelectionLoader;
