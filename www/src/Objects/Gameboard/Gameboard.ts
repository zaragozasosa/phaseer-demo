import Base from './../../Base';
import Grid from './Grid';
import GridFactory from './GridFactory';
import GameboardConfig from './../../Config/GameboardConfig';
import InputManager from './../../InputManager';
import PowerWindow from './../Windows/PowerWindow';
import GameOverWindow from './../Windows/GameOverWindow';
import WinWindow from './../Windows/WinWindow';
import PauseWindow from './../Windows/PauseWindow';
import { ColorSettings } from './../../Config/Config';

export default abstract class Gameboard extends Base {
  protected grid: Grid;
  protected gameboardConfig: GameboardConfig;
  protected input: InputManager;
  protected showOnce: boolean;
  protected gameOver: boolean;
  protected wonGame: boolean;

  header: Phaser.Text;
  points: number;
  movements: number;
  timer: Phaser.Timer;
  timerMessage: Phaser.Text;
  actionButton: Phaser.Button;
  background: Phaser.Sprite;
  isPaused: boolean;
  pausedWindow: PauseWindow;

  constructor(gameboardConfig: GameboardConfig) {
    super();
    this.gameboardConfig = gameboardConfig;
    this.tools.graphic.addBackground();
    this.background = this.tools.sprite.createBackground();
    let win = this.tools.text.makeXBounded(1350, 'Click to win', 30, 'right');
    win.inputEnabled = true;
    win.events.onInputDown.addOnce(
      function() {
        this.gameover(true);
      }.bind(this)
    );

    let lose = this.tools.text.makeXBounded(150, 'Click to lose ', 30, 'right');
    lose.inputEnabled = true;
    lose.events.onInputDown.addOnce(
      function() {
        this.gameover(false);
      }.bind(this)
    );

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

    this.grid = GridFactory.create(gameboardConfig);
    this.isPaused = false;
    this.movements = 0;
    this.points = this.grid.calculatePoints();
    this.addHeader();
    this.addMenuButton();
    this.addPowerButton();
    this.addTimer();

    this.input = new InputManager(this.config);
    this.showOnce = true;
  }

  update() {
    let cursor;
    if (!this.gameOver) {
      this.updateTimer();

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

    this.actionButton.kill();
    this.grid.activatePower();
    let window = new PowerWindow(this.gameboardConfig.mainTile);
    this.tools.audio.playTwoSounds(this.gameboardConfig);
  }

  gameover(win: boolean) {
    this.gameOver = true;
    if (win) {
      this.wonGame = true;
      this.showGameOverWindow(
        win,
        function() {
          this.tools.misc.changeState('Story', this.gameboardConfig, false);
        }.bind(this)
      );
    } else {
      this.showGameOverWindow(
        win,
        function() {
          this.tools.misc.changeState('CharacterSelection');
        }.bind(this)
      );
    }
  }

  protected showGameOverWindow(win: boolean, callback: any) {
    if (win) {
      new WinWindow(
        this.gameboardConfig.mainTile,
        function() {
          callback();
        }.bind(this)
      );
    } else {
      new GameOverWindow(
        this.gameboardConfig.mainTile,
        function() {
          callback();
        }.bind(this),
        function() {
          this.tools.misc.changeState('Boot');
        }.bind(this)
      );
    }
  }

  protected showMessage(
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

    this.tools.misc.tweenVanishAndDestroy(
      text,
      { alpha: 0 },
      delay,
      'Linear',
      true,
      delay
    );
  }

  protected toggleButton(buttonStatus: number) {
    if (this.gameOver) {
      return;
    }

    if (buttonStatus === GameboardConfig.BUTTON_ACTIVE) {
      this.actionButton.inputEnabled = true;
      this.actionButton.tint = Phaser.Color.WHITE;
    }
    if (buttonStatus === GameboardConfig.BUTTON_SLEEP) {
      this.actionButton.inputEnabled = false;
      this.actionButton.tint = Phaser.Color.WHITE;
    } else if (buttonStatus === GameboardConfig.BUTTON_SLEEP_DISABLED) {
      this.actionButton.inputEnabled = false;
      this.actionButton.tint = Phaser.Color.GRAY;
    }
  }

  private addHeader() {
    this.header = this.tools.text.make(20, 20, '', 50);
    this.updateHeader();
  }

  private addMenuButton() {
    let menu = this.tools.sprite.createSprite(840, 30, 'menu', 0.8);
    menu.inputEnabled = true;

    menu.events.onInputDown.add(
      function() {
        if (!this.isPaused) {
          this.pausetoggle();
        }
      }.bind(this)
    );
  }

  private addPowerButton() {
    this.actionButton = this.tools.button.make(
      310,
      1250,
      ['power'],
      function() {
        if (!this.isPaused) {
          this.activatePower();
        }
      }.bind(this),
      1.5
    );

    this.actionButton.inputEnabled = false;
    this.actionButton.tint = Phaser.Color.GRAY;
  }

  private updateScore(addToMovement = true) {
    if (addToMovement) {
      this.movements++;
    }

    this.points = this.grid.calculatePoints();
    this.updateHeader();
  }

  private updateHeader() {
    this.header.setText(`Score: ${this.points}`);
  }

  private addTimer() {
    this.timerMessage = this.tools.text.make(20, 80, 'Time: 00:00', 50);
    this.timer = this.tools.misc.createTimer();
    this.timer.start();
  }

  private updateTimer() {
    let min = Math.floor(this.timer.seconds / 60);
    let sec = Math.floor(this.timer.seconds - min * 60);
    this.timerMessage.setText(`Time: ${this.num(min)}:${this.num(sec)}`);
  }

  private num(n) {
    return n > 9 ? '' + n : '0' + n;
  }

  private pausetoggle() {
    if (this.isPaused) {
      this.pausedWindow.hideAndDestroy();
      this.isPaused = false;
      this.timer.resume();
    } else {
      this.pausedWindow = new PauseWindow(
        this.gameboardConfig.mainTile,
        function() {
          this.pausetoggle();
        }.bind(this),
        function() {
          this.tools.misc.changeState('Boot');
        }.bind(this)
      );
      this.isPaused = true;
      this.timer.pause();
    }
  }

  // private addDebuggingMatrix() {
  //   let posX = 250;
  //   let posY = 1300;

  //   this.debugArray = [];

  //   this.debugArray.push(
  //     this.tools.text.makeCenteredAnchor(posX, posY, '', 30)
  //   );
  //   this.debugArray.push(
  //     this.tools.text.makeCenteredAnchor(posX + 150, posY, '', 30)
  //   );
  //   this.debugArray.push(
  //     this.tools.text.makeCenteredAnchor(posX + 300, posY, '', 30)
  //   );
  //   this.debugArray.push(
  //     this.tools.text.makeCenteredAnchor(posX + 450, posY, '', 30)
  //   );

  //   this.updateDebuggingMatrix();
  // }

  // private updateDebuggingMatrix() {
  //   this.debugArray.forEach(
  //     function(text: any, index: number) {
  //       text.setText(this.grid.getColumnForDebug(index));
  //     }.bind(this)
  //   );
  // }
}
