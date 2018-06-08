import Gameboard from './../Gameboard';
import GameboardConfig from './../../Config/GameboardConfig';
import PowerWindow from './../Windows/PowerWindow';
import DiamondModel from './../../Models/DiamondModel';

export default class CooldownGameboard extends Gameboard {
  private elements: Phaser.Group;

  constructor(gameboardConfig: GameboardConfig) {
    super(gameboardConfig);
    this.actionButton.kill();

    let group: Phaser.Group = this.grid.activatePower();
    this.elements = group;

    this.gameboardConfig.cooldownSignal.add(
      function(startCooldown) {
        if (startCooldown) {
          this.blockElements();
        }
      }.bind(this)
    );
  }

  private blockElements() {}
}
