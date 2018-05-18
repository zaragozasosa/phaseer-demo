"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tile = (function () {
    function Tile(id, name, fullName, friendId, sfxId, powerId, powerName, summary, gridX, gridY, playable) {
        if (gridX === void 0) { gridX = 0; }
        if (gridY === void 0) { gridY = 0; }
        if (playable === void 0) { playable = true; }
        this.id = id;
        this.name = name;
        this.fullName = fullName;
        this.friendId = friendId;
        this.sfxId = sfxId;
        this.powerId = powerId;
        this.powerName = powerName;
        this.summary = summary;
        this.gridX = gridX;
        this.gridY = gridY;
        this.playable = playable;
    }
    return Tile;
}());
exports.default = Tile;
