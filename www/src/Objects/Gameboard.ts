import Base from './../Base';
import Grid from './Grid';
import GridFactory from './GridFactory';
import GameboardConfig from './../Config/GameboardConfig';

export default class Gameboard extends Base {
  private grid: Grid;
  private gameboardConfig: GameboardConfig;
  debugArray: Array<Phaser.Text>;
  header: Phaser.Text;
  points: number;
  movements: number;
  muteToogleSprite: Phaser.Sprite;
  timer: Phaser.Timer;
  timerSeconds: number;
  actionButton: Phaser.Button;
  isButtonSleeping: boolean;

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
    
    this.gameboardConfig.toogleButtonSignal = toogleButtonSignal;
    this.gameboardConfig.updateScoreSignal = updateScoreSignal;
    
    

    this.grid = GridFactory.create(
      gameboardConfig
    );


    this.movements = 0;
    this.points = this.grid.calculatePoints();
    this.addHeader();
    this.addVolumeButton();
    this.addPowerButton();
    this.addTimer();
  }

  update() {
    this.grid.update();
  }

  private toogleButton(disabled: boolean) {
    if(disabled || this.isButtonSleeping) {
      this.actionButton.tint = Phaser.Color.GRAY;
      this.actionButton.inputEnabled = false;
    }
    else {
      this.actionButton.tint = Phaser.Color.WHITE;
      this.actionButton.inputEnabled = true;
    }
  }

  activatePower() {
    this.actionButton.tint = Phaser.Color.GRAY;
    this.actionButton.inputEnabled = false;
    this.isButtonSleeping = true;
    this.grid.activatePower();
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
      ['button'],
      function() {
        this.activatePower();
      }.bind(this),
      2
    );

    this.isButtonSleeping = true;

    this.actionButton.inputEnabled = false;
    this.actionButton.tint = Phaser.Color.GRAY;
    let timer = this.tools.misc.createTimer();

    timer.start();
    timer.add(
      1000 * 1,
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
