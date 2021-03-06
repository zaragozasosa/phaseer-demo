import Base from './../../Base';
import InputManager from './../../InputManager';
import GridTile from './GridTile';
import GameboardConfig from './../../Config/GameboardConfig';
import GridStructure from './GridStructure';
import GameRules from './GameRules';
import RulesFactory from './Factories/RulesFactory';

export default abstract class Grid extends Base {
  protected gameboardConfig: GameboardConfig;
  protected grid: GridStructure;
  protected wallsGroup: Phaser.Group;
  protected framesGroup: Phaser.Group;
  protected animating: boolean;
  protected arraySize: number;
  protected tilesGroup: Phaser.Group;
  protected gameRules: GameRules;
  isPaused: boolean;
  alternativeScore: number;

  constructor(gameboardConfig: GameboardConfig) {
    super();
    this.gameboardConfig = gameboardConfig;

    this.isPaused = false;
    this.animating = false;
    this.alternativeScore = 0;
    this.wallsGroup = this.makeWalls();

    this.arraySize = gameboardConfig.arraySize;
    this.tilesGroup = this.tools.misc.addGroup();
    this.grid = new GridStructure(gameboardConfig.arraySize);
    this.gameRules = RulesFactory.create(gameboardConfig);

    for (let x = 0; x <= this.arraySize; x++) {
      for (let y = 0; y <= this.arraySize; y++) {
        this.grid.push(null);
      }
    }

    this.reorderTileList();
    this.add();
    this.add();
    this.gameRules.init(this, this.grid);
  }

  get points() {
    return this.grid.sumTiles();    
  }

  update(cursor: number) {
    if (!this.animating) {
      if (cursor) {
        this.animating = this.check(cursor);
        this.buttonDisableMightChange();
      }
      cursor = null;
    } else {
      this.manageCollisions();
    }
  }

  activatePower(): any {
    this.power();
  }

  add() {
    if (this.grid.isFull()) {
      return;
    }

    let pos = this.getTileNewPosition();
    let tile = new GridTile(pos.x, pos.y, this.gameboardConfig);
    this.grid.set(pos.x, pos.y, tile);
    this.tilesGroup.add(tile.getGroup);
  }

  protected check(keyboardInput: number) {
    return this.gameRules.scanGrid(keyboardInput);
  }

  protected randomizeTile(tile: GridTile = null) {
    var tiles = this.grid.getOrdered();
    let maxValue = tiles[0].value;
    let minValue = tiles[tiles.length - 1].value;
    let maxTilePercentage = 15;
    let minTilePercentage = 15;
    let meanIndex = Math.round(tiles.length / 2) - 1;
    let meanValue = tiles[meanIndex].value;
    let meanChance = 20;

    tile.randomize(
      maxValue,
      maxTilePercentage,
      minValue,
      minTilePercentage,
      meanValue,
      meanChance
    );
  }

  protected cleanGrid() {
    let killed = this.grid.filter(x => x && !x.isAlive);
    for (let item of killed) {
      item.destroy(true);
      this.grid.set(item.posX, item.posY, null);
    }

    this.tilesGroup.removeAll();

    for (let item of this.grid.getTiles()) {
      this.tilesGroup.add(item.getGroup);
    }
  }

  protected reconfigureGrid(newGrid: Array<string>) {
    let x = 0;
    let y = 0;
    for (let i = 0; i < newGrid.length; i++) {
      let tile = this.grid.get(x, y);
      let newValue = newGrid[i];

      if (newValue === '0' && tile) {
        tile.kill();
      } else if (newValue !== '0' && tile) {
        tile.changeValue(Number(newValue));
      } else if (newValue !== '0' && !tile) {
        let tile = new GridTile(
          x,
          y,
          this.gameboardConfig,
          false,
          Number(newValue)
        );
        this.grid.set(x, y, tile);
        this.tilesGroup.add(tile.getGroup);
      }

      x++;
      if (x > this.gameboardConfig.arraySize) {
        x = 0;
        y++;
      }
    }
    this.cleanGrid();
  }

  protected tilesStopped() {
    let allStopped = true;
    if (this.grid.filter(x => x && x.isMoving).length) {
      allStopped = false;
    }
    if (allStopped) {
      this.newTurn();
    }

    return allStopped;
  }

  protected newTurn() {
    this.cleanGrid();
    this.gameboardConfig.turnsSignal.dispatch();
    this.gameRules.newTurn();
  }

  protected getTileNewPosition() {
    let maxPosition = this.gameboardConfig.arraySize;
    do {
      var ranX = this.tools.misc.randomBetween(0, maxPosition);
      var ranY = this.tools.misc.randomBetween(0, maxPosition);
    } while (this.grid.get(ranX, ranY));

    return new Phaser.Point(ranX, ranY);
  }

  private reorderTileList() {
    let list = this.gameboardConfig.tiles;

    while (list[0].id !== this.gameboardConfig.mainTile.id) {
      let last = list.pop();
      list.unshift(last);
    }

    if (list[0].friendId !== list[1].id) {
      let secondArray = [];
      secondArray.push(list[0]);
      secondArray.push(list[list.length - 1]);
      let thirdArray = list.splice(1, list.length - 2);
      this.gameboardConfig.tiles = secondArray.concat(thirdArray);
    }

    let value = this.gameboardConfig.minimumValue;
    for (let tile of this.gameboardConfig.tiles) {
      tile.staticValue = value;
      value *= 2;
    }
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

  private makeWalls(): Phaser.Group {
    let wallLength = this.config.grid.tileSize * 4;
    let group = this.tools.misc.addGroup();

    group.add(this.tools.graphic.makeWall(0, 0, 1, wallLength));
    group.add(this.tools.graphic.makeWall(0, 0, wallLength, 1));
    group.add(this.tools.graphic.makeWall(0, wallLength, wallLength, 1));
    group.add(this.tools.graphic.makeWall(wallLength, 0, 1, wallLength));

    return group;
  }

  private manageCollisions() {
    for (let tile of this.grid.getTiles()) {
      tile.overlaps(this.tilesGroup, this.wallsGroup);
    }

    if (this.tilesStopped()) {
      this.animating = false;
      this.buttonDisableMightChange();
      this.gameboardConfig.updateMovementsSignal.dispatch();
    }
  }

  canUsePower() {
    return true;
  }

  power(...args): any {}
  getPowerConfiguration(): any {}
}
