import Grid from './../Grid';
import DetectiveWorkLogic from './../../Logic/PlayerLogic/DetectiveWorkLogic';
import GameboardConfig from './../../Config/GameboardConfig';

export default class OldDetectiveWork extends Grid {
  protected gridLogic: DetectiveWorkLogic;

  constructor(config: GameboardConfig) {
    let gridLogic = new DetectiveWorkLogic(config);
    super(config, gridLogic);
  }
}
