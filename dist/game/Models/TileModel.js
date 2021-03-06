"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TileModel = (function () {
    function TileModel(id, name, fullName, friendId, sfxId, sfxVolume, powerId, power, animationFrames, firstStory, secondStory, summary, isMenuVisible, menuFriendId, isRealTile, baseModelId) {
        if (isMenuVisible === void 0) { isMenuVisible = true; }
        if (menuFriendId === void 0) { menuFriendId = null; }
        if (isRealTile === void 0) { isRealTile = true; }
        if (baseModelId === void 0) { baseModelId = null; }
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
        this.baseModelId = baseModelId;
        this.animationFrames = animationFrames;
        this.animationSpeed = 1.5;
    }
    Object.defineProperty(TileModel.prototype, "spriteId", {
        get: function () {
            var id = this.baseModelId ? this.baseModelId : this.id;
            return id + '_sprite';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileModel.prototype, "menuFriendSpriteId", {
        get: function () {
            return this.menuFriendId ? this.menuFriendId + '_sprite' : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileModel.prototype, "friendSpriteId", {
        get: function () {
            return this.friendId ? this.friendId + '_sprite' : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileModel.prototype, "specialSpriteFrame", {
        get: function () {
            return 4;
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
    Object.defineProperty(TileModel.prototype, "getMenuFriendSpriteId", {
        get: function () {
            return this.menuFriendSpriteId
                ? this.menuFriendSpriteId
                : this.friendSpriteId;
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
            return this.spriteId + '-negative';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileModel.prototype, "sfxLabel", {
        get: function () {
            var id = this.baseModelId ? this.baseModelId : this.id;
            return id + '-sfx';
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
            return "characters/" + this.id + ".png";
        },
        enumerable: true,
        configurable: true
    });
    return TileModel;
}());
exports.default = TileModel;
