import GameboardConfig from './../../../Config/GameboardConfig';
import GameRules from './../GameRules';
import SimpleRules from './../Rules/SimpleRules';


export default class RulesFactory {
  static create(config: GameboardConfig): GameRules {
    return new SimpleRules(config);
  }
}