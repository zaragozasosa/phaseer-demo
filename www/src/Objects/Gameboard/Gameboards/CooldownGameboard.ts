import Gameboard from './../Gameboard';

export default class CooldownGameboard extends Gameboard {
  private cooldown: number;
  private passedTurns: number;
  private turnsForPower: number;
  private powerStarted: boolean;
  private powerFinished: boolean;

  start() {
    this.createGrid();
    this.passedTurns = 0;
    this.cooldown = 0;
    this.powerStarted = false;
    this.powerFinished = false;
    let group = this.grid.getPowerConfiguration();
    this.playerUI.create(group);

    this.gameboardConfig.cooldownSignal.add(
      function(activatePower, cooldown, success) {
        if (success) {
          this.playerUI.updateSpecialElements('Status: Success!');
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
      this.playerUI.updateSpecialElements('Status: Failure!');
      this.powerFinished = true;
    } else if (this.powerStarted) {
      this.playerUI.updateSpecialElements(`Status: ${this.turnsForPower - this.passedTurns} turns left`);
    } else if (this.turnsForPower && this.passedTurns === this.turnsForPower) {
      let turns: number = this.grid.activatePower();
      this.showMessage('You found the culprit!', 65);
      this.playerUI.updateSpecialElements(`Status: ${turns} turns left`);
      this.passedTurns = 0;
      this.powerStarted = true;
    }

    if (this.cooldown && this.passedTurns === this.cooldown) {
      this.unblockElements();
    } else if (this.cooldown) {
      this.playerUI.updateSpecialElements(`Status: ${this.cooldown - this.passedTurns} turns of cd`);
    }
  }

  private blockElements(cooldown) {
    this.passedTurns = 0;
    this.cooldown = cooldown;
    this.playerUI.blockButtons(true);
    this.playerUI.updateSpecialElements(`Status: ${cooldown} turns of cd`);
  }

  private unblockElements() {
    this.cooldown = null;
    this.playerUI.blockButtons(false);
  }

  private cooldownPower(turnsToActivate) {
    this.turnsForPower = turnsToActivate;
    this.passedTurns = 0;
    this.playerUI.activatePower();
  }
}
