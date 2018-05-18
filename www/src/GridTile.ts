import { Config, Singleton } from './Config';
import SpriteFactory from './Tools/SpriteFactory';
import GameboardConfig from './Object/GameboardConfig';

export default class GridTile {
  x: number;
  y: number;
  value: number;
  sprite: Phaser.Sprite;
  sfxId: string;

  private game: Phaser.Game;
  private config: Config;
  private spriteFactory: SpriteFactory;
  private gameboardConfig: GameboardConfig;
  
  constructor(
    x: number,
    y: number,
    value: number,
    gameboardConfig: GameboardConfig
  ) {
    let singleton = Singleton.getInstance();
    this.game = singleton.game;
    this.config = singleton.config;
    this.gameboardConfig = gameboardConfig;
    this.x = x;
    this.y = y;
    this.value = value;
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
    let list = this.gameboardConfig.tiles;

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
    return tile === this.gameboardConfig.minimumValue
      ? 0
      : this.getArrayPositionFromNumber(tile / 2) + 1;
  }
}
