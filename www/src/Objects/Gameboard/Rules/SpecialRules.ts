import GameRules from './../GameRules'
import GameboardConfig from './../../../Config/GameboardConfig';
import GridTile from './../GridTile';
import GridStructure from './../GridStructure';
import GhostTile from './../Tiles/GhostTile';
import Grid from './../Grid';
export default class SpecialRules extends GameRules {
	private bossTimer: Phaser.Timer;
	private bossTimerCounter: number;
	private bossNextScoreIncrease: number;
	private bossTimerNext: number;

	init(grid: Grid, structure: GridStructure) {
		super.init(grid, structure);
		this.bossTimerCounter = 0;
		this.bossTimerNext = 4;
		this.bossTimer = this.tools.misc.createTimer();
		this.bossTimer.loop(1000, this.updateBossTimer, this);
		this.bossTimer.start();		
  }

	newTurn() {
    this.playHighestMergeSFX();
    this.addNewTiles();
    this.checkGameOver();
	}

	addNewTiles() {
		this.grid.add();
		var size = this.gameboardConfig.arraySize + 1;
		var totalTiles = size * size;
		if(this.structure.count() < totalTiles - 10) {
			this.grid.add();
		}
	}

	updateBossTimer() {
		var misc = this.tools.misc;
		if(this.grid.isPaused) {
			return;
		}

		if(this.bossTimerCounter === this.bossTimerNext) {
			this.bossTimerNext = misc.randomBetween(1,2);
			this.bossNextScoreIncrease = misc.randomBetween(3,7) * 2;
			this.grid.alternativeScore += this.bossNextScoreIncrease;
			this.bossTimerCounter = 0;
			this.checkBossWin();
		} else {
			this.bossTimerCounter++;
		}
	}

	protected checkBossWin() {
		if(this.grid.alternativeScore > this.gameboardConfig.bossWinningTile * 2.2) {
			this.bossTimer.stop();
			this.gameboardConfig.gameOverSignal.dispatch(false);
		}
	}

	protected checkGameOver() {
    if (this.structure.getOrdered()[0].value === this.gameboardConfig.bossWinningTile) {
      this.gameboardConfig.gameOverSignal.dispatch(true);
    } else if (!this.canKeepPlaying()) {
      this.gameboardConfig.gameOverSignal.dispatch(false);
    }
  }
}
