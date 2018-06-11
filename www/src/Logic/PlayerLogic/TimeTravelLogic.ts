import LogicalGrid from './../LogicalGrid';
import GameboardConfig from './../../Config/GameboardConfig';
import GridTile from './../../Objects/GridTile';
import DiamondModel from './../../Models/DiamondModel';

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
    this.turnsTimeStop = this.tools.misc.randomBetween(2, 4);
    this.turnsPassed = 0;
    this.tooglePauseTiles(true);
  }

  canUsePower() {
    return !this.isTimeStopped;
  }

  getPowerInfo() {
    return new DiamondModel(
      'diamond',
      this.gameboardConfig.requiredBugs,
      true,
      'Hello World! Time Stop!',
      'And time resumes!'
    );
  }

  protected prepareNewTurn() {
    this.playHighestMergeSFX();
    this.cleanGrid();
    this.gameboardConfig.turnsSignal.dispatch();

    if (this.isTimeStopped) {
      this.checkTime();
    } else {
      this.tryToAdd();
    }
  }

  private checkTime() {
    if (this.turnsPassed === this.turnsTimeStop) {
      this.isTimeStopped = false;
      this.tooglePauseTiles(false);
      this.gameboardConfig.cooldownSignal.dispatch();
      for (let i = 0; i < this.turnsTimeStop; i++) {
        this.tryToAdd();
      }
    } else {
      this.turnsPassed++;
    }
  }

  private tooglePauseTiles(pause: boolean) {
    for (let tile of this.getTilesOrdered()) {
      if (pause) {
        tile.startTimeStop();
      } else {
        tile.stopTimeStop();
      }
    }
  }

  protected mergeTile(nextTile: GridTile, previousTile: GridTile) {
    nextTile.value *= 2;
    previousTile.value = 0;
    previousTile.nextTile = nextTile;
    this.gameboardConfig.mergeTileSignal.dispatch();
  }
}