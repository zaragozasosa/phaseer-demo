import Grid from './../Grid';
import GachaAddictionLogic from './../../Logic/PlayerLogic/GachaAddictionLogic';
import GameboardConfig from './../../Config/GameboardConfig';
import DiamondModel from './../../Models/DiamondModel';

export default class GachaAddiction extends Grid {
  protected gridLogic: GachaAddictionLogic;
  private diamondInfo: DiamondModel;
  constructor(config: GameboardConfig) {
    let gridLogic = new GachaAddictionLogic(config);
    super(config, gridLogic);
  }

  activatePower() {
    if(this.diamondInfo) {
      this.gridLogic.power();
    } else {
      this.diamondInfo = this.gridLogic.getPowerInfo();
      return this.diamondInfo;
    }
  }
}
