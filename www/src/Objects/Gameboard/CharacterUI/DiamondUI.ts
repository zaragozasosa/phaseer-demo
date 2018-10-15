import PlayerUI from './../PlayerUI';
import GameboardConfig from './../../../Config/GameboardConfig';
import DiamondModel from './../../../Models/DiamondModel';
import PowerWindow from './../../Windows/PowerWindow';

export default class DiamondUI extends PlayerUI {
  protected gameboardConfig: GameboardConfig;
  protected actionButton: Phaser.Button;
  protected diamonds: number;
  protected diamondModel: DiamondModel;
  protected diamondSprite: Phaser.Sprite;
  protected diamondText: Phaser.Text;

  create(callback: any, diamondModel: DiamondModel) {
    this.addPowerButton(callback);

    this.diamondModel = diamondModel;
    this.diamonds = this.diamondModel.requiredDiamonds;
    this.diamondSprite = this.tools.sprite.createSprite(
      20,
      1345,
      this.diamondModel.id,
      this.diamondModel.scale,
      this.diamondModel.paddingX
    );
    this.diamondText = this.tools.text.make(
      100,
      1350,
      `: ${diamondModel.initialAmount}`,
      50
    );
    this.tools.tween.appear(this.diamondSprite);
    this.tools.tween.appear(this.diamondText);
  }

  update(diamonds: number) {
    this.diamonds = diamonds;
    this.diamondText.setText(`: ${this.diamonds}`);

    if (this.diamonds >= this.diamondModel.requiredDiamonds) {
      this.toggleButton(GameboardConfig.BUTTON_ACTIVE);
    }
  }

  blockButtons() {
    if (this.diamonds < this.diamondModel.requiredDiamonds) {
      this.toggleButton(GameboardConfig.BUTTON_SLEEP_DISABLED);
    }
  }

  activatePower() {
    new PowerWindow(this.gameboardConfig.mainTile);
  }

  updateSpecialElements() {
    this.actionButton.visible = true;
  }
}
