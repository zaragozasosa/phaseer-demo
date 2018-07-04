import GameboardConfig from './../../Config/GameboardConfig';
import TileModel from './../../Models/TileModel';
import Base from './../../Base';

export default class Carrousel extends Base {
  private gameboardConfig: GameboardConfig;
  private array: Array<TileModel>;
  private spriteArray: Array<Phaser.Sprite>;
  private visibleArray: Array<TileModel>;
  private length: number;
  private callback: any;

  constructor(array: Array<TileModel>, callback: any) {
    super();
    array.unshift(array.pop());
    array.unshift(array.pop());
    this.array = array;
    this.callback = callback;
    this.spriteArray = [];
    this.updateVisibleArray();
    this.showCharacters();
  }

  showCharacters() {
    this.updateVisibleArray();
    this.setSelectedCharacter(this.spriteArray[2], this.visibleArray[2]);
  }

  private updateVisibleArray() {
    this.visibleArray = this.array.slice(0, 6);
    let column = 0;

    for (let char of this.visibleArray) {
      let sprite: Phaser.Sprite;
      if(this.spriteArray.length >=6) {
        this.spriteArray[column].loadTexture(char.id);
        sprite = this.spriteArray[column];
      } else {
        sprite = this.tools.sprite.makeMenuTile(
          column,
          0,
          char.id,
          35,
          4 / 6
        );
        this.spriteArray.push(sprite);
        sprite.inputEnabled = true;
      }
      sprite.tint = Phaser.Color.GRAY;
      sprite.events.destroy();
      sprite.events.onInputDown.addOnce(
        function () {
          this.setSelectedCharacter(sprite, char);
        }.bind(this)
      );

      column++;
    }
  }


  private setSelectedCharacter(sprite: Phaser.Sprite, char: TileModel) {
    if(char.id === this.visibleArray[0].id || char.id === this.visibleArray[1].id) {
      this.moveRight();
    } else if(char.id === this.visibleArray[4].id || char.id === this.visibleArray[5].id) { 
      this.moveLeft();
    }

    this.spriteArray[2].tint = Phaser.Color.WHITE;
    this.spriteArray[3].tint = Phaser.Color.WHITE;

    this.callback(sprite, char);
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
