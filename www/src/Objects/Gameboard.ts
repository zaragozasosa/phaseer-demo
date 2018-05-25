import { Config, Singleton } from './../Models/Config';
import SpriteFactory from './../Tools/SpriteFactory';
import TextFactory from './../Tools/TextFactory';
import GraphicsFactory from './../Tools/GraphicsFactory';
import LogicalGrid from './../Tools/LogicalGrid';
import Grid from './Grid';
import GameboardConfig from './GameboardConfig';

export default class Gameboard {
  private game: Phaser.Game;
  private config: Config;
  private grid: Grid;
  private textFactory: TextFactory;
  private gameboardConfig: GameboardConfig;
  private graphicsFactory: GraphicsFactory;

  debugArray: Array<Phaser.Text>;
  header: Phaser.Text;
  points: number;
  movements: number;

  constructor(gameboardConfig: GameboardConfig) {
    let singleton = Singleton.getInstance();
    this.game = singleton.game;
    this.config = singleton.config;
    this.textFactory = new TextFactory();
    this.graphicsFactory = new GraphicsFactory();
    this.gameboardConfig = gameboardConfig;
    this.graphicsFactory.addBackground();
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
    this.addDebuggingMatrix();
  }

  update() {
    this.grid.update();
  }

  private addHeader() {
    this.header = this.textFactory.make(20, 80, '', 50);
    this.updateHeader();
  }

  private addPowerButton() {
    let posX = this.config.safeZone.paddingX + 250 * this.config.scaleFactor;
    let posY = this.config.safeZone.paddingY + 1200 * this.config.scaleFactor;

    let button = this.game.add.button(
      posX,
      posY,
      'button',
      null,
      this,
      1,
      0,
      2
    );
    button.scale.setTo(this.config.scaleFactor, this.config.scaleFactor);
  }

  private addDebuggingMatrix() {
    let posX = 250;
    let posY = 1300;

    this.debugArray = [];

    this.debugArray.push(
      this.textFactory.makeCenteredAnchor(posX, posY, '', 30)
    );
    this.debugArray.push(
      this.textFactory.makeCenteredAnchor(posX + 150, posY, '', 30)
    );
    this.debugArray.push(
      this.textFactory.makeCenteredAnchor(posX + 300, posY, '', 30)
    );
    this.debugArray.push(
      this.textFactory.makeCenteredAnchor(posX + 450, posY, '', 30)
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
