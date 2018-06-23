import Grid from './Grid';
import BlackMagic from './Grids/BlackMagic';
import PowerGaming from './Grids/PowerGaming';
import DetectiveWork from './Grids/DetectiveWork';
import ReportedForRP from './Grids/ReportedForRP';
import GachaAddiction from './Grids/GachaAddiction';
import TimeTravel from './Grids/TimeTravel';
import RollForInitiative from './Grids/RollForInitiative';
import CincoDeMayo from './Grids/CincoDeMayo';

import GameboardConfig from './../../Config/GameboardConfig';

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
      case 'TimeTravel'.toLowerCase():
        return new TimeTravel(config);
      case 'RollForInitiative'.toLowerCase():
        return new RollForInitiative(config);
      case 'CincoDeMayo'.toLowerCase():
        return new CincoDeMayo(config);
      case 'BlackMagic'.toLowerCase():
        return new BlackMagic(config);
    }
  }
}
