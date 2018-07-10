import Gameboard from './../Gameboard';
import AmmoGameboard from './../Gameboards/AmmoGameboard';
import ChargeGameboard from './../Gameboards/ChargeGameboard';
import CooldownGameboard from './../Gameboards/CooldownGameboard';
import DiamondGameboard from './../Gameboards/DiamondGameboard';
import SpecialDiamondGameboard from './../Gameboards/SpecialDiamondGameboard';
import SimplePowerGameboard from './../Gameboards/SimplePowerGameboard';
import GameboardUI from './../GameboardUI';
import SimpleUI from './../CharacterUI/SimpleUI';
import ChargeUI from './../CharacterUI/ChargeUI';
import CooldownUI from './../CharacterUI/CooldownUI';
import DiamondUI from './../CharacterUI/DiamondUI';
import SpecialDiamondUI from './../CharacterUI/SpecialDiamondUI';
import AmmoUI from './../CharacterUI/AmmoUI';
import GameboardConfig from './../../../Config/GameboardConfig';

export default class GameboardFactory {
  static create(config: GameboardConfig, gameUI: GameboardUI): Gameboard {
    let power = config.mainTile.powerId.toLowerCase();
    switch (power) {
      case 'RollForInitiative'.toLowerCase():
      case 'CincoDeMayo'.toLowerCase():
        return new AmmoGameboard(config, gameUI, new AmmoUI(config));
      case 'GachaAddiction'.toLowerCase():
        return new DiamondGameboard(config, gameUI, new DiamondUI(config));
      case 'TimeTravel'.toLowerCase():
        return new SpecialDiamondGameboard(config, gameUI, new SpecialDiamondUI(config));
      case 'ReportedForRP'.toLowerCase():
        return new ChargeGameboard(config, gameUI, new ChargeUI(config));
      case 'DetectiveWork'.toLowerCase():
        return new CooldownGameboard(config, gameUI, new CooldownUI(config));
      default:
        return new SimplePowerGameboard(config, gameUI, new SimpleUI(config));
    }
  }
}
