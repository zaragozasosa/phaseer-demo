import Base from './../Base';
import LogicalGrid from './../Objects/LogicalGrid';
import InputManager from './../InputManager';
import GridTile from './GridTile';
import GameboardConfig from './../Config/GameboardConfig';

export default class Grid extends Base{
  private gameboardConfig: GameboardConfig;


  private gridLogic: LogicalGrid;
  private wallsGroup: Phaser.Group;
  private framesGroup: Phaser.Group;
  private animating: boolean;
  private input: InputManager;
  private gameboardCallback: any;

  constructor(gameboardConfig: GameboardConfig, gameboardCallback: any) {
    super();
    this.gameboardConfig = gameboardConfig;
    this.gameboardCallback = gameboardCallback;

    this.animating = false;
    this.wallsGroup = this.makeWalls();
    this.gridLogic = new LogicalGrid(gameboardConfig);

    this.framesGroup = this.makeTileFrames();
    
    this.input = new InputManager(this.config);
  }

  update() {
    if (!this.animating) {
      var cursor = this.input.checkCursor();
      if(cursor) {
        this.animating = this.gridLogic.scanGrid(cursor);
      }
      cursor = null;
    } else {
      this.manageCollisions();
    }
  }

  getColumnForDebug(column: number) {
    return this.gridLogic.getColumnForDebug(column);
  }

  calculatePoints() {
    return this.gridLogic.sumTiles();
  }

  private manageCollisions() {
    if (this.gridLogic.manageCollisions(this.wallsGroup)) {
      this.animating = false;
      this.gameboardCallback();
    }
  }

  private makeWalls(): Phaser.Group {
    let wallLength = (this.config.gridSettings.tileSize) * 4;
    let group = this.tools.misc.addGroup();

    group.add(this.tools.graphic.makeWall(0, 0, 1, wallLength));
    group.add(this.tools.graphic.makeWall(0, 0, wallLength, 1));
    group.add(this.tools.graphic.makeWall(0, wallLength, wallLength, 1));
    group.add(this.tools.graphic.makeWall(wallLength, 0, 1, wallLength));

    return group;
  }

  private makeTileFrames(): Phaser.Group {
    let group = this.tools.misc.addGroup();
    let arraySize = this.gameboardConfig.arraySize;
    for (let x = 0; x <= arraySize; x++) {
      for (let y = 0; y <= arraySize; y++) {
        group.add(this.tools.sprite.makeFrame(x, y));
      }
    }
    return group;
  }
}
