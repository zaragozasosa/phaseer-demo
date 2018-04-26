module MyGame {

  export class MainMenu extends Phaser.State {

    tiles: any;
    animating: boolean;
    xSpeed: number;
    ySpeed: number;
    speed: number;
    cursors: Phaser.CursorKeys;
    wallsGroup: Phaser.Group;

    create() {
      this.addWhiteBackground();
      this.addFrameBackground();
      this.addScore();

      this.tiles = {
        array: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        sprites: this.game.add.group()
      };

      this.xSpeed = 0;
      this.ySpeed = 0;
      this.speed = 800;
      this.animating = false;




      let sprite =
        this.addPuzzleTile(
          this.game.rnd.integerInRange(0, 3),
          this.game.rnd.integerInRange(0, 3),
          this.game.tilesData.mainTile,
          this.game.tilesData.minimumValue);

      this.tiles.sprites.add(sprite);


      this.addPowerButton();

      this.cursors = this.game.input.keyboard.createCursorKeys();

    }

    update() {
      if (!this.animating) {
        if (this.cursors.left.isDown) {
          this.handleInput(Phaser.Keyboard.LEFT, -this.speed, 0);
        }
        else if (this.cursors.right.isDown) {
          this.handleInput(Phaser.Keyboard.RIGHT, this.speed, 0);
        }
        else if (this.cursors.up.isDown) {
          this.handleInput(Phaser.Keyboard.UP, 0, -this.speed);
        }
        else if (this.cursors.down.isDown) {
          this.handleInput(Phaser.Keyboard.DOWN, 0, this.speed);
        }
      } else {
        this.tiles.sprites.forEach(function(sprite: Phaser.Group) {
          sprite.setAll('body.velocity.x', this.xSpeed);
          sprite.setAll('body.velocity.y', this.ySpeed);
        }.bind(this));

        this.game.physics.arcade.collide(this.tiles.sprites, this.wallsGroup, 
          function(sprite: any, wall: any){
            sprite.parent.setAll('body.velocity.x', 0);
            sprite.parent.setAll('body.velocity.y', 0);
            debugger;
            this.animating = false;
          }, null, this);  
        
      }


    }

    handleInput(keyboardInput: any, xSpeed: number, ySpeed: number) {
      this.animating = true;
      this.xSpeed = xSpeed;
      this.ySpeed = ySpeed;
    }




    addPuzzleTile(posX: number, posY: number, id: string, number: number) {
      let scale = this.game.tileSettings.tileSize * this.game.scaleFactor;
      let textX = (posX) * scale;
      let textY = (posY) * scale;
      let group = this.game.add.group();

      this.tiles.array[this.getArrayIndex(posX, posY)] = number;

      //this.addTileFrame(posX * scale, posY * scale);
      let sprite = this.addSprite(posX * scale, posY * scale, id, this.game.tileSettings.tileScale);
      this.game.physics.enable(sprite, Phaser.Physics.ARCADE);

      sprite.body.bounce.y = 0.8;
      sprite.body.bounce.x = 0.8;
      sprite.body.collideWorldBounds = true;
      let text = this.addTileNumber(textX, textY, number.toString());
      group.add(sprite);
      group.add(text);

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
      graphics.drawRect(posX + xPad, posY + yPad, frameSize * this.game.scaleFactor, frameSize * this.game.scaleFactor);
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

      let wall1 = this.add.sprite(xPad-1, yPad-1);
      this.game.physics.enable(wall1, Phaser.Physics.ARCADE);
      wall1.body.setSize(1, wallLength);
      wall1.body.immovable = true;

      let wall2 = this.add.sprite(xPad-1, yPad-1);
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

    addScore() {
      let posX = this.game.safeZone.paddingX + 20 * this.game.scaleFactor;
      let posY = this.game.safeZone.paddingY + 80 * this.game.scaleFactor;
      this.addStrokedText(posX, posY, "Score: 2048   Movements: 100", 50);
    }

    addTileNumber(posX: number, posY: number, text: string) {
      let xPad = this.game.safeZone.paddingX + this.game.tileSettings.gridPaddingX;
      let yPad = this.game.safeZone.paddingY + this.game.tileSettings.gridPaddingY;


      return this.addStrokedText(posX + xPad, posY + yPad, text, 40);
    }

    addStrokedText(posX: number, posY: number, text: string, textSize: number) {

      let textObj = this.game.add.text(posX, posY, text);

      //	Font style
      textObj.font = 'Arial Black';
      textObj.fontSize = textSize * this.game.scaleFactor;

      //	Stroke color and thickness
      textObj.stroke = '#000000';
      textObj.strokeThickness = (textSize / 4) * this.game.scaleFactor;
      textObj.addColor('#ffffff', 0);

      this.game.physics.enable(textObj, Phaser.Physics.ARCADE);
      return textObj;
    }

    addPowerButton() {
      let posX = this.game.safeZone.paddingX + 250 * this.game.scaleFactor;
      let posY = this.game.safeZone.paddingY + 1200 * this.game.scaleFactor;


      let button = this.game.add.button(posX, posY, 'button', null, this, 1, 0, 2);
      button.scale.setTo(this.game.scaleFactor, this.game.scaleFactor);
    }

    getArrayIndex(x: number, y: number) {
      return (y * 4) + x;
    }
  }

}