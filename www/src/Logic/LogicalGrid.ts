import GameboardConfig from './../Config/GameboardConfig';
import GridTile from './../Objects/GridTile';
import Base from './../Base';

export default class LogicalGrid extends Base {
  protected grid: Array<GridTile>;
  protected arraySize: number;
  protected gameboardConfig: GameboardConfig;
  protected lastMergedTile: GridTile;
  protected tilesGroup: Phaser.Group;

  constructor(gameboardConfig: GameboardConfig) {
    super();
    this.gameboardConfig = gameboardConfig;
    this.arraySize = gameboardConfig.arraySize;
    this.tilesGroup = this.tools.misc.addGroup();
    this.grid = [];

    for (let x = 0; x <= this.arraySize; x++) {
      for (let y = 0; y <= this.arraySize; y++) {
        this.grid.push(null);
      }
    }

    this.reorderTileList();

    this.add();
    this.add();
  }

  scanGrid(keyboardInput: number) {
    var animating = false;

    let minX = keyboardInput === Phaser.KeyCode.LEFT ? 1 : 0;
    let minY = keyboardInput === Phaser.KeyCode.UP ? 1 : 0;

    let maxX =
      keyboardInput === Phaser.KeyCode.RIGHT
        ? this.arraySize - 1
        : this.arraySize;
    let maxY =
      keyboardInput === Phaser.KeyCode.DOWN
        ? this.arraySize - 1
        : this.arraySize;

    let startY = keyboardInput === Phaser.KeyCode.DOWN ? maxY : minY;
    let stopY = keyboardInput === Phaser.KeyCode.DOWN ? minY : maxY;
    let yIncrement = keyboardInput === Phaser.KeyCode.DOWN ? -1 : 1;
    let startX = keyboardInput === Phaser.KeyCode.RIGHT ? maxX : minX;
    let stopX = keyboardInput === Phaser.KeyCode.RIGHT ? minX : maxX;
    let xIncrement = keyboardInput === Phaser.KeyCode.RIGHT ? -1 : 1;

    startY -= yIncrement;
    do {
      startY += yIncrement;
      startX = keyboardInput === Phaser.KeyCode.RIGHT ? maxX : minX;
      startX -= xIncrement;
      do {
        startX += xIncrement;
        if (this.pushTile(startX, startY, keyboardInput)) {
          animating = true;
        }
      } while (startX !== stopX);
    } while (startY !== stopY);

    return animating;
  }

  manageCollisions(wallsGroup: Phaser.Group) {
    for (let tile of this.grid.filter(x => x)) {
      tile.overlaps(this.tilesGroup, wallsGroup);
    }

    return this.tilesStopped();
  }

  canUsePower() {
    return false;
  }

  power() {}

  protected cleanGrid() {
    let killed = this.grid.filter(x => x && !x.isAlive);
    for (let item of killed) {
      item.destroy(true);
      this.set(item.posX, item.posY, null);
    }

    this.lastMergedTile = null;
    this.tilesGroup.removeAll();

    for (let item of this.grid.filter(x => x)) {
      this.tilesGroup.add(item.getGroup);
    }
  }

  private tilesStopped() {
    let allStopped = true;

    if (this.grid.filter(x => x && x.isMoving).length) {
      allStopped = false;
    }

    if (allStopped) {
      console.log('Stopped!');
      this.updateGrid();
    }

    return allStopped;
  }

  private updateGrid() {
    if (this.lastMergedTile) {
      let value = this.lastMergedTile.value;
      if (
        (value === this.gameboardConfig.minimumValue * 2 &&
          this.tools.misc.randomBetween(0, 3) === 0) ||
        (value === this.gameboardConfig.minimumValue * 4 &&
          this.tools.misc.randomBetween(0, 2) === 0) ||
        (value === this.gameboardConfig.minimumValue * 8 &&
          this.tools.misc.randomBetween(0, 1) === 0) ||
        (value === this.gameboardConfig.minimumValue * 16 &&
          this.tools.misc.randomBetween(0, 1) === 0)
      ) {
        this.tools.audio.playSound(this.lastMergedTile.model.id + '-sfx');
      }
    }

    this.cleanGrid();

    if (!this.isFull()) {
      this.add();
    }
  }

  private pushTile(x: number, y: number, keyboardInput: number) {
    let tile = this.get(x, y);
    if (!tile) {
      return false;
    }

    let isDirty = false;
    let pushX =
      keyboardInput === Phaser.KeyCode.RIGHT
        ? 1
        : keyboardInput === Phaser.KeyCode.LEFT ? -1 : 0;
    let pushY =
      keyboardInput === Phaser.KeyCode.DOWN
        ? 1
        : keyboardInput === Phaser.KeyCode.UP ? -1 : 0;
    let actualX = tile.posX;
    let actualY = tile.posY;

    let newX = actualX + pushX;
    let newY = actualY + pushY;

    while (
      newX >= 0 &&
      newX <= this.arraySize &&
      newY >= 0 &&
      newY <= this.arraySize
    ) {
      let nextTile = this.get(newX, newY);
      if (!nextTile || !nextTile.value) {
        //move the tile
        tile.posX = newX;
        tile.posY = newY;
        this.set(newX, newY, tile);
        this.set(actualX, actualY, null);
        actualX = newX;
        actualY = newY;
        isDirty = true;
      } else if (nextTile && nextTile.value === tile.value) {
        //merge tiles
        let newValue = tile.value * 2;
        this.mergeTile(nextTile, tile);
        isDirty = true;
        this.lastMergedTile =
          this.lastMergedTile && this.lastMergedTile.value >= newValue
            ? this.lastMergedTile
            : this.get(newX, newY);
        break;
      } else {
        break;
      }

      newX += pushX;
      newY += pushY;
    }

    if (isDirty) {
      tile.animate(keyboardInput);
    }
    return isDirty;
  }

  private add() {
    var newTilePos;
    do {
      var ranX = this.tools.misc.randomBetween(0, 3);
      var ranY = this.tools.misc.randomBetween(0, 3);
    } while (this.get(ranX, ranY));

    if (this.emptyTiles() > 6) {
      var chance = this.tools.misc.randomBetween(0, 99);
      (newTilePos = ranX), ranY, chance === 98 ? 2 : chance >= 90 ? 1 : 0;
    } else {
      newTilePos = 0;
    }
    let value = this.get(ranX, ranY);

    let tile = new GridTile(ranX, ranY, this.gameboardConfig, newTilePos);
    this.set(ranX, ranY, tile);
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

  private get(x: number, y: number): GridTile {
    let position = y * (this.arraySize + 1) + x;
    return this.grid[position];
  }

  private set(x: number, y: number, tile: GridTile) {
    let position = y * (this.arraySize + 1) + x;
    this.grid[position] = tile;
  }

  private push(tile: GridTile, keyboardInput: number) {}

  private mergeTile(nextTile: GridTile, previousTile: GridTile) {
    nextTile.value *= 2;
    previousTile.value = 0;
    previousTile.nextTile = nextTile;
  }

  private isFull(): boolean {
    for (let tile of this.grid) {
      if (!tile) {
        return false;
      }
    }
    return true;
  }

  private emptyTiles(): number {
    let empty = 0;
    for (let tile of this.grid) {
      if (tile && tile.value === 0) {
        empty++;
      }
    }
    return empty;
  }

  protected getTilesOrdered() {
    return this.grid.filter(x => x).sort((n1, n2) => n2.value - n1.value);
  }

  sumTiles() {
    let points = 0;
    for (let tile of this.grid) {
      points += tile ? tile.value : 0;
    }
    return points;
  }

  getColumnForDebug(row: number) {
    let val1 = this.get(row, 0) ? this.get(row, 0).value : 0;
    let val2 = this.get(row, 1) ? this.get(row, 1).value : 0;
    let val3 = this.get(row, 2) ? this.get(row, 2).value : 0;
    let val4 = this.get(row, 3) ? this.get(row, 3).value : 0;

    return `${val1}\n${val2}\n${val3}\n${val4}`;
  }
}
