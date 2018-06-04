import Grid from './../Grid';
import GachaAddictionLogic from './../../Logic/PlayerLogic/GachaAddictionLogic';
import GameboardConfig from './../../Config/GameboardConfig';

export default class GachaAddiction extends Grid {
  protected gridLogic: GachaAddictionLogic;

  constructor(config: GameboardConfig) {
    let gridLogic = new GachaAddictionLogic(config);
    super(config, gridLogic);
  }
}
