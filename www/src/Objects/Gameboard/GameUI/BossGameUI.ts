import GameboardUI from './../GameboardUI';
import GameboardConfig from './../../../Config/GameboardConfig';
import Grid from './../Grid';

export default class BossGameUI extends GameboardUI {
  private bossId: string;
  private bossPortrait: Phaser.Sprite;
  constructor(gameboardConfig: GameboardConfig) {
    super(gameboardConfig);
    this.gameboardConfig.arraySize = this.gameboardConfig.bossArraySize;
    this.bossId = 'mira';
  }

  drawBackground() {
    this.tools.graphic.addBackground();
    let boss = this.gameboardConfig.tiles.filter(x => x.id === this.bossId);
    return this.tools.sprite.createBackground(boss[0].power.backgroundId);
  }

  create(timer: Phaser.Timer, pauseCallback: any) {
    this.addHeader();
    this.addMenuButton(pauseCallback);
  }

  update(grid: Grid) {
    this.points = grid.points;
    this.updateHeader();
  }

  protected addHeader() {
    this.bossPortrait = this.tools.sprite.createFromSpriteSheet(
      20,
      0,
      this.bossId,
      0,
      1.4
    );

    this.header = this.tools.text.make(300, 40, '', 45);
    this.tools.tween.appear(this.header);
    this.tools.tween.appear(this.bossPortrait);
    
    this.updateHeader();
  }

  protected updateHeader() {
    this.header.setText(`Score: 2\nBoss score: ${this.points}\nNext attack: 3 turns`);

  }
}
