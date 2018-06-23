import Grid from './../Grid';
import BlackMagicLogic from './../GridLogic/BlackMagicLogic';
import GameboardConfig from './../../../Config/GameboardConfig';

export default class BlackMagic extends Grid {
  protected gridLogic: BlackMagicLogic;

  constructor(config: GameboardConfig) {
    let gridLogic = new BlackMagicLogic(config);
    super(config, gridLogic);
  }
}
