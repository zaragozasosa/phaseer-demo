"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TileModel = (function () {
    function TileModel(id, name, fullName, friendId, sfxId, sfxVolume, powerId, power, summary, playable, gridX, gridY) {
        if (playable === void 0) { playable = true; }
        if (gridX === void 0) { gridX = 0; }
        if (gridY === void 0) { gridY = 0; }
        this.id = id;
        this.name = name;
        this.fullName = fullName;
        this.friendId = friendId;
        this.sfxId = sfxId;
        this.sfxVolume = sfxVolume;
        this.powerId = powerId;
        this.power = power;
        this.summary = summary;
        this.playable = playable;
    }
    Object.defineProperty(TileModel.prototype, "sfxRoute", {
        get: function () {
            return this.id + '-' + this.sfxId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileModel.prototype, "sfxLabel", {
        get: function () {
            return this.id + '-sfx';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileModel.prototype, "friendSfxLabel", {
        get: function () {
            return this.friendId + '-sfx';
        },
        enumerable: true,
        configurable: true
    });
    return TileModel;
}());
exports.default = TileModel;
