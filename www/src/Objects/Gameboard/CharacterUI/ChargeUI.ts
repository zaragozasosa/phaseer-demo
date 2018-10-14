import PlayerUI from './../PlayerUI';
import GameboardConfig from './../../../Config/GameboardConfig';
import PowerWindow from './../../Windows/PowerWindow';
import ChargeModel from './../../../Models/ChargeModel';

export default class ChargeUI extends PlayerUI {
  protected gameboardConfig: GameboardConfig;
  protected actionButton: Phaser.Button;
  private buttons: Phaser.Group;
  private charges: number;
  private chargesText: Phaser.Text;

  create(buttonList: Array<ChargeModel>) {    
    this.buttons = this.tools.misc.addGroup();
    for(let b of buttonList) {
      this.buttons.add(
        this.tools.button.make(
          b.positionX,
          1250,
          [b.buttonId],
          () => b.callback()
        )
      );
    }
  
    this.buttons.alpha = 0;
    this.tools.tween.appear(this.buttons);
    this.charges = this.buttons.length;
    for (let button of this.buttons.getAll()) {
      button.inputEnabled = false;
      button.tint = Phaser.Color.GRAY;
    }

    let label =this.tools.text.make(20, 1370, 'Charges: ', 40);
    this.chargesText = this.tools.text.make(280, 1370, `${this.charges}`, 40);

    this.tools.tween.appear(label);
    this.tools.tween.appear(this.chargesText );
  }

  update() {
    this.tools.audio.playTwoSounds(this.gameboardConfig);
    this.charges--;
    this.chargesText.setText(`${this.charges}`);

    if (!this.charges) {
      this.buttons.removeAll(true);
    }
  }

  activatePower() {
		new PowerWindow(this.gameboardConfig.mainTile);		
  }
  
  toggleButton(buttonStatus: number) {
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
