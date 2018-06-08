import Gameboard from './../Gameboard';
import GameboardConfig from './../../Config/GameboardConfig';
import PowerWindow from './../Windows/PowerWindow';
import DiamondModel from './../../Models/DiamondModel';

export default class ChargeGameboard extends Gameboard {
  private buttons: Phaser.Group;
  private charges: number;
  private chargesText: Phaser.Text;

  constructor(gameboardConfig: GameboardConfig) {
    super(gameboardConfig);
    this.actionButton.kill();

    let group: Phaser.Group = this.grid.activatePower();
    this.buttons = group;
    this.charges = group.getAll().length;

    for (let button of group.getAll()) {
      button.inputEnabled = false;
      button.tint = Phaser.Color.GRAY;
    }

    this.tools.text.make(20, 155, 'Charges: ', 50);
    this.chargesText = this.tools.text.make(280, 155, `${this.charges}`, 50);

    this.gameboardConfig.chargeSignal.add(
      function() {
        this.useCharge();
      }.bind(this)
    );

    this.showOnce = true;
  }

  private useCharge() {
    this.charges--;
    this.chargesText.setText(`${this.charges}`);
    this.tools.audio.playTwoSounds(this.gameboardConfig);
    if (this.showOnce) {
      let window = new PowerWindow(this.gameboardConfig.mainTile);
      this.showOnce = false;
    }

    if (!this.charges) {
      this.buttons.removeAll(true);
    }
  }

  protected toogleButton(buttonStatus: number) {
    for (let button of this.buttons.getAll()) {
      if (buttonStatus === GameboardConfig.BUTTON_ACTIVE) {
        button.tint = Phaser.Color.WHITE;
        button.inputEnabled = true;
      }
      if (buttonStatus === GameboardConfig.BUTTON_SLEEP) {
        button.tint = Phaser.Color.WHITE;
        button.inputEnabled = false;
      } else if (buttonStatus === GameboardConfig.BUTTON_SLEEP_DISABLED) {
        button.tint = Phaser.Color.GRAY;
        button.inputEnabled = false;
      }
    }
  }
}
