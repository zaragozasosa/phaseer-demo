import { Singleton } from './../Models/Config';
import SpriteFactory from './../Tools/SpriteFactory';
export default class Preloader extends Phaser.State {
  preloadBar: Phaser.Sprite;

  preload() {
    let singleton = Singleton.getInstance();
    let config = singleton.config;
    let spriteFactory = new SpriteFactory();

    this.preloadBar = spriteFactory.makeCentered(300, 'preloadBar', 2);
    this.load.setPreloadSprite(this.preloadBar);

    this.load.image('title', 'assets/images/concept.png');
    this.game.load.audio('bgm', ['assets/audio/Puzzle-Action-2.mp3']);

    this.load.audio('beep', 'assets/sfx/beep.wav');

    this.load.image('start-1', 'assets/images/start-1.png');
    this.load.image('start-2', 'assets/images/start-2.png');
    this.load.image('start-3', 'assets/images/start-3.png');
    this.load.image('frame', 'assets/images/frame.png');
  }

  create() {
    this.game.state.start('MainMenu');
  }
}
