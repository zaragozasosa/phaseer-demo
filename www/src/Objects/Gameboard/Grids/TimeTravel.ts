import Grid from './../Grid';
import TimeTravelLogic from './../Logic/TimeTravelLogic';
import GameboardConfig from './../../../Config/GameboardConfig';
import DiamondModel from './../../../Models/DiamondModel';

export default class TimeTravel extends Grid {
  protected gridLogic: TimeTravelLogic;
  private bugInfo: DiamondModel;
  constructor(config: GameboardConfig) {
    let gridLogic = new TimeTravelLogic(config);
    super(config, gridLogic);
  }

  activatePower() {
    this.gridLogic.power();
  }

  getPowerConfiguration() {
    this.bugInfo = this.gridLogic.getPowerInfo();
    return this.bugInfo;
  }
}
