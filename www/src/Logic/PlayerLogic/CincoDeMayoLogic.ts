import LogicalGrid from './../LogicalGrid';
import GridTile from './../../Objects/GridTile';
import AmmoModel from './../../Models/AmmoModel';
import GameboardConfig from './../../Config/GameboardConfig';

export default class CincoDeMayoLogic extends LogicalGrid {
  constructor(gameboardConfig: GameboardConfig) {
    super(gameboardConfig);
  }

  power() {
    return new AmmoModel('bullet', this.gameboardConfig.bulletAmmo, 140);
  }

  useAmmo(tile: GridTile) {
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
