import GameboardConfig from './../../Config/GameboardConfig';
import GridStructure from './GridStructure';
import GridTile from './GridTile';
import GameRules from './GameRules'
import RulesFactory from './Factories/RulesFactory'
import Base from './../../Base';

export default abstract class LogicalGrid extends Base {
  protected grid: GridStructure;
  protected arraySize: number;
  protected gameboardConfig: GameboardConfig;
  protected tilesGroup: Phaser.Group;
  protected blockNewTiles: boolean;
  protected gameRules: GameRules;

  constructor(gameboardConfig: GameboardConfig) {
    super();
    this.gameboardConfig = gameboardConfig;
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
  }

  check(keyboardInput: number) {
    return this.gameRules.scanGrid(this.grid, keyboardInput);
  }

  manageCollisions(wallsGroup: Phaser.Group) {
    for (let tile of this.grid.getTiles()) {
      tile.overlaps(this.tilesGroup, wallsGroup);
    }

    return this.tilesStopped();
  }

  randomizeTile(tile: GridTile = null) {
    var tiles = this.grid.getOrdered();
    let maxValue = tiles[0].value;
    let minValue = tiles[tiles.length - 1].value;
    let maxTilePercentage = 15;
    let minTilePercentage = 15;
    let meanIndex = Math.round(tiles.length / 2) - 1;
    let meanValue = tiles[meanIndex].value;
    let meanChance = 20;

    tile.randomize(maxValue, maxTilePercentage, minValue, minTilePercentage, meanValue, meanChance);
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
    this.gameRules.newTurn(this, this.grid);
  }

  protected getTileNewPosition() {
    let maxPosition = this.gameboardConfig.arraySize;
    do {
      var ranX = this.tools.misc.randomBetween(0, maxPosition);
      var ranY = this.tools.misc.randomBetween(0, maxPosition);
    } while (this.grid.get(ranX, ranY));

    return new Phaser.Point(ranX, ranY);
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

  getPoints() {
    return this.grid.sumTiles();
  }

  abstract canUsePower();
  abstract power(...args);
}
