import LogicalGrid from './../LogicalGrid';
import GridTile from './../GridTile';
import AmmoModel from './../../../Models/AmmoModel';
import GameboardConfig from './../../../Config/GameboardConfig';

export default class CincoDeMayoLogic extends LogicalGrid {
  constructor(gameboardConfig: GameboardConfig) {
    super(gameboardConfig);
  }

  getAmmo() {
    return new AmmoModel('bullet', this.gameboardConfig.bulletAmmo, 175);
  }

  power(tile: GridTile) {
    if (this.grid.filter(x => x).length > 1) {
      tile.kill();
      this.cleanGrid();
      this.tools.audio.playSound('nacho-sfx', false);
      this.gameboardConfig.updateAmmoSignal.dispatch(tile);
      this.gameboardConfig.updateScoreSignal.dispatch(false);
    }
  }

  canUsePower() {
    return true;
  }
}
