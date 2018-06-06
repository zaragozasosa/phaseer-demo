import LogicalGrid from './../LogicalGrid';
import GameboardConfig from './../../Config/GameboardConfig';

export default class PowerGamingLogic extends LogicalGrid {
  constructor(gameboardConfig: GameboardConfig) {
    super(gameboardConfig);
  }

  power() {
    var tiles = this.getTilesOrdered();
    if (this.canUsePower()) {
      for (let x = 0; x < tiles.length; x++) {
        if (tiles[x].value < this.gameboardConfig.minimumValue * 32) {
          tiles[x].duplicate();
        }
      }
      this.cleanGrid();
    }
  }

  canUsePower() {
    var tiles = this.getTilesOrdered();
    if (
      tiles.length > 0 &&
      tiles[tiles.length - 1].value < this.gameboardConfig.minimumValue * 32
    ) {
      return true;
    } else {
      return false;
    }
  }
}
