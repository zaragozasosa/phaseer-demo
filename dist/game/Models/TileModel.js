"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TileModel = (function () {
    function TileModel(id, name, fullName, friendId, sfxId, sfxVolume, powerId, power, firstStory, secondStory, summary, isMenuVisible, menuFriendId, isRealTile) {
        if (isMenuVisible === void 0) { isMenuVisible = true; }
        if (menuFriendId === void 0) { menuFriendId = null; }
        if (isRealTile === void 0) { isRealTile = true; }
        this.id = id;
        this.name = name;
        this.fullName = fullName;
        this.friendId = friendId;
        this.sfxId = sfxId;
        this.sfxVolume = sfxVolume;
        this.powerId = powerId;
        this.power = power;
        this.summary = summary;
        this.isMenuVisible = isMenuVisible;
        this.getFirstStory = firstStory;
        this.getSecondStory = secondStory;
        this.menuFriendId = menuFriendId;
        this.isRealTile = isRealTile;
    }
    Object.defineProperty(TileModel.prototype, "specialId", {
        get: function () {
            return this.id + '-special';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileModel.prototype, "getMenuFriendId", {
        get: function () {
            return this.menuFriendId ? this.menuFriendId : this.friendId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileModel.prototype, "friendSpecialId", {
        get: function () {
            return this.friendId + '-special';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileModel.prototype, "sfxRoute", {
        get: function () {
            return this.id + '-' + this.sfxId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileModel.prototype, "negativeId", {
        get: function () {
            return this.id + '-negative';
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
    Object.defineProperty(TileModel.prototype, "imagePath", {
        get: function () {
            return "tiles/" + this.id + ".png";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileModel.prototype, "specialImagePath", {
        get: function () {
            return "tiles/" + this.specialId + ".png";
        },
        enumerable: true,
        configurable: true
    });
    return TileModel;
}());
exports.default = TileModel;
