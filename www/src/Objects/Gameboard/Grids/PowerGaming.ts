import Grid from './../Grid';
import GameboardConfig from './../../../Config/GameboardConfig';

export default class PowerGaming extends Grid {

  constructor(config: GameboardConfig) {
    super(config);
  }

  power() {
    var tiles = this.grid.getOrdered();
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
    var tiles = this.grid.getOrdered();
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
