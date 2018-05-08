namespace MyGame {
  export class Gameboard {
    game: Phaser.Game;
    config: Config;

    tilesArray: Array<number>;
    tilesSprites: Phaser.Group;
    animating: boolean;
    xSpeed: number;
    ySpeed: number;
    speed: number;
    cursors: Phaser.CursorKeys;
    wallsGroup: Phaser.Group;
    arraySize: number;
    debugArray: Array<Phaser.Text>;
    header: Phaser.Text;
    isDirty: boolean;
    points: number;
    movements: number;
    framesGroup: Phaser.Group;

    constructor(game: Phaser.Game, config: Config) {
      this.game = game;
      this.config = config;

      this.movements = 0;
      this.xSpeed = 0;
      this.ySpeed = 0;
      this.speed = 2000 * this.config.scaleFactor;
      this.animating = false;
      this.arraySize = this.config.tileSettings.arraySize;
      this.wallsGroup = this.game.add.group();

      this.addBackground();
      this.addFrameBackground();

      this.tilesArray = this.config.tileSettings.initialArray;
      this.tilesSprites = this.game.add.group();

      this.framesGroup = this.game.add.group();
      this.addFrames();

      this.addNewTile();
      this.addNewTile();

      this.points = this.calculatePoints();
      this.addHeader();
      this.addDebuggingMatrix();
      this.cursors = this.game.input.keyboard.createCursorKeys();
    }
    
    update() {
      if (!this.animating) {
        if (this.cursors.left.justDown) {
          this.handleInput(Phaser.Keyboard.LEFT, -this.speed, 0);
        } else if (this.cursors.right.justDown) {
          this.handleInput(Phaser.Keyboard.RIGHT, this.speed, 0);
        } else if (this.cursors.up.justDown) {
          this.handleInput(Phaser.Keyboard.UP, 0, -this.speed);
        } else if (this.cursors.down.justDown) {
          this.handleInput(Phaser.Keyboard.DOWN, 0, this.speed);
        }
      } else {
        this.game.physics.arcade.overlap(
          this.tilesSprites,
          this.tilesSprites,
          null,
          function(a: Phaser.Sprite, b: Phaser.Sprite) {
            
            a.body.stop();
            b.body.stop();
  
            return true;
          }
        );

        this.game.physics.arcade.collide(this.tilesSprites, this.wallsGroup);

        let allStopped = true;
        this.tilesSprites.forEach(
          function(sprite: Phaser.Sprite) {
            if (sprite.body.velocity.x !== 0 || sprite.body.velocity.y !== 0) {
              allStopped = false;
            }
          }.bind(this)
        );

        if (allStopped) {
          debugger;
          this.animating = false;
          if (this.isDirty && !this.isArrayFull()) {
            this.addNewTile();
            this.movements++;
            this.points = this.calculatePoints();
            this.updateDebuggingMatrix();
            this.updateHeader();
          }
        }
      }
    }


    handleInput(keyboardInput: number, xSpeed: number, ySpeed: number) {
      this.animating = true;
      this.xSpeed = xSpeed;
      this.ySpeed = ySpeed;

      this.updateArray(keyboardInput);

      this.tilesSprites.forEach(
        function(sprite: Phaser.Sprite) {
          sprite.body.velocity.x = this.xSpeed;
          sprite.body.velocity.y = this.ySpeed;
        }.bind(this)
      );
    }

    updateArray(keyboardInput: number) {
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

    addPuzzleTile(posX: number, posY: number, number: number) {
      let scale = this.config.tileSettings.tileSize * this.config.scaleFactor;
      let textX = posX * scale;
      let textY = posY * scale;
      let id = this.getTileSprite(number);
      // let spriteGroup = this.game.add.group();

      let sprite = this.addSprite(
        posX * scale,
        posY * scale,
        id,
        this.config.tileSettings.tileScale
      );
      this.game.physics.enable(sprite, Phaser.Physics.ARCADE);
      sprite.body.collideWorldBounds = true;
      // let text = this.game.addTileNumber(textX, textY, number.toString());
      // spriteGroup.add(sprite);
      // spriteGroup.add(text);

      return sprite;
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
        posX * this.config.tileSettings.tileSize * this.config.scaleFactor + xPad;
      let y =
        posY * this.config.tileSettings.tileSize * this.config.scaleFactor + yPad;

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

    addSprite(posX: number, posY: number, id: string, spriteScale = 1) {
      let config = this.config;
      let xPad = config.safeZone.paddingX + this.config.tileSettings.gridPaddingX;
      let yPad = config.safeZone.paddingY + this.config.tileSettings.gridPaddingY;
      let sprite = this.game.add.sprite(posX + xPad, posY + yPad, id);
      sprite.scale.setTo(
        config.scaleFactor * spriteScale,
        config.scaleFactor * spriteScale
      );

      return sprite;
    }

    addBackground() {
      let game = this.game;
      let config = this.config;
      let xPad = config.safeZone.paddingX;
      let yPad = config.safeZone.paddingY;
      var graphics = this.game.add.graphics(0, 0);

      graphics.lineStyle(0);
      graphics.beginFill(0xe7e5df, 1);
      graphics.drawRect(
        xPad,
        yPad,
        config.safeZone.safeWidth,
        config.safeZone.safeHeight
      );
      graphics.endFill();
    }

    addFrameBackground() {
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

    addHeader() {
      let posX = this.config.safeZone.paddingX + 20 * this.config.scaleFactor;
      let posY = this.config.safeZone.paddingY + 80 * this.config.scaleFactor;
      this.header = this.addStrokedText(posX, posY, '', 50);

      this.updateHeader();
    }

    addTileNumber(posX: number, posY: number, text: string) {
      let xPad =
        this.config.safeZone.paddingX + this.config.tileSettings.gridPaddingX;
      let yPad =
        this.config.safeZone.paddingY + this.config.tileSettings.gridPaddingY;

      return this.addStrokedText(posX + xPad, posY + yPad, text, 40);
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

    addPowerButton() {
      let posX = this.config.safeZone.paddingX + 250 * this.config.scaleFactor;
      let posY = this.config.safeZone.paddingY + 1200 * this.config.scaleFactor;

      let button = this.game.add.button(
        posX,
        posY,
        'button',
        null,
        this,
        1,
        0,
        2
      );
      button.scale.setTo(this.config.scaleFactor, this.config.scaleFactor);
    }

    addDebuggingMatrix() {
      let posX = this.config.safeZone.paddingX + 250 * this.config.scaleFactor;
      let posY = this.config.safeZone.paddingY + 1300 * this.config.scaleFactor;

      this.debugArray = [];

      this.debugArray.push(this.addStrokedText(posX, posY, '', 30, true));
      this.debugArray.push(
        this.addStrokedText(
          posX + 150 * this.config.scaleFactor,
          posY,
          '',
          30,
          true
        )
      );
      this.debugArray.push(
        this.addStrokedText(
          posX + 300 * this.config.scaleFactor,
          posY,
          '',
          30,
          true
        )
      );
      this.debugArray.push(
        this.addStrokedText(
          posX + 450 * this.config.scaleFactor,
          posY,
          '',
          30,
          true
        )
      );

      this.updateDebuggingMatrix();
    }

    updateDebuggingMatrix() {
      this.debugArray.forEach(
        function(text: any, index: number) {
          text.setText(
            `${this.getArray(index, 0)}\n${this.getArray(
              index,
              1
            )}\n${this.getArray(index, 2)}\n${this.getArray(index, 3)}`
          );
        }.bind(this)
      );
    }

    updateHeader() {
      this.header.setText(
        `Score: ${this.points}     Movements: ${this.movements}`
      );
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

    calculatePoints() {
      let points = 0;
      for (let tile of this.tilesArray) {
        points += tile;
      }
      return points;
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
      let tile = this.getArray(ranX, ranY);

      let sprite = this.addPuzzleTile(ranX, ranY, tile);
      this.tilesSprites.add(sprite);
      this.game.world.bringToTop(this.framesGroup);
    }

    getTileSprite(tile: number) {
      let list = this.config.tilesData.tilesOrder;
      while (list[0] !== this.config.tilesData.mainTile) {
        let last = list.pop();
        list.unshift(last);
      }

      let index = Math.sqrt(tile) - 1;
      if (index >= 0) {
        return this.config.tilesData.tilesOrder[index];
      }
      return null;
    }
  }
}
