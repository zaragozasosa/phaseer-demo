import LogicalGrid from './../LogicalGrid';
import GameboardConfig from './../../Config/GameboardConfig';

export default class GachaAddictionLogic extends LogicalGrid {
  constructor(gameboardConfig: GameboardConfig) {
    super(gameboardConfig);
  }

  power() {
    var tiles = this.getTilesOrdered();
    if (this.canUsePower()) {
      let unique = tiles
        .map(item => item.value)
        .filter((value, index, self) => self.indexOf(value) === index);

      let maxValue = tiles[0].value;
      let minValue = tiles[tiles.length - 1].value;
      let maxTilePercentage = 20 - (unique.length - 3) * 2.5;

      if (maxTilePercentage < 10) {
        maxTilePercentage = 10;
      }

      let minTilePercentage = 30 - (unique.length - 3) * 2.5;
      if (minTilePercentage < 20) {
        minTilePercentage = 20;
      }

      for (let x = 0; x < tiles.length; x++) {
        tiles[x].randomize(
          maxValue,
          maxTilePercentage,
          minValue,
          minTilePercentage
        );
      }
      this.cleanGrid();
    }
  }

  canUsePower() {
    var tiles = this.getTilesOrdered();
    let unique = tiles
      .map(item => item.value)
      .filter((value, index, self) => self.indexOf(value) === index);

    if (unique.length > 2) {
      return true;
    } else {
      return false;
    }
  }
}
