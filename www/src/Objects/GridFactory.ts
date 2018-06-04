import Grid from './Grid';
import BlackMagic from './PlayerGrids/BlackMagic';
import PowerGaming from './PlayerGrids/PowerGaming';
import DetectiveWork from './PlayerGrids/DetectiveWork';
import ReportedForRP from './PlayerGrids/ReportedForRP';
import GachaAddiction from './PlayerGrids/GachaAddiction';
import TimeTravel from './PlayerGrids/TimeTravel';
import RollForInitiative from './PlayerGrids/RollForInitiative';
import CincoDeMayo from './PlayerGrids/CincoDeMayo';

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
