import { Config, Singleton } from './../Models/Config';
import GameboardConfig from './../Objects/GameboardConfig';
import GridTile from './../Objects/GridTile';
import Factory from './Factory';

export default class LogicalGrid extends Factory {
  private grid: Array<GridTile>;
  private arraySize: number;
  private gameboardConfig: GameboardConfig;
  private lastMergedTile: GridTile;
  private tilesGroup: Phaser.Group;

  constructor(gameboardConfig: GameboardConfig) {
    super();
    this.gameboardConfig = gameboardConfig;
    this.arraySize = gameboardConfig.arraySize;
    this.tilesGroup = this.game.add.group();
    this.grid = [];

    for (let x = 0; x <= this.arraySize; x++) {
      for (let y = 0; y <= this.arraySize; y++) {
        this.grid.push(null);
      }
    }

    this.reorderTileList();

    this.add();
    this.add();
  }

  checkCollisions(wallsGroup: Phaser.Group) {
    for (let tile of this.grid.filter(x => x)) {
      this.game.physics.arcade.collide(tile.sprite, this.tilesGroup, function(
        a: Phaser.Sprite,
        b: Phaser.Sprite
      ) {
        if (a.key === b.key) {
          return false;
        }
        return true;
      });
      this.game.physics.arcade.collide(tile.sprite, wallsGroup);
    }

    return this.tilesStopped();
  }

  checkInput(keyboardInput: number) {
    var animating = false;

    let minX = keyboardInput === Phaser.KeyCode.LEFT ? 1 : 0;
    let minY = keyboardInput === Phaser.KeyCode.UP ? 1 : 0;

    let maxX =
      keyboardInput === Phaser.KeyCode.RIGHT
        ? this.arraySize - 1
        : this.arraySize;
    let maxY =
      keyboardInput === Phaser.KeyCode.DOWN
        ? this.arraySize - 1
        : this.arraySize;

    let startY = keyboardInput === Phaser.KeyCode.DOWN ? maxY : minY;
    let stopY = keyboardInput === Phaser.KeyCode.DOWN ? minY : maxY;
    let yIncrement = keyboardInput === Phaser.KeyCode.DOWN ? -1 : 1;
    let startX = keyboardInput === Phaser.KeyCode.RIGHT ? maxX : minX;
    let stopX = keyboardInput === Phaser.KeyCode.RIGHT ? minX : maxX;
    let xIncrement = keyboardInput === Phaser.KeyCode.RIGHT ? -1 : 1;

    startY -= yIncrement;
    do {
      startY += yIncrement;
      startX = keyboardInput === Phaser.KeyCode.RIGHT ? maxX : minX;
      startX -= xIncrement;
      do {
        startX += xIncrement;
        if (this.tryPushing(startX, startY, keyboardInput)) {
          animating = true;
        }
      } while (startX !== stopX);
    } while (startY !== stopY);

    return animating;
  }

  private tryPushing(x: number, y: number, keyboardInput: number) {
    let tile = this.get(x, y);
    if (tile) {
      if (this.pushTile(tile, keyboardInput)) {
        this.animateTile(tile, keyboardInput);
        return true;
      }
      return false;
    }
    return false;
  }

  private add() {
    var newTilePos;
    do {
      var ranX = this.game.rnd.integerInRange(0, 3);
      var ranY = this.game.rnd.integerInRange(0, 3);
    } while (this.get(ranX, ranY));

    if (this.emptyTiles() > 6) {
      var chance = this.game.rnd.integerInRange(0, 99);
      (newTilePos = ranX), ranY, chance === 98 ? 2 : chance >= 90 ? 1 : 0;
    } else {
      newTilePos = 0;
    }
    let value = this.get(ranX, ranY);

    let tile = new GridTile(ranX, ranY, this.gameboardConfig, newTilePos);
    this.set(ranX, ranY, tile);
    this.tilesGroup.add(tile.sprite);
  }

  private updateGrid() {
    if (this.lastMergedTile) {
      let value = this.lastMergedTile.value;
      if (
        (value !== this.gameboardConfig.minimumValue * 2 ||
          this.game.rnd.integerInRange(0, 3) === 0) &&
        (value !== this.gameboardConfig.minimumValue * 4 ||
          this.game.rnd.integerInRange(0, 2) === 0) &&
        (value !== this.gameboardConfig.minimumValue * 8 ||
          this.game.rnd.integerInRange(0, 2) === 0) &&
        (value !== this.gameboardConfig.minimumValue * 16 ||
          this.game.rnd.integerInRange(0, 1) === 0) &&
        (value !== this.gameboardConfig.minimumValue * 32 ||
          this.game.rnd.integerInRange(0, 1) === 0)
      ) {
        this.game.sound.play(this.lastMergedTile.model.sfxId, 1);
      }
    }

    this.lastMergedTile = null;
    this.mergeAndKillTiles();

    if (!this.isFull()) {
      this.add();
      return true;
    } else {
      return false;
    }
  }

  private reorderTileList() {
    let list = this.gameboardConfig.tiles;

    while (list[0].id !== this.gameboardConfig.mainTile.id) {
      let last = list.pop();
      list.unshift(last);
    }

    if (list[0].friendId !== list[1].id) {
      let secondArray = [];
      secondArray.push(list[0]);
      secondArray.push(list[list.length - 1]);
      let thirdArray = list.splice(1, list.length - 2);
      this.gameboardConfig.tiles = secondArray.concat(thirdArray);
    }

    let value = this.gameboardConfig.minimumValue;
    for (let tile of this.gameboardConfig.tiles) {
      tile.staticValue = value;
      value *= 2;
    }
  }

  private get(x: number, y: number): GridTile {
    let position = y * (this.arraySize + 1) + x;
    return this.grid[position];
  }

  private set(x: number, y: number, tile: GridTile) {
    let position = y * (this.arraySize + 1) + x;
    this.grid[position] = tile;
  }

  private animateTile(tile: GridTile, keyboardInput: number) {
    let distance = this.config.safeZone.safeWidth;
    let direction =
      keyboardInput === Phaser.Keyboard.UP
        ? Phaser.ANGLE_UP
        : keyboardInput === Phaser.Keyboard.DOWN
          ? Phaser.ANGLE_DOWN
          : Phaser.Keyboard.RIGHT ? Phaser.ANGLE_RIGHT : Phaser.ANGLE_LEFT;

    tile.sprite.body.moveTo(500, distance, direction);
    tile.sprite.body.stopVelocityOnCollide = true;
  }

  private tilesStopped() {
    let allStopped = true;
    let game = this.game;
    this.tilesGroup.forEach(
      function(sprite: Phaser.Sprite) {
        if (sprite.body.velocity.x !== 0 || sprite.body.velocity.y !== 0) {
          allStopped = false;
        }
      }.bind(this)
    );

    if(allStopped) {
      this.updateGrid();
    }

    return allStopped;
  }

  private pushTile(tile: GridTile, keyboardInput: number) {
    let isDirty = false;
    let pushX =
      keyboardInput === Phaser.KeyCode.RIGHT
        ? 1
        : keyboardInput === Phaser.KeyCode.LEFT ? -1 : 0;
    let pushY =
      keyboardInput === Phaser.KeyCode.DOWN
        ? 1
        : keyboardInput === Phaser.KeyCode.UP ? -1 : 0;
    let actualX = tile.posX;
    let actualY = tile.posY;

    let newX = actualX + pushX;
    let newY = actualY + pushY;

    while (
      newX >= 0 &&
      newX <= this.arraySize &&
      newY >= 0 &&
      newY <= this.arraySize
    ) {
      let nextTile = this.get(newX, newY);
      if (!nextTile || !nextTile.value) {
        //move the tile
        tile.posX = newX;
        tile.posY = newY;
        this.set(newX, newY, tile);
        this.set(actualX, actualY, null);
        actualX = newX;
        actualY = newY;
        isDirty = true;
      } else {
        if (nextTile && nextTile.value === tile.value) {
          //merge tiles
          let newValue = tile.value * 2;
          this.mergeTile(nextTile);
          this.killTile(tile);
          isDirty = true;
          this.lastMergedTile =
            this.lastMergedTile && this.lastMergedTile.value < newValue
              ? this.get(newX, newY)
              : this.lastMergedTile;
          break;
        } else {
          break;
        }
      }

      newX += pushX;
      newY += pushY;
    }
    return isDirty;
  }

  private killTile(tile: GridTile) {
    tile.willBeDestroyed = true;
    tile.value = 0;
  }

  private mergeTile(tile: GridTile) {
    tile.willBeMerged = true;
    tile.value *= 2;
  }

  private mergeAndKillTiles() {
    let kill = this.grid.filter(x => x && x.willBeDestroyed);
    if (kill.length) {
      console.log(kill);
    }
    for (let item of kill) {
      item.sprite.destroy();
      this.set(item.posX, item.posY, null);
    }

    let merge = this.grid.filter(x => x && x.willBeMerged);
    for (let item of merge) {
      let nextTile = this.gameboardConfig.tiles.find(
        x => x.staticValue === item.value
      );
      item.sprite.loadTexture(nextTile.id);
      this.set(item.posX, item.posY, item);
    }

    this.tilesGroup.removeAll();
    for (let item of this.grid) {
      if (item) {
        item.updateSprite();
        this.tilesGroup.add(item.sprite);
      }
    }

    if (this.grid.filter(x => x).length !== this.tilesGroup.children.length) {
      console.log(this.grid);
      console.log(this.tilesGroup.children);
      console.log('-----------');
    } else {
      console.log('-----------');
    }
  }

  private isFull(): boolean {
    for (let tile of this.grid) {
      if (!tile) {
        return false;
      }
    }
    return true;
  }

  private emptyTiles(): number {
    let empty = 0;
    for (let tile of this.grid) {
      if (tile && tile.value === 0) {
        empty++;
      }
    }
    return empty;
  }

  sumTiles() {
    let points = 0;
    for (let tile of this.grid) {
      points += tile ? tile.value : 0;
    }
    return points;
  }

  getColumnForDebug(row: number) {
    let val1 = this.get(row, 0) ? this.get(row, 0).value : 0;
    let val2 = this.get(row, 1) ? this.get(row, 1).value : 0;
    let val3 = this.get(row, 2) ? this.get(row, 2).value : 0;
    let val4 = this.get(row, 3) ? this.get(row, 3).value : 0;

    return `${val1}\n${val2}\n${val3}\n${val4}`;
  }
}
