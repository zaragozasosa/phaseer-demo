import Gameboard from './../Gameboard';
import GameboardConfig from './../../Config/GameboardConfig';
import PowerWindow from './../Windows/PowerWindow';
import DiamondModel from './../../Models/DiamondModel';

export default class DiamondGameboard extends Gameboard {
  private diamonds: number;
  private diamondModel: DiamondModel;
  private diamondSprite: Phaser.Sprite;
  private diamondText: Phaser.Text;

  constructor(gameboardConfig: GameboardConfig) {
    super(gameboardConfig);
    let mergeTileSignal = new Phaser.Signal();
    gameboardConfig.mergeTileSignal.add(
      function() {
        this.diamonds++;
        this.diamondText.setText(`: ${this.diamonds}`);
        this.tryEnableButton();
      }.bind(this)
    );

    this.diamondModel = this.grid.activatePower();

    this.diamonds = this.diamondModel.requiredDiamonds;
    this.diamondSprite = this.tools.sprite.createSprite(
      20,
      150,
      this.diamondModel.id
    );
    this.diamondText = this.tools.text.make(100, 155, `: ${this.diamonds}`, 50);

    if (this.diamondModel.cooldown) {
      this.gameboardConfig.cooldownSignal.add(
        function() {
          let text = this.tools.text.makeXBounded(
            650,
            this.diamondModel.endText,
            75,
            'center'
          );

          this.tools.misc.tweenVanishAndDestroy(
            text,
            { alpha: 0 },
            1500,
            'Linear',
            true,
            1500
          );

          this.actionButton.visible = true;
        }.bind(this)
      );
    }
  }

  activatePower() {
    if (this.diamonds >= this.diamondModel.requiredDiamonds) {
      this.tools.audio.playTwoSounds(this.gameboardConfig);
      if (this.showOnce) {
        let window = new PowerWindow(this.gameboardConfig.mainTile);
        this.showOnce = false;
      }
      this.grid.activatePower();
      this.diamonds -= this.diamondModel.requiredDiamonds;
      this.diamondText.setText(`: ${this.diamonds}`);
      this.tryDisableButton();
      if (this.diamondModel.cooldown) {
        this.actionButton.visible = false;
      }
    }
  }

  private tryEnableButton() {
    if (this.diamonds >= this.diamondModel.requiredDiamonds) {
      this.toogleButton(GameboardConfig.BUTTON_ACTIVE);
    }
  }

  private tryDisableButton() {
    if (this.diamonds < this.diamondModel.requiredDiamonds) {
      this.toogleButton(GameboardConfig.BUTTON_SLEEP_DISABLED);
    }
  }

  protected toogleButton(buttonStatus: number) {
    if (
      buttonStatus === GameboardConfig.BUTTON_ACTIVE &&
      this.diamonds >= this.diamondModel.requiredDiamonds
    ) {
      this.actionButton.inputEnabled = true;
      this.actionButton.tint = Phaser.Color.WHITE;
    }
    if (
      buttonStatus === GameboardConfig.BUTTON_SLEEP &&
      this.diamonds >= this.diamondModel.requiredDiamonds
    ) {
      this.actionButton.inputEnabled = false;
      this.actionButton.tint = Phaser.Color.WHITE;
    } else if (buttonStatus === GameboardConfig.BUTTON_SLEEP_DISABLED) {
      this.actionButton.inputEnabled = false;
      this.actionButton.tint = Phaser.Color.GRAY;
    }
  }
}
