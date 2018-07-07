import Gameboard from './../Gameboard';
import GameboardConfig from './../../../Config/GameboardConfig';
import PowerWindow from './../../Windows/PowerWindow';
import DiamondModel from './../../../Models/DiamondModel';

export default class DiamondGameboard extends Gameboard {
  private diamonds: number;
  private diamondModel: DiamondModel;
  private diamondSprite: Phaser.Sprite;
  private diamondText: Phaser.Text;

  start() {
    this.createGrid();
    
    let mergeTileSignal = new Phaser.Signal();
    this.gameboardConfig.mergeTileSignal.add(
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
      this.diamondModel.id,
      this.diamondModel.scale,
      this.diamondModel.paddingX
    );
    this.diamondText = this.tools.text.make(100, 155, `: ${this.diamonds}`, 50);
    this.tools.tween.appear(this.diamondSprite);
    this.tools.tween.appear(this.diamondText);
    

    if (this.diamondModel.cooldown) {
      this.gameboardConfig.cooldownSignal.add(
        function() {
          this.showMessage(this.diamondModel.endText, 65);

          if (this.diamondModel.type === DiamondModel.TIME_TYPE) {
            this.background.loadTexture('witch');
            this.toggleTimer(false);
          }

          this.actionButton.visible = true;
        }.bind(this)
      );
    }

    for (let sprite of this.gameboardConfig.tiles) {
      this.tools.misc.cacheAddImage(
        sprite.negativeId,
        this.tools.sprite.makeReverseTexture(sprite.id)
      );
    }

    this.tools.misc.cacheAddImage(
      'witch-negative',
      this.tools.sprite.makeReverseTexture(this.background.key.toString())
    );
  }

  activatePower() {
    if(this.gameOver) {
      return true;
    }

    if (this.diamonds >= this.diamondModel.requiredDiamonds) {
      this.tools.audio.playTwoSounds(this.gameboardConfig);
      if (this.showOnce) {
        let window = new PowerWindow(this.gameboardConfig.mainTile);
        this.showOnce = false;
      }
      this.grid.activatePower();
      if (this.diamondModel.type === DiamondModel.TIME_TYPE) {
        this.background.loadTexture('witch-negative');
        this.toggleTimer(true);
      }
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
      this.toggleButton(GameboardConfig.BUTTON_ACTIVE);
    }
  }

  private tryDisableButton() {
    if (this.diamonds < this.diamondModel.requiredDiamonds) {
      this.toggleButton(GameboardConfig.BUTTON_SLEEP_DISABLED);
    }
  }

  protected toggleButton(buttonStatus: number) {
    if(this.gameOver) {
      return true;
    }

    if (
      buttonStatus === GameboardConfig.BUTTON_ACTIVE &&
      this.diamonds >= this.diamondModel.requiredDiamonds
    ) {
      this.playerUI.toggleButton(buttonStatus);
    }
    if (
      buttonStatus === GameboardConfig.BUTTON_SLEEP &&
      this.diamonds >= this.diamondModel.requiredDiamonds
    ) {
      this.playerUI.toggleButton(buttonStatus);      
    } else if (buttonStatus === GameboardConfig.BUTTON_SLEEP_DISABLED) {
      this.playerUI.toggleButton(buttonStatus);      
    }
  }

  private toggleTimer(paused = true) {
    if (paused) {
      this.timer.pause();
      this.gameboardUI.changeTimerColor(Phaser.Color.BLUE);
    } else {
      this.timer.resume();
      this.gameboardUI.changeTimerColor(Phaser.Color.WHITE);
    }
  }
}
