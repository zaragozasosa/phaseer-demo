import Gameboard from './../Gameboard';
import DiamondModel from './../../../Models/DiamondModel';

export default class DiamondGameboard extends Gameboard {
  protected diamonds: number;
  protected diamondModel: DiamondModel;

  start() {
    this.createGrid();
    
    this.gameboardConfig.mergeTileSignal.add(
      function() {
        this.diamonds++;
        this.playerUI.update(this.diamonds);
      }.bind(this)
    );

    this.diamondModel = this.grid.getPowerConfiguration();
    this.playerUI.create(() => this.activatePower(), this.diamondModel)
    this.diamonds = this.diamondModel.requiredDiamonds;
  }

  activatePower() {
    if(this.gameOver) {
      return true;
    }

    if (this.diamonds >= this.diamondModel.requiredDiamonds) {
      this.tools.audio.playTwoSounds(this.gameboardConfig);
      if (this.showOnce) {
        this.playerUI.activatePower();
        this.showOnce = false;
      }
      this.grid.activatePower();

      this.diamonds -= this.diamondModel.requiredDiamonds;
      this.playerUI.update(this.diamonds);
      this.playerUI.blockButtons();
    }
  }

  protected toggleButton(buttonStatus: number) {
    if(this.gameOver) {
      return true;
    }

    this.playerUI.toggleButton(buttonStatus);
  }
}
