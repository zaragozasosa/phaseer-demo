import { Singleton } from './../Config/Config';
import GameboardConfig from './../Config/GameboardConfig';
import InfoWindow from './../Objects/Windows/InfoWindow';
import InputManager from './../InputManager';

export default class GameboardLoader extends Phaser.State {
  preloadBar: Phaser.Sprite;
  gameboardConfig: GameboardConfig;
  private cursor: InputManager;
  
  init(gameboardConfig: GameboardConfig) {
    this.gameboardConfig = gameboardConfig;
  }

  preload() {
    let singleton = Singleton.get();
    let tools = singleton.tools;
    let window = new InfoWindow(this.gameboardConfig.mainTile);
    window.show();

    this.preloadBar = tools.sprite.makeCentered(900, 'preloadBar', 2);
    this.load.setPreloadSprite(this.preloadBar);

    this.load.image('bullet', 'assets/images/bullet.png');
    this.load.image('dice', 'assets/images/dice.png');
    this.load.image('diamond', 'assets/images/diamond.png');

    this.load.image('volume-0', 'assets/images/volume-0.png');
    this.load.image('volume-1', 'assets/images/volume-1.png');
    this.load.image('volume-2', 'assets/images/volume-2.png');

    this.load.spritesheet('power', 'assets/images/power.png', 249, 93);

    this.load.image('witch', 'assets/images/witch.jpeg');

    this.cursor = new InputManager(Singleton.get().config);    
  }

  create() {
    this.preloadBar.kill();
  }

  update() {
    if (this.game.input.activePointer.isDown) {
      this.state.start('Unranked', true, false, this.gameboardConfig);
    }

    if(this.cursor.checkKeys()) {
      this.state.start('Unranked', true, false, this.gameboardConfig);
    }
  }
}
