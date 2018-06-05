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
var AudioFactory = (function (_super) {
    __extends(AudioFactory, _super);
    function AudioFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AudioFactory.prototype.playSound = function (id, loop) {
        if (loop === void 0) { loop = false; }
        var config = this.config.sound;
        var vol = config.volumeLevels[config.actualVolumeIndex];
        this.game.sound.play(id, config.sfxVolume * vol, loop);
    };
    AudioFactory.prototype.playTwoSounds = function (gameConfig) {
        var config = this.config.sound;
        var vol = config.volumeLevels[config.actualVolumeIndex];
        this.game.sound.play(gameConfig.mainTile.sfxLabel, config.sfxVolume * vol);
        this.game.time.events.add(500, function () {
            if (gameConfig.mainTile.friendId) {
                this.game.sound.play(gameConfig.mainTile.friendSfxLabel, config.sfxVolume * vol);
            }
            else {
                this.game.sound.play(gameConfig.mainTile.sfxLabel, config.sfxVolume * vol);
            }
        }.bind(this));
    };
    AudioFactory.prototype.play = function (id, loop) {
        if (loop === void 0) { loop = true; }
        var config = this.config.sound;
        if (config.bgm) {
            config.bgm.stop();
            config.bgm.destroy();
        }
        var music = this.game.add.audio(id);
        var vol = config.volumeLevels[config.actualVolumeIndex];
        config.bgm = music.play('', 0, config.bgmVolume * vol, loop);
    };
    AudioFactory.prototype.changeAudioLevel = function (sprite) {
        var config = this.config.sound;
        var nextIndex = (config.actualVolumeIndex + 1) % config.volumeLevels.length;
        config.actualVolumeIndex = nextIndex;
        sprite.loadTexture(config.volumeSprite + '-' + nextIndex);
        if (config.bgm) {
            var vol = config.volumeLevels[config.actualVolumeIndex];
            config.bgm.volume = config.bgmVolume * vol;
        }
    };
    return AudioFactory;
}(Factory_1.default));
exports.default = AudioFactory;
