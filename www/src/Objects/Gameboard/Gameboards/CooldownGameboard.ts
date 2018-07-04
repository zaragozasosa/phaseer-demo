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

  start() {
    this.createGrid();

    this.actionButton.kill();
    this.passedTurns = 0;
    this.cooldown = 0;
    this.powerStarted = false;
    this.powerFinished = false;
    let group: Phaser.Group = this.grid.activatePower();
    this.elements = group;
    this.cooldownText = this.tools.text.make(20, 150, 'Status: Idle', 50);
    this.cooldownText.alpha = 0;
    this.tools.misc.tweenTo(this.cooldownText, { alpha: 1 }, 500, true);
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
      this.cooldownText.setText('Status: Failure');
      this.powerFinished = true;
    } else if (this.powerStarted) {
      this.cooldownText.setText(
        `Status: ${this.turnsForPower - this.passedTurns} turns left`
      );
    } else if (this.turnsForPower && this.passedTurns === this.turnsForPower) {
      let turns: number = this.grid.activatePower();
      this.showMessage('You found the culprit!', 65);
      this.cooldownText.setText(`Status: ${turns} turns left`);
      this.passedTurns = 0;
      this.powerStarted = true;
    }

    if (this.cooldown && this.passedTurns === this.cooldown) {
      this.unblockElements();
    } else if (this.cooldown) {
      this.cooldownText.setText(
        `Status: ${this.cooldown - this.passedTurns} turns of cd`
      );
    }
  }

  private blockElements(cooldown) {
    this.passedTurns = 0;
    let elementsToKill = this.elements.getAll('tint', Phaser.Color.WHITE);
    for (let e of elementsToKill) {
      e.kill();
    }

    this.cooldown = cooldown;
    this.cooldownText.setText(`Status: ${cooldown} turns of cd`);
  }

  private unblockElements() {
    this.elements.callAll('revive', null);
    this.elements.setAllChildren('inputEnabled', true);
    this.cooldown = null;
    this.cooldownText.setText(`Status: Investigating`);
  }

  private cooldownPower(turnsToActivate) {
    this.elements.kill();
    this.turnsForPower = turnsToActivate;
    this.passedTurns = 0;
    this.showMessage('The culprit will appear soon!', 55);
    this.cooldownText.setText('Status: ?');
  }
}
