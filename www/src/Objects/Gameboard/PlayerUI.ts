import Base from './../../Base';
import GameboardConfig from './../../Config/GameboardConfig';
import PowerWindow from './../Windows/PowerWindow';

export default abstract class PlayerUI extends Base {
  protected gameboardConfig: GameboardConfig;
  protected actionButton: Phaser.Button;

  constructor(gameboardConfig: GameboardConfig) {
    super();
    this.gameboardConfig = gameboardConfig;
  }

  create(callback: any, ...args): any {
    this.addPowerButton(callback);
  }

  addPowerButton(callbackFunction: any) {
    this.actionButton = this.tools.button.make(
      310,
      1250,
      ['power'],
      () => callbackFunction(),
      1.5
    );

    this.actionButton.inputEnabled = false;
    this.actionButton.tint = Phaser.Color.GRAY;

    this.tools.tween.appear(this.actionButton);
  }

  activatePower(...args) {
    this.tools.audio.playTwoSounds(this.gameboardConfig);
    this.actionButton.kill();
    new PowerWindow(this.gameboardConfig.mainTile);
  }

  toggleButton(buttonStatus: any) {
    if (buttonStatus === GameboardConfig.BUTTON_ACTIVE) {
      this.actionButton.inputEnabled = true;
      this.actionButton.tint = Phaser.Color.WHITE;
    }
    if (buttonStatus === GameboardConfig.BUTTON_SLEEP) {
      this.actionButton.inputEnabled = false;
      this.actionButton.tint = Phaser.Color.WHITE;
    } else if (buttonStatus === GameboardConfig.BUTTON_SLEEP_DISABLED) {
      this.actionButton.inputEnabled = false;
      this.actionButton.tint = Phaser.Color.GRAY;
    }
  }

  update(...args) { }

  updateSpecialElements(...args) {}

  blockButtons(...args) {}
}
