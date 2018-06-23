import GameboardConfig from './../../Config/GameboardConfig';
import GridTile from './GridTile';
import Base from './../../Base';

export default abstract class LogicalGrid extends Base {
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

  randomizeTile(tile: GridTile = null) {
    var tiles = this.getTilesOrdered();
    let unique = tiles
      .map(item => item.value)
      .filter((value, index, self) => self.indexOf(value) === index);

    let maxValue = tiles[0].value;
    let minValue = tiles[tiles.length - 1].value;
    let maxTilePercentage = 20 - (unique.length - 3) * 2.5;

    if (maxTilePercentage < 10) {
      maxTilePercentage = 10;
    }

    let minTilePercentage = 30 - (unique.length - 3) * 2.5;
    if (minTilePercentage < 20) {
      minTilePercentage = 20;
    }

    if (tile === null) {
      for (let x = 0; x < tiles.length; x++) {
        tiles[x].randomize(
          maxValue,
          maxTilePercentage,
          minValue,
          minTilePercentage
        );
      }
    } else {
      tile.randomize(maxValue, maxTilePercentage, minValue, minTilePercentage);
    }
  }

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

  protected reconfigureGrid(newGrid: Array<string>) {
    let x = 0;
    let y = 0;
    for (let i = 0; i < this.grid.length; i++) {
      let tile = this.get(x, y);
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
          0,
          Number(newValue)
        );
        this.set(x, y, tile);
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
      this.prepareNewTurn();
    }

    return allStopped;
  }

  protected prepareNewTurn() {
    this.playHighestMergeSFX();
    this.cleanGrid();
    this.gameboardConfig.turnsSignal.dispatch();

    if (!this.isFull()) {
      this.add();
    }
    this.checkGameOver();    
  }

  protected getTilesOrdered(asc = false) {
    if (asc) {
      return this.grid.filter(x => x).sort((n1, n2) => n1.value - n2.value);
    } else {
      return this.grid.filter(x => x).sort((n1, n2) => n2.value - n1.value);
    }
  }

  protected mergeTile(nextTile: GridTile, previousTile: GridTile) {
    nextTile.value *= 2;
    previousTile.value = 0;
    previousTile.nextTile = nextTile;
  }

  protected tryToAdd() {
    if (!this.isFull()) {
      this.add();
    }
  }

  protected add() {
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

  protected get(x: number, y: number): GridTile {
    let position = y * (this.arraySize + 1) + x;
    return this.grid[position];
  }

  protected set(x: number, y: number, tile: GridTile) {
    let position = y * (this.arraySize + 1) + x;
    this.grid[position] = tile;
  }

  protected isFull(): boolean {
    for (let tile of this.grid) {
      if (!tile) {
        return false;
      }
    }
    return true;
  }

  protected emptyTiles(): number {
    let empty = 0;
    for (let tile of this.grid) {
      if (tile && tile.value === 0) {
        empty++;
      }
    }
    return empty;
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

  protected playHighestMergeSFX() {
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
        this.tools.audio.playCharacterSound(this.lastMergedTile.model);
      }
    }
  }

  private canKeepPlaying() {
    if (this.isFull()) {
      for (let x = 0; x < this.gameboardConfig.arraySize; x++) {
        for (let y = 0; y < this.gameboardConfig.arraySize; y++) {
          var tile = this.get(x, y);
          if (tile && this.canBeMerged(tile)) {
            return true;
          }
        }
      }
    } else {
      return true;
    }

    return false;
  }

  private canBeMerged(tile: GridTile) {
    if (
      tile.posX > 0 &&
      this.get(tile.posX - 1, tile.posY) &&
      tile.value === this.get(tile.posX - 1, tile.posY).value
    ) {
      return true;
    }
    if (
      tile.posX < this.gameboardConfig.arraySize &&
      this.get(tile.posX + 1, tile.posY) &&
      tile.value === this.get(tile.posX + 1, tile.posY).value
    ) {
      return true;
    }

    if (
      tile.posY > 0 &&
      this.get(tile.posX, tile.posY - 1) &&
      tile.value === this.get(tile.posX, tile.posY - 1).value
    ) {
      return true;
    }

    if (
      tile.posY < this.gameboardConfig.arraySize &&
      this.get(tile.posX, tile.posY + 1) &&
      tile.value === this.get(tile.posX, tile.posY + 1).value
    ) {
      return true;
    }

    return false;
  }

  checkGameOver() {
    if (this.getTilesOrdered()[0].value === this.gameboardConfig.winningTile) {
      this.gameboardConfig.gameOverSignal.dispatch(true);
    } else if (!this.canKeepPlaying()) {
      this.gameboardConfig.gameOverSignal.dispatch(false);
    }
  }

  sumTiles() {
    let points = 0;
    for (let tile of this.grid) {
      points += tile ? tile.value : 0;
    }
    return points;
  }

  abstract canUsePower();

  abstract power();

  // getColumnForDebug(row: number) {
  //   let val1 = this.get(row, 0) ? this.get(row, 0).value : 0;
  //   let val2 = this.get(row, 1) ? this.get(row, 1).value : 0;
  //   let val3 = this.get(row, 2) ? this.get(row, 2).value : 0;
  //   let val4 = this.get(row, 3) ? this.get(row, 3).value : 0;

  //   return `${val1}\n${val2}\n${val3}\n${val4}`;
  // }
}
