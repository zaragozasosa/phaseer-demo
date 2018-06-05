import LogicalGrid from './../LogicalGrid';
import GameboardConfig from './../../Config/GameboardConfig';

export default class BlackMagicLogic extends LogicalGrid {
  constructor(gameboardConfig: GameboardConfig) {
    super(gameboardConfig);
  }

  power() {
    var tiles = this.getTilesOrdered(true);

    if (this.canUsePower()) {
      for (let x = 0; x < tiles.length; x++) {
        let value = tiles[x].value;
        let equalTiles = tiles.filter(x => x.value === value && x.isAlive);
        if (equalTiles.length > 1) {
          equalTiles[0].duplicate();
          equalTiles[1].kill();
        }
      }
      this.cleanGrid();
    }
  }

  canUsePower() {
    var tiles = this.getTilesOrdered();
    if (tiles.length > 5) {
      return true;
    } else {
      return false;
    }
  }  
}
