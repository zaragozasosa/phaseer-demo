import Grid from './../Grid';
import GameboardConfig from './../../../Config/GameboardConfig';
import GridTile from './../GridTile';
import GhostTile from './../Tiles/GhostTile';

export default class DetectiveWork extends Grid {
  private elements: Phaser.Group;
  private direction: number;
  private makeGhost: boolean;
  private turnsToDisappear: number;
  private ghostTileValue: number;

  constructor(config: GameboardConfig) {
    super(config);
    this.direction = null;
    this.makeGhost = false;
  }

  activatePower() {
    return this.createGhostTile();
  }

  getPowerConfiguration() {
    let group = this.tools.misc.addGroup();
    group.inputEnableChildren = true;

    group.add(this.tools.text.make(50, 1195, 'UP', 45));
    group.add(this.tools.text.make(200, 1195, 'DOWN', 45));
    group.add(this.tools.text.make(475, 1195, 'LEFT', 45));
    group.add(this.tools.text.make(700, 1195, 'RIGHT', 45));

    let btn = this.tools.text.makeXBounded(1240, 'SEARCH', 60, 'center');
    btn.tint = Phaser.Color.GRAY;
    group.add(btn);
    btn.inputEnabled = false;

    group.onChildInputDown.add(
      function (child: Phaser.Text) {
        group.setAllChildren('tint', Phaser.Color.WHITE);
        child.tint = Phaser.Color.RED;
        if (child.text === 'UP') {
          this.changeFlow(Phaser.Keyboard.UP);
        } else if (child.text === 'DOWN') {
          this.changeFlow(Phaser.Keyboard.DOWN);
        } else if (child.text === 'LEFT') {
          this.changeFlow(Phaser.Keyboard.LEFT);
        } else if (child.text === 'RIGHT') {
          this.changeFlow(Phaser.Keyboard.RIGHT);
        } else {
          this.investigate();
        }
      }.bind(this)
    );

    this.elements = group;
    return group;
  }

  add() {
    if (this.grid.isFull()) {
      return;
    }

    let pos = this.getTileNewPosition();

    if (this.makeGhost) {
      let tile = new GhostTile(
        pos.x,
        pos.y,
        this.gameboardConfig,
        null,
        this.ghostTileValue,
        this.turnsToDisappear
      );
      this.grid.set(pos.x, pos.y, tile);
      this.tilesGroup.add(tile.getGroup);
      this.direction = null;
      this.makeGhost = false;
      this.gameboardConfig.turnsSignal.add(
        function() {
          if (tile.checkGhostTurns()) {
            this.cleanGrid();
          }
        }.bind(this)
      );
    } else {
    let tile = new GridTile(pos.x, pos.y, this.gameboardConfig);
    this.grid.set(pos.x, pos.y, tile);
    this.tilesGroup.add(tile.getGroup);
    }
  }

  protected getTileNewPosition() {
    debugger;
    let maxPosition = this.gameboardConfig.arraySize;
    if (!this.direction) {
      return super.getTileNewPosition();
    } else {
      if (this.direction === Phaser.Keyboard.UP) {
        return this.makeNewTileAround(null, 0, 1);
      } else if (this.direction === Phaser.Keyboard.DOWN) {
        return this.makeNewTileAround(null, maxPosition, -1);
      }
      if (this.direction === Phaser.Keyboard.LEFT) {
        return this.makeNewTileAround(0, null, 1);
      }
      if (this.direction === Phaser.Keyboard.RIGHT) {
        return this.makeNewTileAround(maxPosition, null, -1);
      }
    }
  }

  private changeFlow(direction: number) {
    this.gameboardConfig.cooldownSignal.dispatch(false, 5);
    this.direction = direction;
  }

  private investigate() {
    let turnsToActivate = this.tools.misc.randomBetween(2, 6);
    this.gameboardConfig.cooldownSignal.dispatch(true, turnsToActivate);
  }

  private createGhostTile() {
    this.makeGhost = true;
    this.ghostTileValue = this.grid.getOrdered()[0].value;

    if(this.ghostTileValue === this.gameboardConfig.winningTile || this.ghostTileValue === this.gameboardConfig.winningTile / 2) {
      this.turnsToDisappear = 3;
    } else if(this.ghostTileValue === this.gameboardConfig.winningTile / 4) {
      this.turnsToDisappear = 3;
    } else if(this.ghostTileValue === this.gameboardConfig.winningTile / 8) {
      this.turnsToDisappear = 4;
    } else {
      this.turnsToDisappear = 5;
    }

    this.add();
    return this.turnsToDisappear;
  }

  private makeNewTileAround(posX: number, posY: number, delta: number) {
    let max = this.gameboardConfig.arraySize;
    let min = 0;
    if (posX === null) {
      for (let x of this.randomListBetween(min, max)) {
        if (!this.grid.get(x, posY)) {
          return new Phaser.Point(x, posY);
        }
      }

      if ((posY === min && delta === -1) || (posY === max && delta === 1)) {
        return;
      } else {
        return this.makeNewTileAround(null, posY + delta, delta);
      }
    } else if (posY === null) {
      for (let y of this.randomListBetween(min, max)) {
        if (!this.grid.get(posX, y)) {
          return new Phaser.Point(posX, y);
        }
      }

      if ((posX === min && delta === -1) || (posX === max && delta === 1)) {
        return;
      } else {
        return this.makeNewTileAround(posX + delta, null, delta);
      }
    }
  }

  private randomListBetween(min: number, max: number) {
    let list = [];
    for (let i = min; i <= max; i++) {
      list.push(i);
    }
    return this.tools.misc.shuffleUniqueArray(list);
  }
}
