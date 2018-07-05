import GameboardConfig from './../../Config/GameboardConfig';
import TileModel from './../../Models/TileModel';
import Base from './../../Base';
import { ColorSettings } from './../../Config/Config';

export default class Carrousel extends Base {
  private gameboardConfig: GameboardConfig;
  private array: Array<TileModel>;
  private spriteArray: Array<Phaser.Sprite>;
  private visibleArray: Array<TileModel>;
  private length: number;
  private callback: any;
  private blinkGroup: Phaser.Group;
  private spritesGroup: Phaser.Group;
  private rightBlink: Phaser.Tween;
  private leftBlink: Phaser.Tween;
  private distance: number;
  private isAnimating: boolean;

  get isBusy() {
    return this.isAnimating;
  }

  constructor(array: Array<TileModel>, callback: any) {
    super();
    array.unshift(array.pop());
    array.unshift(array.pop());
    this.array = array;
    this.callback = callback;
    this.spriteArray = [];
    this.spritesGroup = this.tools.misc.addGroup();
    this.showCharacters();
    this.distance = this.config.grid.tileSize * 8 / 6 * this.config.scaleFactor;
    this.isAnimating = false;
  }

  nextCharacter(actual: TileModel) {
    let index = this.visibleArray.findIndex(x => x.id === actual.id);
    this.setSelectedCharacter(this.visibleArray[index + 1]);
  }

  previousCharacter(actual: TileModel) {
    let index = this.visibleArray.findIndex(x => x.id === actual.id);
    this.setSelectedCharacter(this.visibleArray[index - 1]);
  }

  private showCharacters() {
    this.updateVisibleArray();
    this.setSelectedCharacter(this.visibleArray[4]);
  }

  private updateVisibleArray() {
    this.visibleArray = this.array.slice(0, 10);
    let column = 0;
    this.spritesGroup.removeAll();
    this.spritesGroup = this.tools.misc.addGroup();
    this.spritesGroup.enableBody = true;
    this.spriteArray.forEach(s => s.destroy())
    this.spriteArray = [];

    for (let char of this.visibleArray) {
      let sprite: Phaser.Sprite;
      sprite = this.tools.sprite.makeMenuTile(column - 2, 0, char.id, 20, 35, 4 / 6);
      this.spriteArray.push(sprite);
      sprite.inputEnabled = true;

      this.spritesGroup.add(sprite);
      sprite.tint = Phaser.Color.GRAY;
      sprite.events.destroy();
      sprite.events.onInputDown.add(
        function () {
          this.setSelectedCharacter(char);
        }.bind(this)
      );
      column++;
    }

    this.spriteArray[0].alpha = 0
    this.spriteArray[1].alpha = 0
    this.spriteArray[8].alpha = 0
    this.spriteArray[9].alpha = 0

    this.addBlinking();
  }

  private setSelectedCharacter(char: TileModel) {
    let changePage = false;
    if (
      char.id === this.visibleArray[2].id ||
      char.id === this.visibleArray[3].id
    ) {
      this.moveRight();
      changePage = true;
    } else if (
      char.id === this.visibleArray[6].id ||
      char.id === this.visibleArray[7].id
    ) {
      this.moveLeft();
      changePage = true;
    }

    this.spriteArray[4].tint = Phaser.Color.WHITE;
    this.spriteArray[5].tint = Phaser.Color.WHITE;
    this.callback(char, changePage);
  }

  private addBlinking() {
    this.spriteArray[4].tint = Phaser.Color.WHITE;
    this.spriteArray[5].tint = Phaser.Color.WHITE;

    this.leftBlink = this.tools.misc.tweenLoop(
      this.spriteArray[4],
      { alpha: 0.4 },
      { alpha: 1 },
      1000,
      1000
    );

    this.rightBlink = this.tools.misc.tweenLoop(
      this.spriteArray[5],
      { alpha: 0.4 },
      { alpha: 1 },
      1000,
      1000
    );

    this.rightBlink.start();
    this.leftBlink.start();
  }

  private moveLeft() {
    this.rightBlink.stop();
    this.leftBlink.stop();
    this.isAnimating = true;

    this.spritesGroup.forEach(function (sprite: Phaser.Sprite) {
      sprite.body.moveTo(200, this.distance, Phaser.ANGLE_LEFT);
    }.bind(this));

    debugger;
    this.tools.misc.tweenTo(this.spriteArray[8], { alpha: 1 }, 50, true, 100);
    this.tools.misc.tweenTo(this.spriteArray[9], { alpha: 1 }, 100, true, 200);

    this.tools.misc.tweenTo(this.spriteArray[2], { alpha: 0 }, 25, true);
    this.tools.misc.tweenTo(this.spriteArray[3], { alpha: 0 }, 100, true);

    this.tools.misc.runLater(200, function () {
      this.isAnimating = false;
      this.array.push(this.array.shift());
      this.array.push(this.array.shift());
      this.updateVisibleArray();
    }.bind(this))
  }

  private moveRight() {
    this.tools.misc.removeTween(this.rightBlink);
    this.tools.misc.removeTween(this.leftBlink);
    this.isAnimating = true;

    this.spritesGroup.forEach(function (sprite: Phaser.Sprite) {
      sprite.body.moveTo(200, this.distance, Phaser.ANGLE_RIGHT);
    }.bind(this));
    this.tools.misc.tweenTo(this.spriteArray[1], { alpha: 1 }, 50, true, 100);
    this.tools.misc.tweenTo(this.spriteArray[0], { alpha: 1 }, 100, true, 200);

    this.tools.misc.tweenTo(this.spriteArray[6], { alpha: 0 }, 100, true);
    this.tools.misc.tweenTo(this.spriteArray[7], { alpha: 0 }, 25, true);


    this.tools.misc.runLater(200, function () {
      this.isAnimating = false;
      this.array.unshift(this.array.pop());
      this.array.unshift(this.array.pop());
      this.updateVisibleArray();
    }.bind(this))
  }
}
