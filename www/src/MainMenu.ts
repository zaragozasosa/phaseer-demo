module MyGame {

  export class MainMenu extends Phaser.State {

    tiles: any;
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

    create() {
      this.addWhiteBackground();
      this.addFrameBackground();
      this.addHeader();

      this.tiles = {
        array: this.game.tileSettings.initialArray,
        sprites: this.game.add.group()
      };

      this.xSpeed = 0;
      this.ySpeed = 0;
      this.speed = 800;
      this.animating = false;
      this.arraySize = this.game.tileSettings.arraySize;



      this.addNewTile();
      this.addNewTile();
      // let sprite =
      //   this.addPuzzleTile(
      //     this.game.rnd.integerInRange(0, 3),
      //     this.game.rnd.integerInRange(0, 3),
      //     this.game.tilesData.mainTile,
      //     this.game.tilesData.minimumValue);

      // this.tiles.sprites.add(sprite);

      this.movements = 0;
      this.points = this.calculatePoints();
      this.updateHeader();
      this.addDebuggingMatrix();
      this.updateDebuggingMatrix();
      //this.addPowerButton();

      this.cursors = this.game.input.keyboard.createCursorKeys();

    }

    update() {
      if (!this.animating) {
        if (this.cursors.left.justDown) {
          this.handleInput(Phaser.Keyboard.LEFT, -this.speed, 0);
        }
        else if (this.cursors.right.justDown) {
          this.handleInput(Phaser.Keyboard.RIGHT, this.speed, 0);
        }
        else if (this.cursors.up.justDown) {
          this.handleInput(Phaser.Keyboard.UP, 0, -this.speed);
        }
        else if (this.cursors.down.justDown) {
          this.handleInput(Phaser.Keyboard.DOWN, 0, this.speed);
        }
      } else {
        // this.tiles.sprites.forEach(function (sprite: Phaser.Group) {
        //   sprite.setAll('body.velocity.x', this.xSpeed);
        //   sprite.setAll('body.velocity.y', this.ySpeed);
        // }.bind(this));

        // this.game.physics.arcade.collide(this.tiles.sprites, this.wallsGroup,
        //   function (sprite: any, wall: any) {
        //     sprite.parent.setAll('body.velocity.x', 0);
        //     sprite.parent.setAll('body.velocity.y', 0);
        //     this.animating = false;
        //   }, null, this);

      }


    }

    handleInput(keyboardInput: number, xSpeed: number, ySpeed: number) {
      this.animating = true;
      this.xSpeed = xSpeed;
      this.ySpeed = ySpeed;

      this.updateArray(keyboardInput);

      this.animating = false;
    }

    updateArray(keyboardInput: number) {
      this.isDirty = false;
      let minX = keyboardInput === Phaser.KeyCode.LEFT ? 1 : 0;
      let minY = keyboardInput === Phaser.KeyCode.UP ? 1 : 0;

      let maxX = keyboardInput === Phaser.KeyCode.RIGHT ? this.arraySize - 1 : this.arraySize;
      let maxY = keyboardInput === Phaser.KeyCode.DOWN ? this.arraySize - 1 : this.arraySize;

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

      if (this.isDirty && !this.isArrayFull()) {
        this.addNewTile();
        this.movements++;
        this.points = this.calculatePoints();
        this.updateDebuggingMatrix();
        this.updateHeader();
      }

    }

    pushTile(x: number, y: number, keyboardInput: number) {
      let tile = this.getArray(x, y);
      let pushX = keyboardInput === Phaser.KeyCode.RIGHT ? 1 : keyboardInput === Phaser.KeyCode.LEFT ? -1 : 0;
      let pushY = keyboardInput === Phaser.KeyCode.DOWN ? 1 : keyboardInput === Phaser.KeyCode.UP ? -1 : 0;
      let actualX = x;
      let actualY = y;

      let newX = actualX + pushX;
      let newY = actualY + pushY;

      while (newX >= 0 && newX <= this.arraySize && newY >= 0 && newY <= this.arraySize) {
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

    addPuzzleTile(posX: number, posY: number, id: string, number: number) {
      let scale = this.game.tileSettings.tileSize * this.game.scaleFactor;
      let textX = (posX) * scale;
      let textY = (posY) * scale;
      let group = this.game.add.group();

      this.setArray(posX, posY, number);

      let tileFrame = this.addTileFrame(posX * scale, posY * scale);
      let sprite = this.addSprite(posX * scale, posY * scale, id, this.game.tileSettings.tileScale);
      this.game.physics.enable(sprite, Phaser.Physics.ARCADE);

      let text = this.addTileNumber(textX, textY, number.toString());
      group.add(sprite);
      group.add(text);
      group.add(tileFrame);

      return group;
    }

    addTileFrame(posX: number, posY: number) {
      let graphics = this.game.add.graphics(0, 0);
      let lineWidth = this.game.tileSettings.frameLineWidth;
      let frameSize = this.game.tileSettings.tileSize - (lineWidth / 2);
      let color = this.game.tileSettings.lineColor;
      let xPad = this.game.safeZone.paddingX + this.game.tileSettings.gridPaddingX;
      let yPad = this.game.safeZone.paddingY + this.game.tileSettings.gridPaddingY;

      graphics.lineStyle(lineWidth, color, 1);
      let rect = graphics.drawRect(posX + xPad, posY + yPad, frameSize * this.game.scaleFactor, frameSize * this.game.scaleFactor);
      this.game.physics.enable(rect, Phaser.Physics.ARCADE);

      return rect;
    }

    addSprite(posX: number, posY: number, id: string, spriteScale = 1) {
      let game = this.game;
      let xPad = game.safeZone.paddingX + this.game.tileSettings.gridPaddingX;
      let yPad = game.safeZone.paddingY + this.game.tileSettings.gridPaddingY;
      let sprite = this.add.sprite(posX + xPad, posY + yPad, id);
      sprite.scale.setTo(game.scaleFactor * spriteScale, game.scaleFactor * spriteScale);

      return sprite;
    }

    addWhiteBackground() {
      let game = this.game;
      let xPad = game.safeZone.paddingX;
      let yPad = game.safeZone.paddingY;
      var graphics = this.game.add.graphics(0, 0);

      graphics.lineStyle(0);
      graphics.beginFill(0xCCFFCC, 1);
      graphics.drawRect(xPad, yPad, game.safeZone.safeWidth, game.safeZone.safeHeight);
      graphics.endFill();
    }

    addFrameBackground() {
      let game = this.game;
      let xPad = game.safeZone.paddingX + game.tileSettings.gridPaddingX;
      let yPad = game.safeZone.paddingY + game.tileSettings.gridPaddingY;
      let graphics = game.add.graphics(0, 0);
      let wallLength = game.tileSettings.tileSize * 4 * game.scaleFactor

      graphics.lineStyle(0);
      graphics.beginFill(0x66CCFF, 1);
      graphics.drawRect(xPad, yPad, wallLength, wallLength);
      graphics.endFill();

      let wall1 = this.add.sprite(xPad - 1, yPad - 1);
      this.game.physics.enable(wall1, Phaser.Physics.ARCADE);
      wall1.body.setSize(1, wallLength);
      wall1.body.immovable = true;

      let wall2 = this.add.sprite(xPad - 1, yPad - 1);
      this.game.physics.enable(wall2, Phaser.Physics.ARCADE);
      wall2.body.setSize(wallLength, 1);
      wall2.body.immovable = true;

      let wall3 = this.add.sprite(xPad - 1, yPad + wallLength + 1);
      this.game.physics.enable(wall3, Phaser.Physics.ARCADE);
      wall3.body.setSize(wallLength, 1);
      wall3.body.immovable = true;

      let wall4 = this.add.sprite(xPad + wallLength + 1, yPad - 1);
      this.game.physics.enable(wall4, Phaser.Physics.ARCADE);
      wall4.body.setSize(1, wallLength);
      wall4.body.immovable = true;

      this.wallsGroup = this.game.add.group();

      this.wallsGroup.add(wall1);
      this.wallsGroup.add(wall2);
      this.wallsGroup.add(wall3);
      this.wallsGroup.add(wall4);
    }

    addHeader() {
      let posX = this.game.safeZone.paddingX + 20 * this.game.scaleFactor;
      let posY = this.game.safeZone.paddingY + 80 * this.game.scaleFactor;
      this.header = this.addStrokedText(posX, posY, "", 50);
    }

    addTileNumber(posX: number, posY: number, text: string) {
      let xPad = this.game.safeZone.paddingX + this.game.tileSettings.gridPaddingX;
      let yPad = this.game.safeZone.paddingY + this.game.tileSettings.gridPaddingY;


      return this.addStrokedText(posX + xPad, posY + yPad, text, 40);
    }

    addStrokedText(posX: number, posY: number, text: string, textSize: number, center = false) {

      let textObj = this.game.add.text(posX, posY, text);

      //	Font style
      textObj.font = 'Arial Black';
      textObj.fontSize = textSize * this.game.scaleFactor;

      //	Stroke color and thickness
      textObj.stroke = '#000000';
      textObj.strokeThickness = (textSize / 4) * this.game.scaleFactor;
      textObj.addColor('#ffffff', 0);

      if(center) {
        textObj.anchor.set(0.5)
      }

      this.game.physics.enable(textObj, Phaser.Physics.ARCADE);
      return textObj;
    }

    addPowerButton() {
      let posX = this.game.safeZone.paddingX + 250 * this.game.scaleFactor;
      let posY = this.game.safeZone.paddingY + 1200 * this.game.scaleFactor;


      let button = this.game.add.button(posX, posY, 'button', null, this, 1, 0, 2);
      button.scale.setTo(this.game.scaleFactor, this.game.scaleFactor);
    }

    addDebuggingMatrix() {
      let posX = this.game.safeZone.paddingX + 250 * this.game.scaleFactor;
      let posY = this.game.safeZone.paddingY + 1300 * this.game.scaleFactor;

      this.debugArray = [];

      this.debugArray.push(this.addStrokedText(posX, posY, '', 30, true));

      this.debugArray.push(this.addStrokedText(posX + 150 * this.game.scaleFactor, posY, '', 30, true));

      this.debugArray.push(this.addStrokedText(posX + 300 * this.game.scaleFactor, posY, '', 30, true));

      this.debugArray.push(this.addStrokedText(posX + 450 * this.game.scaleFactor, posY, '', 30, true));
    }

    updateDebuggingMatrix() {
      this.debugArray.forEach(function (text, index) {
        text.setText(`${this.getArray(index, 0)}\n${this.getArray(index, 1)}\n${this.getArray(index, 2)}\n${this.getArray(index, 3)}`);
      }.bind(this));
    }

    updateHeader() {
      this.header.setText(`Score: ${this.points}     Movements: ${this.movements}`);
    }

    getArray(x: number, y: number) {
      return this.tiles.array[y * (this.arraySize + 1) + x];
    }

    setArray(x: number, y: number, value: number) {
      this.tiles.array[y * (this.arraySize + 1) + x] = value;
    }

    isArrayFull() {
      for (let tile of this.tiles.array) {
        if (tile === 0) {
          return false;
        }
      }

      return true;
    }

    calculatePoints() {
      let points = 0;
      for (let tile of this.tiles.array) {
        points += tile;
      }

      return points;
    }

    addNewTile() {
      do {
        var ranX = this.game.rnd.integerInRange(0, 3);
        var ranY = this.game.rnd.integerInRange(0, 3);
      } while (this.getArray(ranX, ranY));

      var chance = this.game.rnd.integerInRange(0, 99);

      this.setArray(ranX, ranY, chance === 99 ? 8 : chance > 96 ? 4 : chance > 89 ? 2 : 1);
    }

  }

}