import Base from './../../Base';
import Grid from './Grid';
import GridFactory from './Factories/GridFactory';
import GameboardConfig from './../../Config/GameboardConfig';
import GameboardUI from './GameboardUI';
import PlayerUI from './PlayerUI';
import InputManager from './../../InputManager';
import { ColorSettings } from './../../Config/Config';

export default abstract class Gameboard extends Base {
  protected grid: Grid;
  protected gameboardConfig: GameboardConfig;
  protected input: InputManager;
  protected showOnce: boolean;
  protected gameOver: boolean;
  protected wonGame: boolean;
  protected gameStarted: boolean;
  protected gameboardUI: GameboardUI;
  protected playerUI: PlayerUI;

  points: number;
  movements: number;
  timer: Phaser.Timer;
  background: Phaser.Sprite;
  isPaused: boolean;

  constructor(
    gameboardConfig: GameboardConfig,
    gameboardUI: GameboardUI,
    playerUI: PlayerUI
  ) {
    super();
    this.gameboardUI = gameboardUI;
    this.playerUI = playerUI;

    this.gameStarted = false;
    this.isPaused = false;
    this.movements = 0;
    this.showOnce = true;
    this.gameboardConfig = gameboardConfig;
    this.tools.graphic.addBackground();
    let backId = this.gameboardConfig.mainTile.power.backgroundId;
    this.background = this.tools.sprite.createBackground(backId);

    this.gameOver = false;
    this.wonGame = false;
    let updateScoreSignal = new Phaser.Signal();
    updateScoreSignal.add(
      function(addToMovement) {
        this.updateScore(addToMovement);
      }.bind(this)
    );

    let toggleButtonSignal = new Phaser.Signal();
    toggleButtonSignal.add(
      function(status) {
        this.toggleButton(status);
      }.bind(this)
    );

    let gameoverSignal = new Phaser.Signal();
    gameoverSignal.add(
      function(win) {
        this.gameover(win);
      }.bind(this)
    );

    this.gameboardConfig.toggleButtonSignal = toggleButtonSignal;
    this.gameboardConfig.updateScoreSignal = updateScoreSignal;
    this.gameboardConfig.gameOverSignal = gameoverSignal;
    this.gameboardConfig.clickTileSignal = new Phaser.Signal();
    this.gameboardConfig.mergeTileSignal = new Phaser.Signal();
    this.gameboardConfig.updateAmmoSignal = new Phaser.Signal();
    this.gameboardConfig.chargeSignal = new Phaser.Signal();
    this.gameboardConfig.cooldownSignal = new Phaser.Signal();
    this.gameboardConfig.turnsSignal = new Phaser.Signal();
    this.config.storyboard.optionClickSignal = new Phaser.Signal();
  }

  private updateScore(addToMovement = true) {
    if (addToMovement) {
      this.movements++;
    }

    this.points = this.grid.calculatePoints();
  }

  start() {
    this.createGrid();
    this.createPlayerUI();
  }

  protected createGameboardUI() {
    this.gameboardUI.create(
      this.timer,
      function() {
        if (!this.isPaused) {
          this.pausetoggle();
        }
      }.bind(this)
    );
  }

  protected createPlayerUI() {
    this.playerUI.create(
      function() {
        if (!this.isPaused) {
          this.activatePower();
        }
      }.bind(this)
    );
  }

  protected createGrid() {
    this.grid = GridFactory.create(this.gameboardConfig);
    this.timer = this.tools.misc.createTimer();
    this.points = this.grid.calculatePoints();
    this.input = new InputManager(this.config);
    this.gameStarted = true;
    // this.debugWin();

    this.createGameboardUI();
  }

  update() {
    if (!this.gameStarted) {
      return;
    }

    let cursor;
    if (!this.gameOver) {
      this.gameboardUI.update(this.points);

      if (this.input.checkEscape()) {
        this.pausetoggle();
        return;
      } else if (!this.isPaused) {
        cursor = this.input.checkCursor();
        this.grid.update(cursor);
        return;
      }
    }

    let enter = this.input.checkEnter();
    if (this.wonGame) {
      if (enter || this.input.checkClick()) {
        if (this.config.storyboard.windowActionSignal) {
          this.config.storyboard.windowActionSignal.dispatch();
        }
      }
      return;
    }

    cursor = this.input.checkCursor();
    if (cursor) {
      this.config.storyboard.menuInputSignal.dispatch(cursor);
    } else if (enter) {
      this.config.storyboard.menuInputSignal.dispatch(Phaser.Keyboard.ENTER);
    }
  }

  activatePower() {
    if (this.gameOver) {
      return;
    }
    this.playerUI.activatePower();
    this.grid.activatePower();
  }

  gameover(win: boolean) {
    this.gameOver = true;
    if (win) {
      this.wonGame = true;
      let nextState = this.gameboardConfig.playStory ? 'Story' : 'MainMenu';
      this.gameboardUI.winScreen(nextState);
    } else {
      this.gameboardUI.gameOverScreen();
    }
  }

  protected showMessage(
    message: string,
    size: number,
    color = ColorSettings.TEXT,
    delay = 1500
  ) {
    this.gameboardUI.showMessage(message, size, color, delay);
  }

  protected toggleButton(buttonStatus: number) {
    if (this.gameOver) {
      return;
    }

    this.playerUI.toggleButton(buttonStatus);
  }

  private pausetoggle() {
    if (this.isPaused) {
      this.gameboardUI.unpause();
      this.isPaused = false;
      this.timer.resume();
    } else {
      this.gameboardUI.pause(() => this.pausetoggle());
      this.isPaused = true;
      this.timer.pause();
    }
  }

  // private debugWin() {
  //   let win = this.tools.text.makeXBounded(1350, 'Click to win', 30, 'right');
  //   win.inputEnabled = true;
  //   win.events.onInputDown.addOnce(
  //     function () {
  //       this.gameover(true);
  //     }.bind(this)
  //   );

  //   let lose = this.tools.text.makeXBounded(150, 'Click to lose ', 30, 'right');
  //   lose.inputEnabled = true;
  //   lose.events.onInputDown.addOnce(
  //     function () {
  //       this.gameover(false);
  //     }.bind(this)
  //   );
  // }
}
