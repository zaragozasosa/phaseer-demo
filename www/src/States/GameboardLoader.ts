import { Singleton, Config, Tools } from './../Config/Config';
import GameboardConfig from './../Config/GameboardConfig';
import InfoWindow from './../Objects/Windows/InfoWindow';
import InputManager from './../InputManager';

export default class GameboardLoader extends Phaser.State {
  preloadBar: Phaser.Sprite;
  gameboardConfig: GameboardConfig;
  private cursor: InputManager;
  private tools: Tools;
  init(gameboardConfig: GameboardConfig) {
    this.gameboardConfig = gameboardConfig;
  }

  preload() {
    let singleton = Singleton.get();
    this.tools = singleton.tools;
    let window = new InfoWindow(this.gameboardConfig.mainTile);
    window.show();

    this.preloadBar = this.tools.sprite.makeCentered(1000, 'preloadBar', 2);
    this.game.load.audio('game-bgm', ['assets/audio/number-crunching.mp3']);

    this.load.setPreloadSprite(this.preloadBar);

    this.load.image('bullet', 'assets/images/bullet.png');
    this.load.image('dice', 'assets/images/dice.png');
    this.load.image('diamond', 'assets/images/diamond.png');

    this.load.image('volume-0', 'assets/images/volume-0.png');
    this.load.image('volume-1', 'assets/images/volume-1.png');
    this.load.image('volume-2', 'assets/images/volume-2.png');

    this.load.spritesheet('power', 'assets/images/power.png', 249, 93);

    this.load.image('witch', 'assets/images/witch.jpeg');
    this.load.image('menu', 'assets/images/menu.png');
    this.load.image('blue', 'assets/images/blue.png');
    this.load.image('bug', 'assets/images/bug.png');

    this.cursor = new InputManager(Singleton.get().config);
  }

  create() {
    this.preloadBar.kill();
    this.tools.audio.stopBgm();
  }

  update() {
    if (this.cursor.checkClick() || this.cursor.checkKeys()) {
      this.tools.audio.play('game-bgm', true);
      this.state.start('Unranked', true, false, this.gameboardConfig);
    }
  }
}
