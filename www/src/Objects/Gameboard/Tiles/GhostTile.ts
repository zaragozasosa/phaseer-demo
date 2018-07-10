import GridTile from './../GridTile';
import GameboardConfig from './../../../Config/GameboardConfig';

export default class GhostTile extends GridTile {
  private ghostTween: Phaser.Tween;
  private ghostCooldown: number;
  private ghostTurns: number;

  constructor(
    x: number,
    y: number,
    gameboardConfig: GameboardConfig,
    newTile = true,
    value = 0,
    ghostCooldown = 0
  ) {
    super(x, y, gameboardConfig, newTile, value);
    let tween = this.tools.tween;

    this.ghostTween = tween.blink(this.group);
      this.group.alpha = 1;
      this.ghostCooldown = ghostCooldown;
      this.ghostTurns = 0;
      this.ghostTween.start();
  }

  stopGhost() {
    if (this.ghostTween.isRunning) {
      this.ghostTween.stop();
    }
    this.ghostCooldown = undefined;
  }

  checkGhostTurns() {
    if (this.ghostCooldown) {
      this.ghostTurns++;
      if (this.ghostCooldown === this.ghostTurns) {
        this.kill();
        this.ghostCooldown = null;
        return true;
      }
    }
    return false;
  }
}