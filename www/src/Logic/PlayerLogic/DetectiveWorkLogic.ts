import LogicalGrid from './../LogicalGrid';
import GameboardConfig from './../../Config/GameboardConfig';

export default class DetectiveWorkLogic extends LogicalGrid {
  constructor(gameboardConfig: GameboardConfig) {
    super(gameboardConfig);
  }

  power() {
    let tiles = this.getTilesOrdered();
    if (this.canUsePower()) {
      for (let x = 0; x < tiles.length; x++) {
        let value = tiles[x].value;
        let equalTiles = tiles.filter(x => x.value === value && x.isAlive);
        if (equalTiles.length % 2 === 1) {
          tiles[x].kill();
        }
      }
      this.cleanGrid();
    }
  }

  canUsePower() {
    let tiles = this.getTilesOrdered();

    for (let x = 0; x < tiles.length; x++) {
      let value = tiles[x].value;
      let equalTiles = tiles.filter(x => x.value === value);
      if (equalTiles.length % 2 === 1 ) {
        return true;
      }
    }
    return false;
  }
}
