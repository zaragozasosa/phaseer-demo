import LogicalGrid from './../LogicalGrid';
import GameboardConfig from './../../../Config/GameboardConfig';
import GridTile from './../GridTile';
import DiamondModel from './../../../Models/DiamondModel';

export default class TimeTravelLogic extends LogicalGrid {
  private isTimeStopped: boolean;
  private turnsTimeStop: number;
  private turnsPassed: number;
  constructor(gameboardConfig: GameboardConfig) {
    super(gameboardConfig);
    this.isTimeStopped = false;
  }

  power() {
    this.isTimeStopped = true;
    this.turnsTimeStop = this.tools.misc.randomBetween(3, 5);
    this.turnsPassed = 0;
    this.togglePauseTiles(true);
  }

  canUsePower() {
    return !this.isTimeStopped;
  }

  getPowerInfo() {
    return new DiamondModel(
      'bug',
      this.gameboardConfig.requiredBugs,
      true,
      'And time resumes!',
      2.5,
      -5,
      DiamondModel.TIME_TYPE
    );
  }

  protected newTurn() {
    this.cleanGrid();
    this.gameboardConfig.turnsSignal.dispatch();

    if (this.isTimeStopped) {
      this.checkTime();
    } else {
      this.gameRules.newTurn(this, this.grid);
    }
  }

  private checkTime() {
    if (this.turnsPassed === this.turnsTimeStop) {
      this.isTimeStopped = false;
      this.togglePauseTiles(false);
      this.gameboardConfig.cooldownSignal.dispatch();
      this.gameRules.newTurn(this, this.grid);
    } else {
      this.turnsPassed++;
    }
  }

  private togglePauseTiles(pause: boolean) {
    for (let tile of this.grid.getOrdered()) {
      if (pause) {
        tile.startTimeStop();
      } else {
        tile.stopTimeStop();
      }
    }
  }
}
