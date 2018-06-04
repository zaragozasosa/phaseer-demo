import LogicalGrid from './../LogicalGrid';
import GameboardConfig from './../../Config/GameboardConfig';

export default class TimeTravelLogic extends LogicalGrid {
  private historyArray: Array<string>;
  constructor(gameboardConfig: GameboardConfig) {
    super(gameboardConfig);
    this.historyArray = [];
    this.addGridToHistory();
  }

  power() {
    if (this.canUsePower()) {
      let tiles = this.grid;
      let oldGrid = this.historyArray[this.historyArray.length - 4];
      this.reconfigureGrid(oldGrid.split(','));
    }
  }

  canUsePower() {
    if (this.historyArray.length > 3) {
      return true;
    } else {
      return false;
    }
  }

  onTilesStopped() {
    this.addGridToHistory();
  }

  protected tilesStopped() {
    let allStopped = true;

    if (this.grid.filter(x => x && x.isMoving).length) {
      allStopped = false;
    }

    if (allStopped) {
      this.onTilesStopped();
      this.updateGrid();
    }

    return allStopped;
  }

  private addGridToHistory() {
    let tiles = this.grid;
    let string = '';
    for (let tile of tiles) {
      if (!tile) {
        string += '0,';
      } else {
        string += `${tile.value},`;
      }
    }

    let history = string.slice(0, -1);
    this.historyArray.push(history);
  }
}
