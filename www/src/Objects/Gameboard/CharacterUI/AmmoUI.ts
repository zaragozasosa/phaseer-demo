import PlayerUI from './../PlayerUI';
import PowerWindow from './../../Windows/PowerWindow';
import AmmoModel from './../../../Models/AmmoModel';
import AmmoBar from './../AmmoBar';

export default class AmmoUI extends PlayerUI {
  protected ammoBar: AmmoBar;

  update(diamonds: number) {
    if (this.ammoBar.update() === 0) {
      this.gameboardConfig.clickTileSignal.removeAll();
    }
  }

  activatePower(ammo: AmmoModel) {
    this.tools.audio.playTwoSounds(this.gameboardConfig);
    new PowerWindow(this.gameboardConfig.mainTile);		
    this.ammoBar = new AmmoBar(ammo);
    this.actionButton.kill();
	}
}
