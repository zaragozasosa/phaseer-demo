import Grid from './../Grid';
import GameboardConfig from './../../../Config/GameboardConfig';
import DiamondModel from './../../../Models/DiamondModel';
import GridTile from './../GridTile';

export default class GachaAddiction extends Grid {
  private diamondInfo: DiamondModel;
  constructor(config: GameboardConfig) {
    super(config);
  }

  activatePower() {
    this.power();
  }

  getPowerConfiguration() {
    this.diamondInfo = new DiamondModel('diamond', this.gameboardConfig.requiredDiamonds);
    return this.diamondInfo;
  }

  power() {
    var tiles = this.grid.getOrdered();
    if (this.canUsePower()) {

      let maxValue = tiles[0].value;
      let minValue = tiles[tiles.length - 1].value;
      let maxTilePercentage = 20 - (tiles.length - 3);

      if (maxTilePercentage < 10) {
        maxTilePercentage = 10;
      }

      let minTilePercentage = 30 - (tiles.length - 3) * 2;
      if (minTilePercentage < 20) {
        minTilePercentage = 20;
      }

      let meanIndex = Math.round(tiles.length / 2) -1;
      let meanValue = tiles[meanIndex].value;
      let meanChance = 20;

      for (let x = 0; x < tiles.length; x++) {
        tiles[x].randomize(
          maxValue,
          maxTilePercentage,
          minValue,
          minTilePercentage,
          meanValue,
          meanChance
        );
      }
      this.cleanGrid();
    }
  }

  canUsePower() {
    var tiles = this.grid.getOrdered();
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
