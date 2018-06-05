import LogicalGrid from './../LogicalGrid';
import GameboardConfig from './../../Config/GameboardConfig';

export default class ReportedForRPLogic extends LogicalGrid {
  constructor(gameboardConfig: GameboardConfig) {
    super(gameboardConfig);
  }

  sagePower() {
    if (!this.isFull()) {

      var tiles = this.grid.filter(
        x => x && x.value == 1 * this.gameboardConfig.minimumValue
      );
      for(let tile of tiles) {
        tile.duplicate();
      }

      while(!this.isFull()) {
        this.add();        
      }
      this.cleanGrid();
      return true;
    } else {
      return false;
    }
  }

  reportedPower() {
    var tiles = this.grid.filter(
      x => x && x.value <= 2 * this.gameboardConfig.minimumValue
    );
    if (tiles.length) {
      for (let x = 0; x < tiles.length; x++) {
        if (tiles[x].value < 4 * this.gameboardConfig.minimumValue) {
          tiles[x].kill();
        }
      }
      this.cleanGrid();
      return true;
    } else {
      return false;
    }
  }

  bannedPower() {
    let tilesNum =
      (this.gameboardConfig.arraySize + 1) *
      (this.gameboardConfig.arraySize + 1);
    if (this.emptyTiles() < tilesNum - 4) {
      var tiles = this.getTilesOrdered();
      for (let x = 1; x < tiles.length; x++) {
        tiles[x].kill();
      }
      this.cleanGrid();
      return true;
    } else {
      return false;
    }
  }

  canUsePower() {
    return true;
  }

  power() {}
}
