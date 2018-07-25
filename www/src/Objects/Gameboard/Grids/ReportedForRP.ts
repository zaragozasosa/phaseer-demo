import Grid from './../Grid';
import GameboardConfig from './../../../Config/GameboardConfig';
import ChargeModel from './../../../Models/ChargeModel';

export default class ReportedForRP extends Grid {
  private buttons: Phaser.Group;

  constructor(config: GameboardConfig) {
    super(config);
  }

  getPowerConfiguration(){
    let config = [];
    config.push(new ChargeModel('sage', 50, () => this.sagedClick()));
    config.push(new ChargeModel('report', 350, () => this.reportedClick()));
    config.push(new ChargeModel('ban', 650, () => this.bannedClick()));

    return config;
  }

  private sagedClick() {
    if (this.sagePower()) {
      this.gameboardConfig.chargeSignal.dispatch();
    } else {
      this.tools.audio.playBeep();
    }
  }

  private reportedClick() {
    if (this.reportedPower()) {
      this.gameboardConfig.chargeSignal.dispatch();
    } else {
      this.tools.audio.playBeep();
    }
  }

  private bannedClick() {
    if (this.bannedPower()) {
      this.gameboardConfig.chargeSignal.dispatch();
    } else {
      this.tools.audio.playBeep();
    }
  }

  private sagePower() {
    if (!this.grid.isFull()) {

      var tiles = this.grid.filter(
        x => x && x.value == 1 * this.gameboardConfig.minimumValue
      );
      for(let tile of tiles) {
        tile.duplicate();
      }

      while(!this.grid.isFull()) {
        this.add();        
      }
      this.cleanGrid();
      return true;
    } else {
      return false;
    }
  }

  private reportedPower() {
    var tiles = this.grid.filter(
      x => x && x.value < 4 * this.gameboardConfig.minimumValue
    );
    if (tiles.length < this.grid.filter(x => x).length) {
      for (let x = 0; x < tiles.length; x++) {
        if (tiles[x].value < 4 * this.gameboardConfig.minimumValue) {
          tiles[x].kill();
        }
      }
      this.cleanGrid();
      return true;
    } else {
      return false;
    }
  }

  private bannedPower() {
    let tilesNum =
      (this.gameboardConfig.arraySize + 1) *
      (this.gameboardConfig.arraySize + 1);
    if (this.grid.emptyTiles() < tilesNum - 4) {
      var tiles = this.grid.getOrdered();
      for (let x = 1; x < tiles.length; x++) {
        tiles[x].kill();
      }
      this.cleanGrid();
      return true;
    } else {
      return false;
    }
  }
}
