import Grid from './../Grid';
import CincoDeMayoLogic from './../GridLogic/CincoDeMayoLogic';
import GameboardConfig from './../../../Config/GameboardConfig';
import AmmoModel from './../../../Models/AmmoModel';


export default class TimeTravel extends Grid {
  protected gridLogic: CincoDeMayoLogic;
  protected ammo: AmmoModel;

  constructor(config: GameboardConfig) {
    let gridLogic = new CincoDeMayoLogic(config);
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