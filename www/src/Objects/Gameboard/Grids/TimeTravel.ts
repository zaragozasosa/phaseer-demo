import Grid from './../Grid';
import GameboardConfig from './../../../Config/GameboardConfig';
import DiamondModel from './../../../Models/DiamondModel';

export default class TimeTravel extends Grid {
  private bugInfo: DiamondModel;
  private isTimeStopped: boolean;
  private turnsTimeStop: number;
  private turnsPassed: number;
  constructor(config: GameboardConfig) {
    super(config);
    this.isTimeStopped = false;
  }

  getPowerConfiguration() {
    this.bugInfo = new DiamondModel(
      'bug',
      this.gameboardConfig.requiredBugs,
      true,
      'And time resumes!',
      1.4,
      -5,
      DiamondModel.TIME_TYPE
    );
    return this.bugInfo;
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
