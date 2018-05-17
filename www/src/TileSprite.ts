import { Config, Singleton } from './Config';
import SpriteFactory from './Tools/SpriteFactory';
export default class TileSprite {
  x: number;
  y: number;
  value: number;
  sprite: Phaser.Sprite;
  sfxId: string;

  game: Phaser.Game;
  config: Config;
  spriteFactory: SpriteFactory;

  constructor(
    x: number,
    y: number,
    value: number,
    game: Phaser.Game,
    config: Config
  ) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.game = game;
    this.config = config;
    this.spriteFactory = new SpriteFactory();
    this.createSprite();
  }

  createSprite() {
    let id = this.getTileSprite(this.value);
    let sprite = this.spriteFactory.makeTile(this.x, this.y, id);
    this.sfxId = id + '-sfx';
    this.game.physics.enable(sprite, Phaser.Physics.ARCADE);
    sprite.body.collideWorldBounds = true;

    this.sprite = sprite;
  }

  getTileSprite(tile: number) {
    let list = this.config.gridSettings.tiles;

    let index = this.getArrayPositionFromNumber(tile);
    if (index >= 0) {
      if(list[index]) {
        return list[index].id;        
      } else {
        return null;
      }
    }
    return null;
  }

  getArrayPositionFromNumber(tile: number): number {
    return tile === this.config.gridSettings.minimumValue
      ? 0
      : this.getArrayPositionFromNumber(tile / 2) + 1;
  }
}
