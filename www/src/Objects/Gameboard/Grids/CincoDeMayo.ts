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

  getPowerConfiguration() {
    this.ammo = this.gridLogic.getAmmo();
    this.gameboardConfig.clickTileSignal.add(function(tile: any) {
      this.gridLogic.power(tile);
    }.bind(this));
    return this.ammo;
  }
}