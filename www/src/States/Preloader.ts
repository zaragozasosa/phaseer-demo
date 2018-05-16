import { Singleton } from '../Config';
export default class Preloader extends Phaser.State {
  preloadBar: Phaser.Sprite;

  preload() {
    let singleton = Singleton.getInstance();
    let config = singleton.config;

    this.preloadBar = this.add.sprite(0, 0, 'preloadBar');
    this.load.setPreloadSprite(this.preloadBar);

    this.game.load.spritesheet('button', 'assets/images/button-mayo.png', 480, 180);

    for (let sprite of config.tileSettings.tiles) {
      let path = `assets/images/tiles/${sprite}.png`;
      let altPath = `assets/images/tiles/${sprite}_alt.png`;

      this.load.image(sprite, path);
      // this.load.image(`${sprite}_alt`, altPath);
    }

    this.game.load.audio('bgm', ['assets/audio/Mellow-Puzzler.mp3']);
  }

  create() {
    this.game.state.start('MainMenu');
  }
}
