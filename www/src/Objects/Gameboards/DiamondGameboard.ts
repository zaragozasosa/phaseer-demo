import Gameboard from './../Gameboard';
import GameboardConfig from './../../Config/GameboardConfig';
import PowerWindow from './../Windows/PowerWindow';
import DiamondModel from './../../Models/DiamondModel';


export default class DiamondGameboard extends Gameboard {
  private diamonds: number;
  private diamondModel: DiamondModel;
  private diamondSprite: Phaser.Sprite;
  private diamondText: Phaser.Text;
  private showOnce: boolean;

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

    this.diamonds= this.diamondModel.requiredDiamonds;
    this.diamondSprite = this.tools.sprite.createSprite(20, 150, this.diamondModel.id);
    this.diamondText = this.tools.text.make(100, 155, `: ${this.diamonds}`, 50);
    this.showOnce = true;
  }

  activatePower() {
    if (this.diamonds >= this.diamondModel.requiredDiamonds) {
      this.tools.audio.playTwoSounds(this.gameboardConfig);            
      if(this.showOnce) {
        let window = new PowerWindow(this.gameboardConfig.mainTile);
        this.showOnce = false;        
      }
      this.grid.activatePower();
      this.diamonds -= this.diamondModel.requiredDiamonds;
      this.diamondText.setText(`: ${this.diamonds}`);
      this.tryDisableButton();
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
}
