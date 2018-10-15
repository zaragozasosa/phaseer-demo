import GameboardConfig from './../../Config/GameboardConfig';
import GridTile from './GridTile';
import GridStructure from './GridStructure';
import GhostTile from './Tiles/GhostTile';
import Grid from './Grid';
import Base from './../../Base';

export default abstract class GameRules extends Base {
  protected gameboardConfig: GameboardConfig;
  protected lastMergedTile: GridTile;

  protected grid: Grid;
  protected structure: GridStructure;

  constructor(gameboardConfig: GameboardConfig) {
    super();
    this.gameboardConfig = gameboardConfig;
  }

  init(grid: Grid, structure: GridStructure) {
    this.grid = grid;
    this.structure = structure;
  }

  newTurn() {
    this.playHighestMergeSFX();
    this.grid.add();
    this.checkGameOver();
  }

  scanGrid(keyboardInput: number) {
    let animating = false;
    let arraySize = this.gameboardConfig.arraySize;

    let minX = keyboardInput === Phaser.KeyCode.LEFT ? 1 : 0;
    let minY = keyboardInput === Phaser.KeyCode.UP ? 1 : 0;

    let maxX =
      keyboardInput === Phaser.KeyCode.RIGHT ? arraySize - 1 : arraySize;
    let maxY =
      keyboardInput === Phaser.KeyCode.DOWN ? arraySize - 1 : arraySize;

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

  protected mergeTile(nextTile: GridTile, previousTile: GridTile) {
    nextTile.value *= 2;
    previousTile.value = 0;
    previousTile.nextTile = nextTile;

    this.gameboardConfig.mergeTileSignal.dispatch();

    if (nextTile instanceof GhostTile) {
      nextTile.stopGhost();
      this.gameboardConfig.cooldownSignal.dispatch(false, false, true);
    } else if (previousTile instanceof GhostTile) {
      this.gameboardConfig.cooldownSignal.dispatch(false, false, true);
    }
  }

  protected pushTile(
    x: number,
    y: number,
    keyboardInput: number
  ) {
    let arraySize = this.gameboardConfig.arraySize;

    let tile = this.structure.get(x, y);
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

    while (newX >= 0 && newX <= arraySize && newY >= 0 && newY <= arraySize) {
      let nextTile = this.structure.get(newX, newY);
      if (!nextTile || !nextTile.value) {
        //move the tile
        tile.posX = newX;
        tile.posY = newY;
        this.structure.set(newX, newY, tile);
        this.structure.set(actualX, actualY, null);
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
            : this.structure.get(newX, newY);
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

  protected checkGameOver() {
    if (this.structure.getOrdered()[0].value === this.gameboardConfig.winningTile) {
      this.gameboardConfig.gameOverSignal.dispatch(true);
    } else if (!this.canKeepPlaying()) {
      this.gameboardConfig.gameOverSignal.dispatch(false);
    }
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
      this.lastMergedTile = null;
    }
  }

  protected canKeepPlaying() {
    if (this.structure.isFull()) {
      for (let x = 0; x < this.gameboardConfig.arraySize; x++) {
        for (let y = 0; y < this.gameboardConfig.arraySize; y++) {
          var tile = this.structure.get(x, y);
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

  protected canBeMerged(tile: GridTile) {
    if (
      tile.posX > 0 &&
      this.structure.get(tile.posX - 1, tile.posY) &&
      tile.value === this.structure.get(tile.posX - 1, tile.posY).value
    ) {
      return true;
    }
    if (
      tile.posX < this.gameboardConfig.arraySize &&
      this.structure.get(tile.posX + 1, tile.posY) &&
      tile.value === this.structure.get(tile.posX + 1, tile.posY).value
    ) {
      return true;
    }

    if (
      tile.posY > 0 &&
      this.structure.get(tile.posX, tile.posY - 1) &&
      tile.value === this.structure.get(tile.posX, tile.posY - 1).value
    ) {
      return true;
    }

    if (
      tile.posY < this.gameboardConfig.arraySize &&
      this.structure.get(tile.posX, tile.posY + 1) &&
      tile.value === this.structure.get(tile.posX, tile.posY + 1).value
    ) {
      return true;
    }

    return false;
  }
}
