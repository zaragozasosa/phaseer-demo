import Base from './../Base';
import Grid from './Grid';
import GridFactory from './GridFactory';
import GameboardConfig from './../Config/GameboardConfig';
import InputManager from './../InputManager';
import PowerWindow from './Windows/PowerWindow';
import GameOverWindow from './Windows/GameOverWindow';
import PauseWindow from './Windows/PauseWindow';
import { ColorSettings } from './../Config/Config';

export default abstract class Gameboard extends Base {
  protected grid: Grid;
  protected gameboardConfig: GameboardConfig;
  protected input: InputManager;
  protected showOnce: boolean;
  protected gameOver: boolean;
  
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
    this.gameOver = false;
    let updateScoreSignal = new Phaser.Signal();
    updateScoreSignal.add(
      function(addToMovement) {
        this.updateScore(addToMovement);
      }.bind(this)
    );

    let toogleButtonSignal = new Phaser.Signal();
    toogleButtonSignal.add(
      function(status) {
        this.toogleButton(status);
      }.bind(this)
    );

    let gameoverSignal = new Phaser.Signal();
    gameoverSignal.add(
      function(win) {
        debugger;
        this.gameover(win);
      }.bind(this)
    );

    this.gameboardConfig.toogleButtonSignal = toogleButtonSignal;
    this.gameboardConfig.updateScoreSignal = updateScoreSignal;
    this.gameboardConfig.gameOverSignal = gameoverSignal;    
    this.gameboardConfig.clickTileSignal = new Phaser.Signal();
    this.gameboardConfig.mergeTileSignal = new Phaser.Signal();
    this.gameboardConfig.updateAmmoSignal = new Phaser.Signal();
    this.gameboardConfig.chargeSignal = new Phaser.Signal();
    this.gameboardConfig.cooldownSignal = new Phaser.Signal();
    this.gameboardConfig.turnsSignal = new Phaser.Signal();

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
    if(this.gameOver) {
      return true;
    }

    this.updateTimer();
    var keys = this.input.checkKeys();
    if (keys === Phaser.Keyboard.ESC) {
      this.pauseToogle();
    }
    if (!this.isPaused) {
      var cursor = this.input.checkCursor();
      this.grid.update(cursor);
    }
  }

  activatePower() {
    if(this.gameOver) {
      return;
    }
    
    this.actionButton.kill();
    this.grid.activatePower();
    let window = new PowerWindow(this.gameboardConfig.mainTile);
    this.tools.audio.playTwoSounds(this.gameboardConfig);
  }

  gameover(win: boolean) {
    let retryCallback;
    this.gameOver = true;
    if(win) {
      this.showGameOverWindow(win, function() {
        this.tools.misc.changeState('CharacterSelection')
      }.bind(this));
    } else {
      this.showGameOverWindow(win, function() {
        this.tools.misc.restartState(this.gameboardConfig);
      }.bind(this));
    }
  }

  protected showGameOverWindow(win: boolean, retryCallback: any) {
    new GameOverWindow(this.gameboardConfig.mainTile, win, function(){
      retryCallback();
    }.bind(this), 
    function() {
      this.tools.misc.changeState('Boot')
    }.bind(this)); 
  }

  protected toogleButton(buttonStatus: number) {
    if(this.gameOver) {
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
          this.pauseToogle();
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

  private pauseToogle() {
    if (this.isPaused) {
      this.pausedWindow.hideAndDestroy();
      this.isPaused = false;
      this.timer.resume();
    } else {
      this.pausedWindow = new PauseWindow(
        this.gameboardConfig.mainTile,
        function() {
          this.pauseToogle();
        }.bind(this),
        function() {
          this.tools.misc.changeState('Boot')
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
