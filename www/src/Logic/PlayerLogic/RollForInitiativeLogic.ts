import LogicalGrid from './../LogicalGrid';
import GridTile from './../../Objects/GridTile';
import AmmoModel from './../../Models/AmmoModel';
import GameboardConfig from './../../Config/GameboardConfig';

export default class RollForInitiativeLogic extends LogicalGrid {
  constructor(gameboardConfig: GameboardConfig) {
    super(gameboardConfig);
  }

  power() {
    return new AmmoModel('dice', this.gameboardConfig.diceAmmo, 140);
  }

  useAmmo(tile: GridTile) {
    if (this.canUsePower) {
      this.randomizeTile(tile);
      this.cleanGrid();
      this.tools.audio.playSound('magil-sfx', false);
      this.gameboardConfig.updateAmmoSignal.dispatch(tile);
      this.gameboardConfig.updateScoreSignal.dispatch(false);
    }
  }

  canUsePower() {
    var tiles = this.getTilesOrdered();
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
