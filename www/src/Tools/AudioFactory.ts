import Factory from './Base/Factory';
import TileModel from './../Models/TileModel';
import GameboardConfig from './../Config/GameboardConfig';
import { Config } from './../Config/Config';

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
      function() {
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

  play(id: string, loop = true) {
    let config = this.config.sound;
    if (config.bgm) {
      config.bgm.stop();
      config.bgm.destroy();
    }

    let music = this.game.add.audio(id);
    config.bgm = music.play('', 0, config.bgmVolume, loop);
  }

  changeAudioLevel(sprite: Phaser.Sprite) {
    let config = this.config.sound;
    if (config.bgmVolume === 1 && config.sfxVolume === 1) {
      sprite.loadTexture(`${config.volumeSprite}-1`);      
      config.sfxVolume = 0;
    } else if (config.bgmVolume === 1) {
      sprite.loadTexture(`${config.volumeSprite}-2`);      
      config.bgmVolume = 0;
      config.bgm.volume = config.bgmVolume;      
    } else {
      sprite.loadTexture(`${config.volumeSprite}-0`);      
      config.sfxVolume = 1;
      config.bgmVolume = 1;
      config.bgm.volume = config.bgmVolume;      
    }
  }

  playCharacterSound(tile: TileModel) {
    let audio = this.config.sound;
    if (audio.sfxVolume) {
      this.game.sound.play(tile.sfxLabel, audio.sfxVolume * tile.sfxVolume, false);
    }
  }
}
