import Grid from './../Grid';
import ReportedForRPLogic from './../../Logic/PlayerLogic/ReportedForRPLogic';
import GameboardConfig from './../../Config/GameboardConfig';

export default class ReportedForRP extends Grid {
  protected gridLogic: ReportedForRPLogic;

  constructor(config: GameboardConfig) {
    let gridLogic = new ReportedForRPLogic(config);
    super(config, gridLogic);
  }
}
