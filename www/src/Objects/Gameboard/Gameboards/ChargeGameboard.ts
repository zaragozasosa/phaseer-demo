import Gameboard from './../Gameboard';

export default class ChargeGameboard extends Gameboard {

  start() {
    this.createGrid();
    let buttonsInfo = this.grid.getPowerConfiguration();
    this.playerUI.create(buttonsInfo);
    this.showOnce = true;

    this.gameboardConfig.chargeSignal.add(
      function() {
        this.useCharge();
      }.bind(this)
    );
  }

  private useCharge() {
    this.playerUI.update();
    
    if (this.showOnce) {
      this.playerUI.activatePower();
      this.showOnce = false;
    }
  }

  protected toggleButton(buttonStatus: number) {
    if (this.gameState.gameOver) {
      return true;
    }

    this.playerUI.toggleButton(buttonStatus);
  }
}
