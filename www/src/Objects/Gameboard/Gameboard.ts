import Base from './../../Base';
import Grid from './Grid';
import GridFactory from './Factories/GridFactory';
import GameboardConfig from './../../Config/GameboardConfig';
import GameboardUI from './GameboardUI';
import PlayerUI from './PlayerUI';
import InputManager from './../../InputManager';
import GameboardState from './../../Models/GameboardState';
import { ColorSettings } from './../../Config/Config';

export default abstract class Gameboard extends Base {
  protected grid: Grid;
  protected gameboardConfig: GameboardConfig;
  protected input: InputManager;
  protected showOnce: boolean;
  protected gameboardUI: GameboardUI;
  protected playerUI: PlayerUI;;
  protected gameState: GameboardState

  points: number;
  movements: number;
  timer: Phaser.Timer;
  background: Phaser.Sprite;

  constructor(
    gameboardConfig: GameboardConfig,
    gameboardUI: GameboardUI,
    playerUI: PlayerUI
  ) {
    super();
    this.gameboardUI = gameboardUI;
    this.playerUI = playerUI;
    this.gameState = new GameboardState();
    this.movements = 0;
    this.showOnce = true;
    this.gameboardConfig = gameboardConfig;
    this.background = this.gameboardUI.drawBackground();

    let updateMovementsSignal = new Phaser.Signal();
    updateMovementsSignal.add(
      function() {
        this.updateMovements();
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
    this.gameboardConfig.updateMovementsSignal = updateMovementsSignal;
    this.gameboardConfig.gameOverSignal = gameoverSignal;
    this.gameboardConfig.clickTileSignal = new Phaser.Signal();
    this.gameboardConfig.mergeTileSignal = new Phaser.Signal();
    this.gameboardConfig.updateAmmoSignal = new Phaser.Signal();
    this.gameboardConfig.chargeSignal = new Phaser.Signal();
    this.gameboardConfig.cooldownSignal = new Phaser.Signal();
    this.gameboardConfig.turnsSignal = new Phaser.Signal();
    this.config.storyboard.optionClickSignal = new Phaser.Signal();
  }

  get isPaused() {
    return this.grid.isPaused;
  }

  set isPaused(value) {
    this.grid.isPaused = value;
  }

  private updateMovements() {
    this.movements++;
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
    this.points = this.grid.points;
    this.input = new InputManager(this.config);
    this.gameState.userControl = true;
    this.createGameboardUI();
  }

  start() {
    this.createGrid();
    this.createPlayerUI();
  }

  update() {
    if (!this.gameState.userControl) {
      return;
    }

    let cursor;
    if (!this.gameState.gameOver) {
      this.gameboardUI.update(this.grid);

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
    if (this.gameState.wonGame) {
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
    if (this.gameState.gameOver) {
      return;
    }
    this.playerUI.activatePower();
    this.grid.activatePower();
  }

  gameover(win: boolean) {
    this.gameState.gameOver = true;
    if (win) {
      this.gameState.wonGame = true;
      let nextState = this.gameboardConfig.playStory ? 'Story' : 'MainMenu';
      this.gameboardUI.winScreen(nextState);
    } else {
      this.gameboardUI.gameOverScreen(this.gameState);
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
    if (this.gameState.gameOver) {
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
}
