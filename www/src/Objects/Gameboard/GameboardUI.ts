import Base from './../../Base';
import GameboardConfig from './../../Config/GameboardConfig';
import GameOverWindow from './../Windows/GameOverWindow';
import WinWindow from './../Windows/WinWindow';
import PauseWindow from './../Windows/PauseWindow';
import { ColorSettings } from './../../Config/Config';
import Grid from './Grid';

export default abstract class GameboardUI extends Base {
  protected gameboardConfig: GameboardConfig;
  protected header: Phaser.Text;
  protected points: number;
  protected timer: Phaser.Timer;
  protected timerMessage: Phaser.Text;
  protected pausedWindow: PauseWindow;

  constructor(gameboardConfig: GameboardConfig) {
    super();
    this.gameboardConfig = gameboardConfig;
  }

  drawBackground() {
    this.tools.graphic.addBackground();
    let backId = this.gameboardConfig.mainTile.power.backgroundId;
    debugger;
    return this.tools.sprite.createBackground(backId);
  }

  create(timer: Phaser.Timer, pauseCallback: any) {
    this.points = 0;
    this.timer = timer;
    this.addHeader();
    this.addMenuButton(pauseCallback);
    this.addTimer();
  }

  changeTimerColor(color) {
    if (this.timerMessage) {
      this.timerMessage.tint = color;
    }
  }

  showMessage(
    message: string,
    size: number,
    color = ColorSettings.TEXT,
    delay = 1500
  ) {
    let text = this.tools.text.makeXBounded(
      650,
      message,
      size,
      'center',
      color,
      true
    );

    this.tools.tween.vanishAndDestroy(
      text,
      { alpha: 0 },
      delay,
      'Linear',
      delay
    );
  }

  pause(callbackFunction: any) {
    this.pausedWindow = new PauseWindow(
      this.gameboardConfig.mainTile,
      () => callbackFunction(),
      function() {
        this.tools.transition.toLoaderConfig('MainMenu', this.gameboardConfig);
      }.bind(this)
    );
  }

  unpause() {
    this.pausedWindow.hideAndDestroy();
  }

  winScreen(nextState: string) {
    new WinWindow(this.gameboardConfig.mainTile, () =>
      this.tools.transition.toLoaderConfig(
        nextState,
        this.gameboardConfig,
        null,
        false
      )
    );
  }

  gameOverScreen() {
    new GameOverWindow(
      this.gameboardConfig.mainTile,
      () => this.tools.transition.restartState(this.gameboardConfig),
      () =>
        this.tools.transition.toLoaderConfig('MainMenu', this.gameboardConfig)
    );
  }

  protected addMenuButton(callbackFunction: any) {
    let menu = this.tools.sprite.createSprite(840, 30, 'menu', 0.8);
    menu.inputEnabled = true;

    menu.events.onInputDown.add(() => callbackFunction());

    this.tools.tween.appear(menu);
  }

  protected addHeader() {
    this.header = this.tools.text.make(20, 40, '', 50);
    this.tools.tween.appear(this.header);

    this.updateHeader();
  }

  protected updateHeader() {
    this.header.setText(`Score: ${this.points}`);
  }

  protected addTimer() {
    this.timerMessage = this.tools.text.make(20, 100, 'Time: 00:00', 50);
    this.tools.tween.appear(this.timerMessage).onComplete.addOnce(
      function() {
        this.timer.start();
      }.bind(this)
    );
  }

  protected updateTimer() {
    if (this.timer) {
      let min = Math.floor(this.timer.seconds / 60);
      let sec = Math.floor(this.timer.seconds - min * 60);
      this.timerMessage.setText(`Time: ${this.num(min)}:${this.num(sec)}`);
    }
  }

  private num(n) {
    return n > 9 ? '' + n : '0' + n;
  }

  update(grid: Grid) {
    this.points = grid.points;
    this.updateHeader();
    this.updateTimer();
  }}
