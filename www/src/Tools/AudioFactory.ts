import Factory from './Base/Factory';
import GameboardConfig from './../Config/GameboardConfig';
import { Config } from './../Config/Config';

export default class AudioFactory extends Factory {
  playSound(id: string, loop = false) {
    let config = this.config.sound;
    let vol = config.volumeLevels[config.actualVolumeIndex];
    this.game.sound.play(id, config.sfxVolume * vol, loop);
  }

  playTwoSounds(gameConfig: GameboardConfig) {
    let config = this.config.sound;
    let vol = config.volumeLevels[config.actualVolumeIndex];
    this.game.sound.play(gameConfig.mainTile.sfxLabel, config.sfxVolume * vol);

    this.game.time.events.add(
      500,
      function() {
        if (gameConfig.mainTile.friendId) {
          this.game.sound.play(
            gameConfig.mainTile.friendSfxLabel,
            config.sfxVolume * vol
          );
        } else {
          this.game.sound.play(
            gameConfig.mainTile.sfxLabel,
            config.sfxVolume * vol
          );
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
    let vol = config.volumeLevels[config.actualVolumeIndex];
    config.bgm = music.play('', 0, config.bgmVolume * vol, loop);
  }

  changeAudioLevel(sprite: Phaser.Sprite) {
    let config = this.config.sound;
    let nextIndex = (config.actualVolumeIndex + 1) % config.volumeLevels.length;
    config.actualVolumeIndex = nextIndex;
    sprite.loadTexture(config.volumeSprite + '-' + nextIndex);
    if (config.bgm) {
      let vol = config.volumeLevels[config.actualVolumeIndex];
      config.bgm.volume = config.bgmVolume * vol;
    }
  }
}
