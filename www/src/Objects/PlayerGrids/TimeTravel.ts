import Grid from './../Grid';
import TimeTravelLogic from './../../Logic/PlayerLogic/TimeTravelLogic';
import GameboardConfig from './../../Config/GameboardConfig';

export default class TimeTravel extends Grid {
  protected gridLogic: TimeTravelLogic;

  constructor(config: GameboardConfig) {
    let gridLogic = new TimeTravelLogic(config);
    super(config, gridLogic);
  }
}
