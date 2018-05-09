namespace MyGame {
  export class Grid {
    game: Phaser.Game;
    config: Config;
    textFactory: TextFactory;

    tiles: Array<Tile>;
    tilesArray: Array<number>;
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

      this.gameboardCallback = gameboardCallback;

      this.tiles = new Array();
      this.xSpeed = 0;
      this.ySpeed = 0;
      this.speed = 3000 * this.config.scaleFactor;
      this.animating = false;
      this.arraySize = this.config.tileSettings.arraySize;
      this.wallsGroup = this.game.add.group();

      this.createWalls();

      this.tilesArray = this.config.tileSettings.initialArray;
      this.tilesGroup = this.game.add.group();

      this.framesGroup = this.game.add.group();
      this.addFrames();

      debugger;
      this.addNewTile();
      this.addNewTile();
      this.cursors = this.game.input.keyboard.createCursorKeys();
    }

    addNewTile() {
      do {
        var ranX = this.game.rnd.integerInRange(0, 3);
        var ranY = this.game.rnd.integerInRange(0, 3);
      } while (this.getArray(ranX, ranY));

      if (this.arrayEmptyTiles() > 6) {
        var chance = this.game.rnd.integerInRange(0, 99);
        this.setArray(ranX, ranY, chance === 98 ? 4 : chance >= 90 ? 2 : 1);
      } else {
        this.setArray(ranX, ranY, 1);
      }
      let value = this.getArray(ranX, ranY);

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
          let value = this.getArray(x, y);
          if (value !== 0) {
            let tile = new Tile(x, y, value, this.game, this.config);
            this.tiles.push(tile);
            this.tilesGroup.add(tile.sprite);
          }
        }
      }

      if (!this.isArrayFull()) {
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
          let tile = this.getArray(startX, startY);
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
      let tile = this.getArray(x, y);
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
        let nextTile = this.getArray(newX, newY);
        if (nextTile === 0) {
          //move the tile
          this.setArray(newX, newY, tile);
          this.setArray(actualX, actualY, 0);
          actualX = newX;
          actualY = newY;
          this.isDirty = true;
        } else if (nextTile === tile) {
          //merge tiles
          tile *= 2;
          this.setArray(newX, newY, tile);
          this.setArray(actualX, actualY, 0);
          this.isDirty = true;
          break;
        } else {
          break;
        }

        newX += pushX;
        newY += pushY;
      }
    }

    addFrames() {
      for (let x = 0; x <= this.arraySize; x++) {
        for (let y = 0; y <= this.arraySize; y++) {
          this.framesGroup.add(this.addTileFrame(x, y));
        }
      }
    }

    addTileFrame(posX: number, posY: number) {
      let graphics = this.game.add.graphics(0, 0);
      let lineWidth = this.config.tileSettings.frameLineWidth;
      let frameSize = this.config.tileSettings.tileSize - lineWidth / 2;
      let color = this.config.tileSettings.lineColor;
      let xPad =
        this.config.safeZone.paddingX + this.config.tileSettings.gridPaddingX;
      let yPad =
        this.config.safeZone.paddingY + this.config.tileSettings.gridPaddingY;

      let x =
        posX * this.config.tileSettings.tileSize * this.config.scaleFactor +
        xPad;
      let y =
        posY * this.config.tileSettings.tileSize * this.config.scaleFactor +
        yPad;

      graphics.lineStyle(lineWidth, color, 1);
      let rect = graphics.drawRect(
        x,
        y,
        frameSize * this.config.scaleFactor,
        frameSize * this.config.scaleFactor
      );
      this.game.physics.enable(rect, Phaser.Physics.ARCADE);

      return rect;
    }

    createWalls() {
      let game = this.game;
      let config = this.config;
      let xPad = config.safeZone.paddingX + config.tileSettings.gridPaddingX;
      let yPad = config.safeZone.paddingY + config.tileSettings.gridPaddingY;
      let graphics = game.add.graphics(0, 0);
      let wallLength = config.tileSettings.tileSize * 4 * config.scaleFactor;

      graphics.lineStyle(0);
      graphics.beginFill(0x66ccff, 1);
      graphics.drawRect(xPad, yPad, wallLength, wallLength);
      graphics.endFill();

      let wall1 = this.game.add.sprite(xPad - 1, yPad - 1);
      this.game.physics.enable(wall1, Phaser.Physics.ARCADE);
      wall1.body.setSize(1, wallLength);
      wall1.body.immovable = true;

      let wall2 = this.game.add.sprite(xPad - 1, yPad - 1);
      this.game.physics.enable(wall2, Phaser.Physics.ARCADE);
      wall2.body.setSize(wallLength, 1);
      wall2.body.immovable = true;

      let wall3 = this.game.add.sprite(xPad - 1, yPad + wallLength + 1);
      this.game.physics.enable(wall3, Phaser.Physics.ARCADE);
      wall3.body.setSize(wallLength, 1);
      wall3.body.immovable = true;

      let wall4 = this.game.add.sprite(xPad + wallLength + 1, yPad - 1);
      this.game.physics.enable(wall4, Phaser.Physics.ARCADE);
      wall4.body.setSize(1, wallLength);
      wall4.body.immovable = true;

      this.wallsGroup.add(wall1);
      this.wallsGroup.add(wall2);
      this.wallsGroup.add(wall3);
      this.wallsGroup.add(wall4);
    }

    addStrokedText(
      posX: number,
      posY: number,
      text: string,
      textSize: number,
      center = false
    ) {
      let textObj = this.game.add.text(posX, posY, text);

      //	Font style
      textObj.font = 'Arial Black';
      textObj.fontSize = textSize * this.config.scaleFactor;

      //	Stroke color and thickness
      textObj.stroke = '#000000';
      textObj.strokeThickness = textSize / 4 * this.config.scaleFactor;
      textObj.addColor('#ffffff', 0);

      if (center) {
        textObj.anchor.set(0.5);
      }

      this.game.physics.enable(textObj, Phaser.Physics.ARCADE);
      return textObj;
    }

    getArray(x: number, y: number) {
      return this.tilesArray[y * (this.arraySize + 1) + x];
    }

    setArray(x: number, y: number, value: number) {
      this.tilesArray[y * (this.arraySize + 1) + x] = value;
    }

    isArrayFull() {
      for (let tile of this.tilesArray) {
        if (tile === 0) {
          return false;
        }
      }
      return true;
    }

    arrayEmptyTiles() {
      let empty = 0;
      for (let tile of this.tilesArray) {
        if (tile === 0) {
          empty++;
        }
      }
      return empty;
    }
  }
}
