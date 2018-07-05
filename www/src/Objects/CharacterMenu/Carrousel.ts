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

  constructor(array: Array<TileModel>, callback: any) {
    super();
    array.unshift(array.pop());
    array.unshift(array.pop());
    this.array = array;
    this.callback = callback;
    this.spriteArray = [];
    this.showCharacters();
    this.addBlinking();
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
    this.setSelectedCharacter(this.visibleArray[2]);
  }

  private updateVisibleArray() {
    this.visibleArray = this.array.slice(0, 6);
    let column = 0;

    for (let char of this.visibleArray) {
      let sprite: Phaser.Sprite;
      if (this.spriteArray.length >= 6) {
        this.spriteArray[column].loadTexture(char.id);
        sprite = this.spriteArray[column];
      } else {
        sprite = this.tools.sprite.makeMenuTile(column, 0, char.id, 35, 4 / 6);
        this.spriteArray.push(sprite);
        sprite.inputEnabled = true;
      }
      sprite.tint = Phaser.Color.GRAY;
      sprite.events.destroy();
      sprite.events.onInputDown.add(
        function() {
          this.setSelectedCharacter(char);
        }.bind(this)
      );
      column++;
    }
  }

  private setSelectedCharacter(char: TileModel) {
    let changePage = false;
    if (
      char.id === this.visibleArray[0].id ||
      char.id === this.visibleArray[1].id
    ) {
      this.moveRight();
      this.addBlinking();
      changePage = true;
    } else if (
      char.id === this.visibleArray[4].id ||
      char.id === this.visibleArray[5].id
    ) {
      this.moveLeft();
      this.addBlinking();
      changePage = true;
    }

    this.spriteArray[2].tint = Phaser.Color.WHITE;
    this.spriteArray[3].tint = Phaser.Color.WHITE;
    this.callback(char, changePage);
  }

  private addBlinking() {
    this.blinkGroup = this.tools.misc.addGroup();
    this.blinkGroup.add(this.spriteArray[2]);
    this.blinkGroup.add(this.spriteArray[3]);

    let tween = this.tools.misc.tweenLoop(
      this.blinkGroup,
      { alpha: 0.4 },
      { alpha: 1 },
      1000,
      1000
    );

    tween.start();
  }

  private moveLeft() {
    this.array.push(this.array.shift());
    this.array.push(this.array.shift());
    this.updateVisibleArray();
  }

  private moveRight() {
    this.array.unshift(this.array.pop());
    this.array.unshift(this.array.pop());
    this.updateVisibleArray();
  }
}
