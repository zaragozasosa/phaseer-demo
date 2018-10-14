import Grid from './../Grid';
import GameboardConfig from './../../../Config/GameboardConfig';
import AmmoModel from './../../../Models/AmmoModel';
import GridTile from './../GridTile';

export default class TimeTravel extends Grid {
  protected ammo: AmmoModel;

  constructor(config: GameboardConfig) {
    super(config);
  }

  getPowerConfiguration() {
    this.ammo = new AmmoModel('bullet', this.gameboardConfig.bulletAmmo, 175);

    this.gameboardConfig.clickTileSignal.add(
      function(tile: any) {
        this.power(tile);
      }.bind(this)
    );
    return this.ammo;
  }

  power(tile: GridTile) {
    if (this.grid.filter(x => x).length > 1) {
      tile.kill();
      this.cleanGrid();
      this.tools.audio.playSound('nacho-sfx', false);
      this.gameboardConfig.updateAmmoSignal.dispatch(tile);
    }
  }
}
