import { Config, Singleton } from './Config';
import SpriteFactory from './Tools/SpriteFactory';
export default class Tile {
  x: number;
  y: number;
  value: number;
  sprite: Phaser.Sprite;

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
    this.game.physics.enable(sprite, Phaser.Physics.ARCADE);
    sprite.body.collideWorldBounds = true;

    this.sprite = sprite;
  }

  getTileSprite(tile: number) {
    let list = this.config.tileSettings.tiles;
    while (list[0] !== this.config.tileSettings.mainTile) {
      let last = list.pop();
      list.unshift(last);
    }
    let index = this.getArrayPositionFromNumber(tile);
    if (index >= 0) {
      return this.config.tileSettings.tiles[index];
    }
    return null;
  }

  getArrayPositionFromNumber(tile: number): number {
    return tile === this.config.tileSettings.minimumValue
      ? 0
      : this.getArrayPositionFromNumber(tile / 2) + 1;
  }
}
