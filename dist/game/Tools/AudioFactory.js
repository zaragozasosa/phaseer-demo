"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = require("./Base/Factory");
var MenuObject_1 = require("./../Objects/Menu/MenuObject");
var AudioFactory = (function (_super) {
    __extends(AudioFactory, _super);
    function AudioFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AudioFactory.prototype.playSound = function (id, loop) {
        if (loop === void 0) { loop = false; }
        var config = this.config.sound;
        this.game.sound.play(id, config.sfxVolume, loop);
    };
    AudioFactory.prototype.playTwoSounds = function (gameConfig) {
        var audio = this.config.sound;
        if (audio.sfxVolume === 0) {
            return false;
        }
        this.playCharacterSound(gameConfig.mainTile);
        this.game.time.events.add(500, function () {
            if (gameConfig.mainTile.friendId) {
                this.playCharacterSound(gameConfig.tiles.find(function (x) { return x.id === gameConfig.mainTile.friendId; }));
            }
            else {
                this.playCharacterSound(gameConfig.mainTile);
            }
        }.bind(this));
    };
    AudioFactory.prototype.playIfSilent = function (id, loop) {
        if (loop === void 0) { loop = false; }
        var config = this.config.sound;
        if (!config.bgm || !config.bgm.isPlaying) {
            this.play(id, loop);
        }
    };
    AudioFactory.prototype.play = function (id, loop) {
        if (loop === void 0) { loop = false; }
        var config = this.config.sound;
        if (config.bgm && config.bgm.isPlaying) {
            config.bgm.destroy(true);
            config.bgm = null;
        }
        config.bgm = this.game.add.audio(id + '-intro');
        config.bgm.play('', 0, config.bgmVolume).onStop.addOnce(function () {
            config.bgm = this.game.add.audio(id);
            config.bgm.play('', 0, config.bgmVolume, loop);
        }.bind(this));
    };
    AudioFactory.prototype.playNormal = function (id, loop) {
        if (loop === void 0) { loop = false; }
        var config = this.config.sound;
        if (config.bgm && config.bgm.isPlaying) {
            config.bgm.destroy(true);
            config.bgm = null;
        }
        config.bgm = this.game.add.audio(id);
        config.bgm.play('', 0, config.bgmVolume, loop);
    };
    AudioFactory.prototype.stopBgm = function () {
        var config = this.config.sound;
        if (config.bgm) {
            config.bgm.onStop.removeAll();
            config.bgm.fadeOut(1000);
        }
    };
    AudioFactory.prototype.changeAudioLevel = function (sprite) {
        if (sprite === void 0) { sprite = null; }
        var config = this.config.sound;
        var spriteId;
        if (config.bgmVolume === 1 && config.sfxVolume === 1) {
            spriteId = config.volumeSprite + "-1";
            config.sfxVolume = 0;
        }
        else if (config.bgmVolume === 1) {
            spriteId = config.volumeSprite + "-2";
            config.bgmVolume = 0;
            config.bgm.volume = config.bgmVolume;
        }
        else {
            spriteId = config.volumeSprite + "-0";
            config.sfxVolume = 1;
            config.bgmVolume = 1;
            config.bgm.volume = config.bgmVolume;
        }
        if (sprite) {
            sprite.loadTexture(spriteId);
        }
    };
    AudioFactory.prototype.playCharacterSound = function (tile) {
        var audio = this.config.sound;
        if (audio.sfxVolume) {
            this.game.sound.play(tile.sfxLabel, audio.sfxVolume * tile.sfxVolume, false);
        }
    };
    AudioFactory.prototype.playBeep = function () {
        this.playSound('beep');
    };
    AudioFactory.prototype.getAudioConfigLabel = function () {
        var audio = this.config.sound;
        if (audio.bgmVolume === 1 && audio.sfxVolume === 1) {
            return 'Normal';
        }
        else if (audio.bgmVolume === 1) {
            return 'BGM Only';
        }
        else {
            return 'Mute';
        }
    };
    AudioFactory.prototype.makeVolumeMenuOption = function () {
        var audioTools = this;
        return new MenuObject_1.default("Audio: " + audioTools.getAudioConfigLabel(), function () {
            audioTools.changeAudioLevel();
            this.changeLabel("Audio: " + audioTools.getAudioConfigLabel());
        });
    };
    return AudioFactory;
}(Factory_1.default));
exports.default = AudioFactory;
