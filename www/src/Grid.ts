namespace MyGame {
  export class Grid {
    private game: Phaser.Game;
    private config: Config;
    private textFactory: TextFactory;
    private graphicsFactory: GraphicsFactory;
    private spriteFactory: SpriteFactory;

    tiles: Array<Tile>;
    tilesArray: TilesArray;
    tilesGroup: Phaser.Group;
    wallsGroup: Phaser.Group;
    framesGroup: Phaser.Group;

    animating: boolean;
    xSpeed: number;
    ySpeed: number;
    speed: number;
    isDirty: boolean;

    cursors: Phaser.CursorKeys;
    arraySize: number;

    gameboardCallback: any;

    constructor(gameboardCallback: any) {
      let singleton = Singleton.getInstance();
      this.game = singleton.game;
      this.config = singleton.config;
      this.textFactory = new TextFactory();
      this.graphicsFactory = new GraphicsFactory();
      this.spriteFactory = new SpriteFactory();

      this.gameboardCallback = gameboardCallback;

      this.tiles = new Array();
      this.xSpeed = 0;
      this.ySpeed = 0;
      this.speed = 3000 * this.config.scaleFactor;
      this.animating = false;
      this.arraySize = this.config.tileSettings.arraySize;
      this.wallsGroup = this.makeWalls();

      this.tilesArray = new TilesArray();
      this.tiles = [];
      this.tilesGroup = this.game.add.group();

      this.framesGroup = this.makeTileFrames();

      this.addNewTile();
      this.addNewTile();
      this.cursors = this.game.input.keyboard.createCursorKeys();
    }

    addNewTile() {
      do {
        var ranX = this.game.rnd.integerInRange(0, 3);
        var ranY = this.game.rnd.integerInRange(0, 3);
      } while (this.tilesArray.get(ranX, ranY));

      if (this.tilesArray.emptyTiles() > 6) {
        var chance = this.game.rnd.integerInRange(0, 99);
        this.tilesArray.set(
          ranX,
          ranY,
          chance === 98 ? 4 : chance >= 90 ? 2 : 1
        );
      } else {
        this.tilesArray.set(ranX, ranY, 1);
      }
      let value = this.tilesArray.get(ranX, ranY);

      let tile = new Tile(ranX, ranY, value, this.game, this.config);
      this.tilesGroup.add(tile.sprite);
      this.game.world.bringToTop(this.framesGroup);
    }

    update() {
      if (!this.animating) {
        if (this.cursors.left.justDown) {
          this.checkLogic(Phaser.Keyboard.LEFT, -this.speed, 0);
        } else if (this.cursors.right.justDown) {
          this.checkLogic(Phaser.Keyboard.RIGHT, this.speed, 0);
        } else if (this.cursors.up.justDown) {
          this.checkLogic(Phaser.Keyboard.UP, 0, -this.speed);
        } else if (this.cursors.down.justDown) {
          this.checkLogic(Phaser.Keyboard.DOWN, 0, this.speed);
        }
      } else {
        this.checkCollisions();
      }
    }

    checkCollisions() {
      this.game.physics.arcade.overlap(
        this.tilesGroup,
        this.tilesGroup,
        null,
        function(a: Phaser.Sprite, b: Phaser.Sprite) {
          if (a.key !== b.key) {
            a.position = a.previousPosition;
            b.position = b.previousPosition;
            a.body.stop();
            b.body.stop();
          }
          return true;
        }
      );

      this.game.physics.arcade.collide(this.tilesGroup, this.wallsGroup);

      let allStopped = true;
      this.tilesGroup.forEach(
        function(sprite: Phaser.Sprite) {
          if (sprite.body.velocity.x !== 0 || sprite.body.velocity.y !== 0) {
            allStopped = false;
          }
        }.bind(this)
      );

      if (allStopped) {
        this.animating = false;
        this.updateGameboard();
      }
    }

    updateGameboard() {
      this.tilesGroup.removeAll(true);
      this.tiles = [];

      for (let x = 0; x <= this.config.tileSettings.arraySize; x++) {
        for (let y = 0; y <= this.config.tileSettings.arraySize; y++) {
          let value = this.tilesArray.get(x, y);
          if (value !== 0) {
            let tile = new Tile(x, y, value, this.game, this.config);
            this.tiles.push(tile);
            this.tilesGroup.add(tile.sprite);
          }
        }
      }

      if (!this.tilesArray.isFull()) {
        this.addNewTile();
        this.gameboardCallback();
      }
    }

    checkLogic(keyboardInput: number, xSpeed: number, ySpeed: number) {
      this.xSpeed = xSpeed;
      this.ySpeed = ySpeed;
      this.isDirty = false;

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
          let tile = this.tilesArray.get(startX, startY);
          if (tile) {
            this.pushTile(startX, startY, keyboardInput);
          }
        } while (startX !== stopX);
      } while (startY !== stopY);

      if (this.isDirty) {
        this.animating = true;
        this.tilesGroup.forEach(
          function(sprite: Phaser.Sprite) {
            sprite.body.velocity.x = this.xSpeed;
            sprite.body.velocity.y = this.ySpeed;
          }.bind(this)
        );
      }
    }

    pushTile(x: number, y: number, keyboardInput: number) {
      let tile = this.tilesArray.get(x, y);
      let pushX =
        keyboardInput === Phaser.KeyCode.RIGHT
          ? 1
          : keyboardInput === Phaser.KeyCode.LEFT ? -1 : 0;
      let pushY =
        keyboardInput === Phaser.KeyCode.DOWN
          ? 1
          : keyboardInput === Phaser.KeyCode.UP ? -1 : 0;
      let actualX = x;
      let actualY = y;

      let newX = actualX + pushX;
      let newY = actualY + pushY;

      while (
        newX >= 0 &&
        newX <= this.arraySize &&
        newY >= 0 &&
        newY <= this.arraySize
      ) {
        let nextTile = this.tilesArray.get(newX, newY);
        if (nextTile === 0) {
          //move the tile
          this.tilesArray.set(newX, newY, tile);
          this.tilesArray.set(actualX, actualY, 0);
          actualX = newX;
          actualY = newY;
          this.isDirty = true;
        } else if (nextTile === tile) {
          //merge tiles
          tile *= 2;
          this.tilesArray.set(newX, newY, tile);
          this.tilesArray.set(actualX, actualY, 0);
          this.isDirty = true;
          break;
        } else {
          break;
        }

        newX += pushX;
        newY += pushY;
      }
    }

    makeWalls(): Phaser.Group {
      let config = this.config;
      let wallLength = config.tileSettings.tileSize * 4;
      this.graphicsFactory.drawGridRect();
      let group = this.game.add.group();

      let wall1 = this.graphicsFactory.makeWall(0, 0, 1, wallLength);

      let wall2 = this.graphicsFactory.makeWall(0, 0, wallLength, 1);

      let wall3 = this.graphicsFactory.makeWall(0, wallLength, wallLength, 1);

      let wall4 = this.graphicsFactory.makeWall(wallLength, 0, 1, wallLength);

      group.add(wall1);
      group.add(wall2);
      group.add(wall3);
      group.add(wall4);

      return group;
    }

    makeTileFrames(): Phaser.Group {
      let group = this.game.add.group();
      for (let x = 0; x <= this.arraySize; x++) {
        for (let y = 0; y <= this.arraySize; y++) {
          group.add(this.spriteFactory.makeTileFrame(x, y));
        }
      }
      return group;
    }
  }
}
