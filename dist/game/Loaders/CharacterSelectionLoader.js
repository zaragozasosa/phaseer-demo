"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CharacterSelectionLoader = (function () {
    function CharacterSelectionLoader(tiles) {
        this.tiles = tiles;
    }
    CharacterSelectionLoader.prototype.loadResources = function (loader) {
        loader.image('frame', 'assets/images/frame.png');
        loader.image('random', 'assets/images/tiles/random.png');
        loader.spritesheet('start', 'assets/images/start.png', 249, 93);
        for (var _i = 0, _a = this.tiles; _i < _a.length; _i++) {
            var sprite = _a[_i];
            var sfx = "assets/sfx/" + sprite.sfxRoute;
            loader.audio(sprite.sfxLabel, [sfx]);
        }
    };
    return CharacterSelectionLoader;
}());
exports.default = CharacterSelectionLoader;
