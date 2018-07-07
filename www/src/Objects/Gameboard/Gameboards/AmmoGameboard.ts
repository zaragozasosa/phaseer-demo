import Gameboard from './../Gameboard';
import GameboardConfig from './../../../Config/GameboardConfig';
import AmmoModel from './../../../Models/AmmoModel';
import PowerWindow from './../../Windows/PowerWindow';
import AmmoBar from './../AmmoBar';

export default class AmmoGameboard extends Gameboard {
  protected ammoBar: AmmoBar;

  start() {
    this.createGrid();
    this.gameboardConfig.updateAmmoSignal.add(
      function() {
        this.updateAmmo();
      }.bind(this)
    );
  }

  activatePower() {
    if(this.gameOver) {
      return true;
    }

    this.playerUI.activatePower();
    this.tools.audio.playTwoSounds(this.gameboardConfig);
    
    let response = this.grid.activatePower();
    if (response && response instanceof AmmoModel) {
      let model: AmmoModel = response;
      this.ammoBar = new AmmoBar(model);
    }
  }

  private updateAmmo() {
    if (this.ammoBar.update() === 0) {
      this.gameboardConfig.clickTileSignal.removeAll();
    }
  }
}
