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
    this.showCharacters();
  }

  showCharacters() {
    this.updateVisibleArray();
    this.setSelectedCharacter(this.spriteArray[2], this.visibleArray[2]);
  }

  private updateVisibleArray() {
    this.visibleArray = this.array.slice(0, 5);
    this.spriteArray = [];
    let column = 0;

    for (let char of this.visibleArray) {
      let sprite = this.tools.sprite.makeMenuTile(
        column,
        0,
        char.id,
        150,
        4 / 6
      );
      sprite.tint = Phaser.Color.GRAY;
      this.spriteArray.push(sprite);

      sprite.inputEnabled = true;
      sprite.events.onInputDown.add(
        function () {
          this.setSelectedCharacter(sprite, char);
        }.bind(this)
      );
    }
  }


  private setSelectedCharacter(sprite: Phaser.Sprite, char: TileModel) {
    if(char.id === this.visibleArray[0].id || char.id === this.visibleArray[0].id) {
      this.moveLeft();
    } else if(char.id === this.visibleArray[4].id || char.id === this.visibleArray[5].id) { 
      this.moveRight();
    }

    this.callback(char);

  }

  private moveLeft() {
    this.array.push(this.array.shift());
    this.array.push(this.array.shift());
    this.visibleArray = this.array.slice(0, 5);
  }

  private moveRight() {
    this.array.unshift(this.array.pop());
    this.array.unshift(this.array.pop());
    this.visibleArray = this.array.slice(0, 5);
  }


}



