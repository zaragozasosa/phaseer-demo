import LogicalGrid from './../LogicalGrid';
import GameboardConfig from './../../Config/GameboardConfig';

export default class BlackMagicLogic extends LogicalGrid {
  constructor(gameboardConfig: GameboardConfig) {
    super(gameboardConfig);
  }

  power() {
    var tiles = this.getTilesOrdered();
    if (this.canUsePower()) {
      var mergeTile = tiles[0];
      var deleteTile = tiles[1];
      mergeTile.duplicate();
      deleteTile.kill();
      this.cleanGrid();
    }
  }

  canUsePower() {
    var tiles = this.getTilesOrdered();
    if (tiles.length > 1 && tiles[0].value === tiles[1].value) {
      return true;
    } else {
      return false;
    }
  }  
}
