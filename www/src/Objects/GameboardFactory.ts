import Gameboard from './Gameboard';
import AmmoGameboard from './Gameboards/AmmoGameboard';
import MultiButtonGameboard from './Gameboards/MultiButtonGameboard';
import DiamondGameboard from './Gameboards/DiamondGameboard';

import GameboardConfig from './../Config/GameboardConfig';

export default class GameboardFactory {
  static create(config: GameboardConfig): Gameboard {
    let power = config.mainTile.powerId.toLowerCase();
    switch (power) {
      case 'RollForInitiative'.toLowerCase():
      case 'CincoDeMayo'.toLowerCase():
        return new AmmoGameboard(config);
      case 'GachaAddiction'.toLowerCase():
        return new DiamondGameboard(config);
      case 'ReportedForRP'.toLowerCase():
        return new MultiButtonGameboard(config);
      default:
        return new Gameboard(config);
    }
  }
}
