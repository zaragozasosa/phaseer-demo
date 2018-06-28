import Base from './../../Base';
import LogicalGrid from './LogicalGrid';
import InputManager from './../../InputManager';
import GridTile from './GridTile';
import GameboardConfig from './../../Config/GameboardConfig';

export default abstract class Grid extends Base {
  protected gameboardConfig: GameboardConfig;

  protected gridLogic: LogicalGrid;
  protected wallsGroup: Phaser.Group;
  protected framesGroup: Phaser.Group;
  protected animating: boolean;

  constructor(gameboardConfig: GameboardConfig, gridLogic: LogicalGrid) {
    super();
    this.gameboardConfig = gameboardConfig;

    this.animating = false;
    this.wallsGroup = this.makeWalls();
    this.gridLogic = gridLogic;
  }

  update(cursor: number) {
    if (!this.animating) {
      if (cursor) {
        this.animating = this.gridLogic.scanGrid(cursor);
        this.buttonDisableMightChange();
      }
      cursor = null;
    } else {
      this.manageCollisions();
    }
  }

  calculatePoints() {
    return this.gridLogic.sumTiles();
  }

  activatePower(): any {
    this.gridLogic.power();
    this.gameboardConfig.updateScoreSignal.dispatch(false);
  }

  protected canUsePower() {
    return this.gridLogic.canUsePower();
  }

  private buttonDisableMightChange() {
    if (!this.animating && this.canUsePower()) {
      this.gameboardConfig.toggleButtonSignal.dispatch(
        GameboardConfig.BUTTON_ACTIVE
      );
    } else if (this.animating && this.canUsePower()) {
      this.gameboardConfig.toggleButtonSignal.dispatch(
        GameboardConfig.BUTTON_SLEEP
      );
    } else {
      this.gameboardConfig.toggleButtonSignal.dispatch(
        GameboardConfig.BUTTON_SLEEP_DISABLED
      );
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

  // getColumnForDebug(column: number) {
  //   return this.gridLogic.getColumnForDebug(column);
  // }
}
