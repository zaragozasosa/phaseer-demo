import LogicalGrid from './../LogicalGrid';
import GameboardConfig from './../../Config/GameboardConfig';
import GridTile from './../../Objects/GridTile';

export default class ReportedForRPLogic extends LogicalGrid {
  private direction: number;
  constructor(gameboardConfig: GameboardConfig) {
    super(gameboardConfig);
    this.direction = null;
  }

  investigate(direction: number) {
    this.gameboardConfig.cooldownSignal.dispatch(true);
    this.direction = direction;
  }

  protected add() {
    if (!this.direction) {
      do {
        var ranX = this.tools.misc.randomBetween(0, 3);
        var ranY = this.tools.misc.randomBetween(0, 3);
      } while (this.get(ranX, ranY));

      this.makeNewTile(ranX, ranY);
    } else {
      let maxPosition = this.gameboardConfig.arraySize;
      if (this.direction === Phaser.Keyboard.UP) {
        this.makeNewTileAround(null, 0, 1);
      } else if (this.direction === Phaser.Keyboard.DOWN) {
        this.makeNewTileAround(null, maxPosition, -1);
      }
      if (this.direction === Phaser.Keyboard.LEFT) {
        this.makeNewTileAround(0, null, 1);
      }
      if (this.direction === Phaser.Keyboard.RIGHT) {
        this.makeNewTileAround(maxPosition, null, -1);
      }
    }
  }

  private makeNewTileAround(posX: number, posY: number, delta: number) {
    let max = this.gameboardConfig.arraySize;
    let min = 0;
    if (posX === null) {
      for(let x of this.randomListBetween(min, max)) {
        if (!this.get(x, posY)) {
          return this.makeNewTile(x, posY);
        }
      }

      if ((posY === min && delta === -1) || (posY === max && delta === 1)) {
        return;
      } else {
        return this.makeNewTileAround(null, posY + delta, delta);
      }
    } else if (posY === null) {
      for(let y of this.randomListBetween(min, max)) {
        if (!this.get(posX, y)) {
          return this.makeNewTile(posX, y);
        }
      }

      if ((posX === min && delta === -1) || (posX === max && delta === 1)) {
        return;
      } else {
        return this.makeNewTileAround(posX + delta, null, delta);
      }
    }
  }

  private makeNewTile(posX: number, posY: number) {
    var newTilePos;
    if (this.emptyTiles() > 6) {
      var chance = this.tools.misc.randomBetween(0, 99);
      (newTilePos = posX), posY, chance === 98 ? 2 : chance >= 90 ? 1 : 0;
    } else {
      newTilePos = 0;
    }
    let value = this.get(posX, posY);

    let tile = new GridTile(posX, posY, this.gameboardConfig, newTilePos);
    this.set(posX, posY, tile);
    this.tilesGroup.add(tile.getGroup);
  }

  private randomListBetween(min: number, max: number) {
    let list = []
    for(let i = min; i <= max; i++) {
      list.push(i);
    }
    return this.tools.misc.shuffleUniqueArray(list);
  }

  canUsePower() {
    return true;
  }

  power() {}
}
