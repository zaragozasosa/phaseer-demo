import Grid from './../Grid';
import ReportedForRPLogic from './../GridLogic/ReportedForRPLogic';
import GameboardConfig from './../../../Config/GameboardConfig';
import ChargeModel from './../../../Models/ChargeModel';

export default class ReportedForRP extends Grid {
  protected gridLogic: ReportedForRPLogic;
  private buttons: Phaser.Group;

  constructor(config: GameboardConfig) {
    let gridLogic = new ReportedForRPLogic(config);
    super(config, gridLogic);
  }

  getPowerConfiguration(){
    let config = [];
    config.push(new ChargeModel('sage', 50, () => this.sagedClick()));
    config.push(new ChargeModel('report', 350, () => this.reportedClick()));
    config.push(new ChargeModel('ban', 650, () => this.bannedClick()));

    return config;
  }

  private sagedClick() {
    if (this.gridLogic.sagePower()) {
      this.gameboardConfig.chargeSignal.dispatch();
    } else {
      this.tools.audio.playBeep();
    }
  }

  private reportedClick() {
    if (this.gridLogic.reportedPower()) {
      this.gameboardConfig.chargeSignal.dispatch();
    } else {
      this.tools.audio.playBeep();
    }
  }

  private bannedClick() {
    if (this.gridLogic.bannedPower()) {
      this.gameboardConfig.chargeSignal.dispatch();
    } else {
      this.tools.audio.playBeep();
    }
  }
}
