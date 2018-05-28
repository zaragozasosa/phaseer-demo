import Factory from './Base/Factory';
export default class AudioFactory extends Factory {
  playSound(id: string, loop = false) {
    let config = this.config.sound;
    let vol = config.volumeLevels[config.actualVolumeIndex];
    this.game.sound.play(id, config.sfxVolume * vol, loop);
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
