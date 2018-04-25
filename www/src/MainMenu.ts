module MyGame {

  export class MainMenu extends Phaser.State {


    create() {
      let x = this.game.tileSettings.tileSize * this.game.scaleFactor;

      this.addWhiteBackground();
      this.addFrameBackground();
      this.addScore();

      this.addPuzzleTile(0, 0, 'cirno', 2);
      this.addPuzzleTile(0, 1, 'genji', 4);
      this.addPuzzleTile(1, 0, 'ozaki', 8);
      this.addPuzzleTile(1, 1, 'choco', 16);

      this.addPuzzleTile(2, 0, 'rosa', 32);
      this.addPuzzleTile(2, 1, 'genji', 64);
      this.addPuzzleTile(3, 0, 'cirno', 128);
      this.addPuzzleTile(3, 1, 'ozaki', 256);

      this.addPuzzleTile(0, 2, 'choco', 512);
      this.addPuzzleTile(1, 2, 'ozaki', 1024);
      this.addPuzzleTile(2, 2, 'genji', 2048);
      this.addPuzzleTile(3, 2, 'rosa', 2);

      this.addPuzzleTile(0, 3, 'ozaki', 2);
      this.addPuzzleTile(1, 3, 'rosa', 2);
      this.addPuzzleTile(2, 3, 'cirno', 2);
      this.addPuzzleTile(3, 3, 'choco', 2);

      this.addPowerButton();

    }


    addPuzzleTile(posX: number, posY: number, id: string, number: number) {
      let scale = this.game.tileSettings.tileSize * this.game.scaleFactor;
      let textX = (posX) * scale;
      let textY = (posY) * scale;

      this.addSprite(posX * scale, posY * scale, id);
      this.addTileFrame(posX * scale, posY * scale);
      this.addTileNumber(textX, textY, number.toString());
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




    addSprite(posX: number, posY: number, id: string) {
      let game = this.game;
      let xPad = game.safeZone.paddingX + this.game.tileSettings.gridPaddingX;
      let yPad = game.safeZone.paddingY + this.game.tileSettings.gridPaddingY;
      let sprite = this.add.sprite(posX + xPad, posY + yPad, id);
      sprite.scale.setTo(game.scaleFactor, game.scaleFactor);
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
      var graphics = game.add.graphics(0, 0);

      graphics.lineStyle(0);
      graphics.beginFill(0x66CCFF, 1);
      graphics.drawRect(xPad, yPad, game.tileSettings.tileSize * 4 * game.scaleFactor, game.tileSettings.tileSize * 4 * game.scaleFactor);
      graphics.endFill();
    }

    addScore() {
      let posX = this.game.safeZone.paddingX + 20 * this.game.scaleFactor;
      let posY = this.game.safeZone.paddingY + 80 * this.game.scaleFactor;
      this.addStrokedText(posX, posY, "Score: 2048   Movements: 100", 50);
    }

    addTileNumber(posX: number, posY: number, text: string) {
      let xPad = this.game.safeZone.paddingX + this.game.tileSettings.gridPaddingX;
      let yPad = this.game.safeZone.paddingY + this.game.tileSettings.gridPaddingY;


      this.addStrokedText(posX + xPad, posY + yPad, text, 40);
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
    }

    addPowerButton() {
      let posX = this.game.safeZone.paddingX + 200 * this.game.scaleFactor;
      let posY = this.game.safeZone.paddingY + 1200 * this.game.scaleFactor;


      this.addStrokedText(posX, posY, "Button goes here", 50);
    }



  }

}