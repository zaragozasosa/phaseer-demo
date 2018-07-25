import GameboardUI from './../GameboardUI'
import GameboardConfig from './../../../Config/GameboardConfig';


export default class BossGameUI extends GameboardUI {
  constructor(gameboardConfig: GameboardConfig) {
    super(gameboardConfig);
    this.gameboardConfig.arraySize = this.gameboardConfig.bossArraySize;
  }

  create(timer: Phaser.Timer, pauseCallback: any) {
    this.addHeader();    
    this.addMenuButton(pauseCallback);
  }

  protected addHeader() {
    this.header = this.tools.text.make(20, 20, '', 50);
    this.tools.tween.appear(this.header);

    this.updateHeader();
  }

  protected updateHeader() {
    this.header.setText(`Score: ${this.points}`);
  }

  update(points) {
    this.points = points;
    this.updateHeader();
  }
}
