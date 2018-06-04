import Grid from './../Grid';
import RollForInitiativeLogic from './../../Logic/PlayerLogic/RollForInitiativeLogic';
import GameboardConfig from './../../Config/GameboardConfig';
import AmmoModel from './../../Models/AmmoModel';

export default class TimeTravel extends Grid {
  protected gridLogic: RollForInitiativeLogic;
  protected ammo: AmmoModel;

  constructor(config: GameboardConfig) {
    let gridLogic = new RollForInitiativeLogic(config);
    super(config, gridLogic);
  }

  activatePower() {
    this.ammo = this.gridLogic.power();
    this.gameboardConfig.clickTileSignal.add(function(tile: any) {
      this.gridLogic.useAmmo(tile);
    }.bind(this));
    return this.ammo;
  }
}
