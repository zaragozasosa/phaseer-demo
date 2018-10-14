import DiamondGameboard from './DiamondGameboard';
import DiamondModel from './../../../Models/DiamondModel';

export default class SpecialDiamondGameboard extends DiamondGameboard {
  start() {
    super.start();

    if (this.diamondModel.cooldown) {
      this.gameboardConfig.cooldownSignal.add(
        function() {
          this.showMessage(this.diamondModel.endText, 65);

          if (this.diamondModel.type === DiamondModel.TIME_TYPE) {
            let normalBg = this.gameboardConfig.mainTile.power.backgroundId;
            this.background.loadTexture(normalBg);
            this.toggleTimer(false);
          }

          this.playerUI.updateSpecialElements();
        }.bind(this)
      );
    }

    for (let sprite of this.gameboardConfig.tiles) {
      this.tools.misc.cacheAddSpritesheet(
        sprite.negativeId,
        this.tools.sprite.makeReverseTexture(sprite.id)
      );
    }

    this.tools.misc.cacheAddImage(
      'negative-bg',
      this.tools.sprite.makeReverseTexture(
        this.gameboardConfig.mainTile.power.backgroundId
      )
    );
  }

  activatePower() {
    if (this.diamonds >= this.diamondModel.requiredDiamonds) {
      this.background.loadTexture('negative-bg');
      this.toggleTimer(true);
    }

    if (super.activatePower()) {
      return true;
    }
  }

  protected toggleTimer(paused = true) {
    if (paused) {
      this.timer.pause();
      this.gameboardUI.changeTimerColor(Phaser.Color.BLUE);
    } else {
      this.timer.resume();
      this.gameboardUI.changeTimerColor(Phaser.Color.WHITE);
    }
  }
}
