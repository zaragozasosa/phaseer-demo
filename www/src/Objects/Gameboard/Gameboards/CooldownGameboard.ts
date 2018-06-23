import Gameboard from './../Gameboard';
import GameboardConfig from './../../../Config/GameboardConfig';

export default class CooldownGameboard extends Gameboard {
  private elements: Phaser.Group;
  private cooldownText: Phaser.Text;
  private cooldown: number;
  private passedTurns: number;
  private turnsForPower: number;
  private powerStarted: boolean;
  private powerFinished: boolean;

  constructor(gameboardConfig: GameboardConfig) {
    super(gameboardConfig);
    this.actionButton.kill();
    this.passedTurns = 0;
    this.cooldown = 0;
    this.powerStarted = false;
    this.powerFinished = false;
    let group: Phaser.Group = this.grid.activatePower();
    this.elements = group;
    this.cooldownText = this.tools.text.make(20, 150, 'Status: Ready!', 50);
    this.gameboardConfig.cooldownSignal.add(
      function(activatePower, cooldown, success) {
        if (success) {
          this.cooldownText.setText(`Status: Success!`);
          this.powerFinished = true;
        } else if (activatePower) {
          this.cooldownPower(cooldown);
        } else {
          this.blockElements(cooldown);
        }
      }.bind(this)
    );

    this.gameboardConfig.turnsSignal.add(
      function() {
        if (!this.powerFinished) {
          this.newTurn();
        }
      }.bind(this)
    );
  }

  private newTurn() {
    this.passedTurns++;

    if (this.powerStarted && this.passedTurns === this.turnsForPower) {
      this.cooldownText.setText('Status: Culprit ran away...');
      this.powerFinished = true;
    } else if (this.powerStarted) {
      this.cooldownText.setText(
        `Status: Will escape in ${this.turnsForPower -
          this.passedTurns}`
      );
    } else if (this.turnsForPower && this.passedTurns === this.turnsForPower) {
      let turns: number = this.grid.activatePower();
      this.cooldownText.setText(`Status: Will escape in ${turns}`);
      this.passedTurns = 0;
      this.powerStarted = true;
    }

    if (this.cooldown && this.passedTurns === this.cooldown) {
      this.unblockElements();
    } else if (this.cooldown) {
      this.cooldownText.setText(
        `Status: ${this.cooldown - this.passedTurns} turns of cooldown.`
      );
    }
  }

  private blockElements(cooldown) {
    this.passedTurns = 0;
    this.elements.getTop().tint = Phaser.Color.GRAY;
    this.elements.setAllChildren('inputEnabled', false);
    this.cooldown = cooldown;
    this.cooldownText.setText(`Status: ${cooldown} turns of cooldown.`);
  }

  private unblockElements() {
    this.elements.getTop().tint = Phaser.Color.WHITE;
    this.elements.setAllChildren('inputEnabled', true);
    this.cooldown = null;
    this.cooldownText.setText(`Status: Ready!`);
  }

  private cooldownPower(turnsToActivate) {
    this.elements.kill();
    this.turnsForPower = turnsToActivate;
    this.passedTurns = 0;
    this.cooldownText.setText('Status: Culprit will appear soon!');
  }
}
