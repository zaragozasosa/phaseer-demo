import { Singleton } from '../Config';
import SpriteFactory from './../Tools/SpriteFactory';
export default class Preloader extends Phaser.State {
  preloadBar: Phaser.Sprite;

  preload() {
    let singleton = Singleton.getInstance();
    let config = singleton.config;
    let spriteFactory = new SpriteFactory();

    this.preloadBar = spriteFactory.makeCentered(300, 'preloadBar', 2);
    this.load.setPreloadSprite(this.preloadBar);

    for (let sprite of config.gridSettings.tiles) {
      let path = `assets/images/tiles/${sprite.id}.png`;
      // let altPath = `assets/images/tiles/${sprite.id}_alt.png`;
      let sfx = `assets/sfx/${sprite.id}-${sprite.sfxId}`;

      this.load.image(sprite.id, path);
      this.load.audio(`${sprite.id}-sfx`, [sfx]);
      // this.load.image(`${sprite}_alt`, altPath);
    }

    this.load.image('title', 'assets/images/concept.png');
    this.game.load.audio('bgm', ['assets/audio/Puzzle-Action-2.mp3']);
  }

  create() {
    this.game.state.start('MainMenu');
  }
}
