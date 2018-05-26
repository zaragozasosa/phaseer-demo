import Factory from './Base/Factory';
export default class AudioFactory extends Factory {
  playSound(id: string, volume = 1, loop = false) {
    this.game.sound.play(id, volume, loop);
  }
}
