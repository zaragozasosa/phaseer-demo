"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SpritesLoader = (function () {
    function SpritesLoader() {
    }
    SpritesLoader.prototype.loadResources = function (loader, config) {
        for (var _i = 0, _a = config.tiles; _i < _a.length; _i++) {
            var sprite = _a[_i];
            var path = "assets/images/" + sprite.imagePath;
            loader.spritesheet(sprite.id, path, 180, 180);
        }
    };
    return SpritesLoader;
}());
exports.default = SpritesLoader;
