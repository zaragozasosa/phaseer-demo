import LogicalGrid from './../LogicalGrid';
import GameboardConfig from './../../Config/GameboardConfig';

export default class ReportedForRPLogic extends LogicalGrid {
  constructor(gameboardConfig: GameboardConfig) {
    super(gameboardConfig);
  }

  power() {
    var tiles = this.getTilesOrdered();
    if (this.canUsePower()) {
      for(let x = 4; x < tiles.length; x++) {
        tiles[x].kill();
      }
      this.cleanGrid();
    }
  }

  canUsePower() {
    var tiles = this.getTilesOrdered();
    if (tiles.length > 4) {
      return true;
    } else {
      return false;
    }
  }
}
