import GameboardUI from './../GameboardUI';
import GameboardConfig from './../../../Config/GameboardConfig';
import Grid from './../Grid';
import GameboardState from './../../../Models/GameboardState';
import GameOverWindow from './../../Windows/GameOverWindow';
import PowerWindow from './../../Windows/PowerWindow';
import TileModel from './../../../Models/TileModel';

export default class BossGameUI extends GameboardUI {
  private boss: TileModel;
  private bossPortrait: Phaser.Sprite;

  constructor(gameboardConfig: GameboardConfig) {
    super(gameboardConfig);
    var bossId = 'mira-boss';
    this.gameboardConfig.arraySize = this.gameboardConfig.bossArraySize;
    this.boss = this.gameboardConfig.fullList.filter(x => x.id === bossId)[0];
  }

  drawBackground() {
    this.tools.graphic.addBackground();
    return this.tools.sprite.createBackground(this.boss.power.backgroundId);
  }

  create(timer: Phaser.Timer, pauseCallback: any) {
    this.addHeader();
    this.addMenuButton(pauseCallback);
  }

  update(grid: Grid) {
    this.points = grid.alternativeScore;
    this.updateHeader();
  }

  protected addHeader() {
    this.bossPortrait = this.tools.sprite.createFromSpriteSheet(
      20,
      0,
      this.boss.spriteId,
      0,
      1.4
    );

    this.header = this.tools.text.make(300, 40, '', 45);
    this.tools.tween.appear(this.header);
    this.tools.tween.appear(this.bossPortrait);

    this.updateHeader();
  }

  protected updateHeader() {
    this.header.setText(`Boss score: ${this.points}`);
  }

  gameOverScreen(gameState: GameboardState) {
    gameState.userControl = false;
    debugger;
    this.tools.audio.playCharacterSound(this.boss);
    new PowerWindow(this.boss);

    setTimeout(
      function() {
        gameState.userControl = true;
        new GameOverWindow(
          this.gameboardConfig.mainTile,
          () => this.tools.transition.restartState(this.gameboardConfig),
          () =>
            this.tools.transition.toLoaderConfig(
              'MainMenu',
              this.gameboardConfig
            )
        );
      }.bind(this),
      2250
    );
  }
}
