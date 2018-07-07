import Gameboard from './../Gameboard';

export default class AmmoGameboard extends Gameboard {
  start() {
    this.createGrid();
    this.createPlayerUI();
    this.gameboardConfig.updateAmmoSignal.add(
      function () {
        this.playerUI.update();
      }.bind(this)
    );
  }

  activatePower() {
    if (this.gameOver) {
      return true;
    }
    let response = this.grid.getPowerConfiguration();
    this.playerUI.activatePower(response);
  }
}
