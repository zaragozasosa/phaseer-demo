import Base from './../Base';
import Grid from './Grid';
import GridFactory from './GridFactory';
import GameboardConfig from './../Config/GameboardConfig';
import InputManager from './../InputManager';
import AmmoModel from './../Models/AmmoModel';
import GameboardMode from './../Models/GameboardMode';
import PowerWindow from './Windows/PowerWindow';
import Window from './Windows/Window';
import { ColorSettings } from './../Config/Config';


import AmmoBar from './AmmoBar';

export default class Gameboard extends Base {
  private grid: Grid;
  private gameboardConfig: GameboardConfig;
  private input: InputManager;
  private mode: number;
  private ammoBar: AmmoBar;

  debugArray: Array<Phaser.Text>;
  header: Phaser.Text;
  points: number;
  movements: number;
  muteToogleSprite: Phaser.Sprite;
  timer: Phaser.Timer;
  timerSeconds: number;
  actionButton: Phaser.Button;
  isButtonSleeping: boolean;

  isPaused: boolean;
  pausedWindow: Window;

  constructor(gameboardConfig: GameboardConfig) {
    super();
    this.gameboardConfig = gameboardConfig;
    this.tools.graphic.addBackground();
    this.tools.sprite.createBackground();
    this.debugArray = [];

    let updateScoreSignal = new Phaser.Signal();
    updateScoreSignal.add(
      function(addToMovement) {
        this.updateScore(addToMovement);
      }.bind(this)
    );

    let toogleButtonSignal = new Phaser.Signal();
    toogleButtonSignal.add(
      function(disabled) {
        this.toogleButton(disabled);
      }.bind(this)
    );

    let updateAmmoSignal = new Phaser.Signal();
    updateAmmoSignal.add(
      function() {
        this.updateAmmo();
      }.bind(this)
    );

    this.gameboardConfig.toogleButtonSignal = toogleButtonSignal;
    this.gameboardConfig.updateScoreSignal = updateScoreSignal;
    this.gameboardConfig.updateAmmoSignal = updateAmmoSignal;
    this.gameboardConfig.clickTileSignal = new Phaser.Signal();

    this.grid = GridFactory.create(gameboardConfig);
    this.isPaused = false;
    this.movements = 0;
    this.points = this.grid.calculatePoints();
    this.addHeader();
    this.addVolumeButton();
    this.addPowerButton();
    this.addTimer();

    this.input = new InputManager(this.config);
    this.mode = GameboardMode.DEFAULT;
  }

  update() {
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
    this.actionButton.kill();
    let window = new PowerWindow(this.gameboardConfig.mainTile);

    let response = this.grid.activatePower();
    if (response && response instanceof AmmoModel) {
      this.mode = GameboardMode.AMMO;
      let model: AmmoModel = response;
      this.ammoBar = new AmmoBar(model);
    }
  }

  private updateAmmo() {
    if (this.mode === GameboardMode.AMMO) {
      if (this.ammoBar.update() === 0) {
        this.mode = GameboardMode.DEFAULT;
        this.gameboardConfig.clickTileSignal.removeAll();
      }
    }
  }

  private toogleButton(disabled: boolean) {
    if (disabled || this.isButtonSleeping) {
      this.actionButton.tint = Phaser.Color.GRAY;
      this.actionButton.inputEnabled = false;
    } else {
      this.actionButton.tint = Phaser.Color.WHITE;
      this.actionButton.inputEnabled = true;
    }
  }

  private addHeader() {
    this.header = this.tools.text.make(20, 20, '', 50);
    this.updateHeader();
  }

  private addVolumeButton() {
    this.muteToogleSprite = this.tools.sprite.createVolumeIcon();
    this.muteToogleSprite.events.onInputDown.add(
      function() {
        this.tools.audio.changeAudioLevel(this.muteToogleSprite);
      }.bind(this)
    );
  }

  private addPowerButton() {
    this.actionButton = this.tools.button.make(
      310,
      1250,
      ['power'],
      function() {
        this.activatePower();
      }.bind(this),
      1.5
    );

    this.isButtonSleeping = true;

    this.actionButton.inputEnabled = false;
    this.actionButton.tint = Phaser.Color.GRAY;
    let timer = this.tools.misc.createTimer();

    timer.start();
    timer.add(
      1000 * 30,
      function() {
        this.isButtonSleeping = false;
      }.bind(this)
    );
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
    let message = this.tools.text.make(20, 80, 'Time: 00:00', 50);
    this.timerSeconds = 0;
    this.timer = this.tools.misc.createTimer();
    this.timer.start();
    this.timer.loop(
      1000,
      function() {
        this.timerSeconds++;
        let min = Math.floor(this.timerSeconds / 60);
        let sec = this.timerSeconds - min * 60;
        message.setText(`Time: ${this.num(min)}:${this.num(sec)}`);
      }.bind(this)
    );
  }

  private num(n) {
    return n > 9 ? '' + n : '0' + n;
  }

  private pauseToogle() {
    if (this.isPaused) {
      this.pausedWindow.hideAndDestroy();
      this.isPaused = false;
    } else {
      this.pausedWindow = new Window();
      let group = this.tools.misc.addGroup();
      let text = this.tools.text.makeXBounded(400, '- PAUSED -', 80, 'center', ColorSettings.PRIMARY);
      let text2 = this.tools.text.make(80, 560, 'Power name:', 50);
      let text3 = this.tools.text.make(80, 630, 'Description blah blah blah blah', 40, ColorSettings.ALT_TEXT);

      let text4 = this.tools.text.make(80, 800, 'Requirements:', 50);
      let text5 = this.tools.text.make(80, 860, 'Description blah blah blah blah', 40, ColorSettings.ALT_TEXT);
      group.add(text);
      group.add(text2);
      group.add(text3);
      group.add(text4);
      group.add(text5);

      this.pausedWindow.init(group);
      this.pausedWindow.show();
      this.isPaused = true;
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
