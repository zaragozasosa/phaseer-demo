import { Singleton } from './../Config/Config';
export default class Preloader extends Phaser.State {
  preloadBar: Phaser.Sprite;

  preload() {
    let singleton = Singleton.get();
    let tools = singleton.tools;

    this.preloadBar = tools.sprite.makeCentered(300, 'preloadBar', 2);
    this.load.setPreloadSprite(this.preloadBar);

    this.load.image('title', 'assets/images/concept.png');
    this.game.load.audio('bgm', ['assets/audio/Puzzle-Action-2.mp3']);

    this.load.audio('beep', 'assets/sfx/beep.wav');

    this.load.image('start-1', 'assets/images/start-1.png');
    this.load.image('start-2', 'assets/images/start-2.png');
    this.load.image('start-3', 'assets/images/start-3.png');
    this.load.image('frame', 'assets/images/frame.png');

    this.load.image('volume-0', 'assets/images/volume-0.png');
    this.load.image('volume-1', 'assets/images/volume-1.png');
    this.load.image('volume-2', 'assets/images/volume-2.png');

    this.load.spritesheet('button-mayo', 'assets/images/button-mayo.png', 480, 180);
    
    
  }

  create() {
    this.game.state.start('MainMenu');
  }
}
