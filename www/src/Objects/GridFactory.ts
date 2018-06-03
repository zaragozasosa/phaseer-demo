import Grid from './Grid';
import BlackMagic from './PlayerGrids/BlackMagic';
import PowerGaming from './PlayerGrids/PowerGaming';
import DetectiveWork from './PlayerGrids/DetectiveWork';
import ReportedForRP from './PlayerGrids/ReportedForRP';
import GachaAddiction from './PlayerGrids/GachaAddiction';

import GameboardConfig from './../Config/GameboardConfig';

export default class GridFactory {
  static create(config: GameboardConfig): Grid {
    let power = config.mainTile.powerId.toLowerCase();
    switch (power) {
      case 'ReportedForRP'.toLowerCase():
        return new ReportedForRP(config);
      case 'PowerGaming'.toLowerCase():
        return new PowerGaming(config);
      case 'DetectiveWork'.toLowerCase():
        return new DetectiveWork(config);
      case 'GachaAddiction'.toLowerCase():
        return new GachaAddiction(config);
      default:
        return new BlackMagic(config);
    }
  }
}
