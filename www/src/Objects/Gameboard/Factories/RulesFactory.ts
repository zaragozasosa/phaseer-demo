import GameboardConfig from './../../../Config/GameboardConfig';
import GameRules from './../GameRules';
import SimpleRules from './../Rules/SimpleRules';
import SpecialRules from './../Rules/SpecialRules';

export default class RulesFactory {
  static create(config: GameboardConfig): GameRules {
    if (config.gameMode === GameboardConfig.GAME_MODE_SINGLE_PLAYER) {
      return new SimpleRules(config);
    } else {
      return new SpecialRules(config);
    }
  }
}
