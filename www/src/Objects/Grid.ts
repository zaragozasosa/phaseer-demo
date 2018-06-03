import Base from './../Base';
import LogicalGrid from './../Logic/LogicalGrid';
import InputManager from './../InputManager';
import GridTile from './GridTile';
import GameboardConfig from './../Config/GameboardConfig';
import PowerWindow from './Windows/PowerWindow';

export default class Grid extends Base {
  protected gameboardConfig: GameboardConfig;

  protected gridLogic: LogicalGrid;
  protected wallsGroup: Phaser.Group;
  protected framesGroup: Phaser.Group;
  protected animating: boolean;
  protected input: InputManager;
  //protected gameboardCallback: any;

  constructor(gameboardConfig: GameboardConfig, gridLogic = null) {
    super();
    this.gameboardConfig = gameboardConfig;

    this.animating = false;
    this.wallsGroup = this.makeWalls();
    if(gridLogic) {
      this.gridLogic = gridLogic;
    } else {
      this.gridLogic = new LogicalGrid(gameboardConfig);            
    }

    //this.framesGroup = this.makeTileFrames();

    this.input = new InputManager(this.config);
  }

  update() {
    if (!this.animating) {
      var cursor = this.input.checkCursor();
      if (cursor) {
        this.animating = this.gridLogic.scanGrid(cursor);
        this.buttonDisableMightChange();
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

  activatePower() {
    let window = new PowerWindow(this.gameboardConfig.mainTile);
    this.gridLogic.power();
    this.gameboardConfig.updateScoreSignal.dispatch(false);
  }

  protected canUsePower() {
		return this.gridLogic.canUsePower();
	}

  private buttonDisableMightChange() {
    if(!this.animating && this.canUsePower()) {
      this.gameboardConfig.toogleButtonSignal.dispatch(false);      
    } else {
      this.gameboardConfig.toogleButtonSignal.dispatch(true);      
    }
  }

  private manageCollisions() {
    if (this.gridLogic.manageCollisions(this.wallsGroup)) {
      this.animating = false;
      this.buttonDisableMightChange();
      this.gameboardConfig.updateScoreSignal.dispatch();
    }
  }

  private makeWalls(): Phaser.Group {
    let wallLength = this.config.grid.tileSize * 4;
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
