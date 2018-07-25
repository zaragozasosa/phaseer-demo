import Grid from './../Grid';
import GameboardConfig from './../../../Config/GameboardConfig';

export default class BlackMagic extends Grid {
  constructor(config: GameboardConfig) {
    super(config);
  }

  power() {
    var tiles = this.grid.getOrdered(true);

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
    var tiles = this.grid.getOrdered();
    if (tiles.length > 5) {
      return true;
    } else {
      return false;
    }
  }  
}
