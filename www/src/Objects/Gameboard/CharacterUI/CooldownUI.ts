import PlayerUI from './../PlayerUI';
import PowerWindow from './../../Windows/PowerWindow';

export default class AmmoUI extends PlayerUI {
  private elements: Phaser.Group;
  private cooldownText: Phaser.Text;

  create(group: Phaser.Group) {
    this.elements = group;
    this.tools.tween.appear(group);
    this.cooldownText = this.tools.text.makeStroked(20, 1370, 'Status: Select a direction', 40);
    this.tools.tween.appear(this.cooldownText);
  }

  updateSpecialElements(text: string) {
    this.cooldownText.setText(text);
  }

  activatePower(text: string) {
    this.elements.kill();
    new PowerWindow(this.gameboardConfig.mainTile);
    this.cooldownText.setText('Status: The culprit will appear soon!');
  }

  blockButtons(block: boolean) {
    if (block) {
      let elementsToKill = this.elements.getAll('tint', Phaser.Color.WHITE);
      for (let e of elementsToKill) {
        e.kill();
      }
    } else {
      this.elements.callAll('revive', null);
      this.elements.setAllChildren('inputEnabled', true);
      this.cooldownText.setText(`Status: Investigating`);
    }
  }

  toggleButton(buttonStatus: any) {
  }
}
