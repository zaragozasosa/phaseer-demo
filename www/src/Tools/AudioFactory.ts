import Factory from './Base/Factory';
import TileModel from './../Models/TileModel';
import GameboardConfig from './../Config/GameboardConfig';
import { Config } from './../Config/Config';
import MenuObject from './../Objects/Menu/MenuObject';

export default class AudioFactory extends Factory {
  playSound(id: string, loop = false) {
    let config = this.config.sound;
    this.game.sound.play(id, config.sfxVolume, loop);
  }

  playTwoSounds(gameConfig: GameboardConfig) {
    let audio = this.config.sound;
    if (audio.sfxVolume === 0) {
      return false;
    }

    this.playCharacterSound(gameConfig.mainTile);

    this.game.time.events.add(
      500,
      function () {
        if (gameConfig.mainTile.friendId) {
          this.playCharacterSound(
            gameConfig.tiles.find(x => x.id === gameConfig.mainTile.friendId)
          );
        } else {
          this.playCharacterSound(gameConfig.mainTile);
        }
      }.bind(this)
    );
  }

  playIfSilent(id: string, loop = false) {
    let config = this.config.sound;
    if (!config.bgm || !config.bgm.isPlaying) {
      this.play(id, loop);
    }
  }

  play(id: string, loop = false) {
    let config = this.config.sound;
    if (config.bgm && config.bgm.isPlaying) {
      config.bgm.destroy(true);
      config.bgm = null;
    }

    config.bgm = this.game.add.audio(id + '-intro');
    config.bgm.play('', 0 , config.bgmVolume).onStop.addOnce(
      function() {
        config.bgm = this.game.add.audio(id);
        config.bgm.play('', 3000 , config.bgmVolume, loop);
      }.bind(this)
    );
  }

  playNormal(id: string, loop = false) {
    let config = this.config.sound;
    if (config.bgm && config.bgm.isPlaying) {
      config.bgm.destroy(true);
      config.bgm = null;
    }

    config.bgm = this.game.add.audio(id);
    config.bgm.play('', 0 , config.bgmVolume, loop);
  }

  stopBgm() {
    let config = this.config.sound;
    if (config.bgm) {
      config.bgm.onStop.removeAll();
      config.bgm.fadeOut(1000);
    }
  }

  changeAudioLevel(sprite: Phaser.Sprite = null) {
    let config = this.config.sound;
    let spriteId;
    if (config.bgmVolume === 1 && config.sfxVolume === 1) {
      spriteId = `${config.volumeSprite}-1`;
      config.sfxVolume = 0;
    } else if (config.bgmVolume === 1) {
      spriteId = `${config.volumeSprite}-2`;
      config.bgmVolume = 0;
      config.bgm.volume = config.bgmVolume;
    } else {
      spriteId = `${config.volumeSprite}-0`;
      config.sfxVolume = 1;
      config.bgmVolume = 1;
      config.bgm.volume = config.bgmVolume;
    }

    if (sprite) {
      sprite.loadTexture(spriteId);
    }
  }

  playCharacterSound(tile: TileModel) {
    let audio = this.config.sound;
    if (audio.sfxVolume) {
      this.game.sound.play(
        tile.sfxLabel,
        audio.sfxVolume * tile.sfxVolume,
        false
      );
    }
  }

  playBeep() {
    this.playSound('beep');
  }

  getAudioConfigLabel() {
    let audio = this.config.sound;
    if (audio.bgmVolume === 1 && audio.sfxVolume === 1) {
      return 'Normal';
    } else if (audio.bgmVolume === 1) {
      return 'BGM Only';
    } else {
      return 'Mute';
    }
  }

  makeVolumeMenuOption() {
    let audioTools = this;

    return new MenuObject(
      `Audio: ${audioTools.getAudioConfigLabel()}`,
      function () {
        audioTools.changeAudioLevel();
        this.changeLabel(`Audio: ${audioTools.getAudioConfigLabel()}`);
      }
    );
  }
}
