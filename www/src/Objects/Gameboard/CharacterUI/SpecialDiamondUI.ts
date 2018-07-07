import DiamondUI from './DiamondUI';
import GameboardConfig from './../../../Config/GameboardConfig';

export default class SpecialDiamondUI extends DiamondUI {
  blockButtons() {
    this.actionButton.visible = false;

    if (this.diamonds < this.diamondModel.requiredDiamonds) {
      this.toggleButton(GameboardConfig.BUTTON_SLEEP_DISABLED);
    }
  }
}
