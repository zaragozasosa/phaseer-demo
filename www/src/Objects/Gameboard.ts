import Base from './../Base';
import Grid from './Grid';
import GameboardConfig from './../Config/GameboardConfig';

export default class Gameboard extends Base{
  private grid: Grid;
  private gameboardConfig: GameboardConfig;
  debugArray: Array<Phaser.Text>;
  header: Phaser.Text;
  points: number;
  movements: number;
  actionButton: Phaser.Button;
  muteToogleSprite: Phaser.Sprite;

  constructor(gameboardConfig: GameboardConfig) {
    super();
    this.gameboardConfig = gameboardConfig;
    this.tools.graphic.addBackground();
    this.debugArray = [];

    this.grid = new Grid(
      gameboardConfig,
      function() {
        this.updateScore();
      }.bind(this)
    );

    this.movements = 0;
    this.points = this.grid.calculatePoints();
    this.addHeader();
    this.addVolumeButton();
    this.addPowerButton();
  }

  update() {
    this.grid.update();
  }

  private addHeader() {
    this.header = this.tools.text.make(40, 20, '', 40);
    this.updateHeader();
  }

  private addVolumeButton() {
    this.muteToogleSprite = this.tools.sprite.createVolumeIcon();
    this.muteToogleSprite.events.onInputDown.add(function(){
      this.tools.audio.changeAudioLevel(this.muteToogleSprite)
    }.bind(this));
  }

  private addPowerButton() {
    this.actionButton = this.tools.button.make(200, 1200, ['button-mayo'], null, 1.2);    
  }

  private addDebuggingMatrix() {
    let posX = 250;
    let posY = 1300;

    this.debugArray = [];

    this.debugArray.push(
      this.tools.text.makeCenteredAnchor(posX, posY, '', 30)
    );
    this.debugArray.push(
      this.tools.text.makeCenteredAnchor(posX + 150, posY, '', 30)
    );
    this.debugArray.push(
      this.tools.text.makeCenteredAnchor(posX + 300, posY, '', 30)
    );
    this.debugArray.push(
      this.tools.text.makeCenteredAnchor(posX + 450, posY, '', 30)
    );

    this.updateDebuggingMatrix();
  }

  private updateScore() {
    this.movements++;
    this.points = this.grid.calculatePoints();
    this.updateHeader();
    this.updateDebuggingMatrix();
  }

  private updateDebuggingMatrix() {
    this.debugArray.forEach(
      function(text: any, index: number) {
        text.setText(this.grid.getColumnForDebug(index));
      }.bind(this)
    );
  }

  private updateHeader() {
    this.header.setText(
      `Score: ${this.points}     Movements: ${this.movements}`
    );
  }
}
