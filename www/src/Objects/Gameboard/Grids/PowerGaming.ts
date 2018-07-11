import Grid from './../Grid';
import PowerGamingLogic from './../Logic/PowerGamingLogic';
import GameboardConfig from './../../../Config/GameboardConfig';

export default class PowerGaming extends Grid {
  protected gridLogic: PowerGamingLogic;

  constructor(config: GameboardConfig) {
    let gridLogic = new PowerGamingLogic(config);
    super(config, gridLogic);
  }
}
