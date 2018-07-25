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
    this.ammo = new AmmoModel('dice', this.gameboardConfig.diceAmmo, 140);
    this.gameboardConfig.clickTileSignal.add(function(tile: any) {
      this.power(tile);
    }.bind(this));
    return this.ammo;
  }

  power(tile: GridTile) {
    if (this.canUsePower) {
      this.randomizeTile(tile);
      this.cleanGrid();
      this.tools.audio.playSound('magil-sfx', false);
      this.gameboardConfig.updateAmmoSignal.dispatch(tile);
      this.gameboardConfig.updateScoreSignal.dispatch(false);
    }
  }

  canUsePower() {
    var tiles = this.grid.getOrdered();
    let unique = tiles
      .map(item => item.value)
      .filter((value, index, self) => self.indexOf(value) === index);

    if (unique.length > 2) {
      return true;
    } else {
      return false;
    }
  }
}
