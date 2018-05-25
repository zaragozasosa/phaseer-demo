import { Config, Singleton } from './../Models/Config';
import Tile from './../Models/Tile';
import SpriteFactory from './../Tools/SpriteFactory';
import GameboardConfig from './GameboardConfig';

export default class GridTile {
  model: Tile;
  willBeDestroyed: boolean;
  willBeMerged: boolean;
  posX: number;
  posY: number;
  value: number;
  sprite: Phaser.Sprite;

  private game: Phaser.Game;
  private config: Config;
  private spriteFactory: SpriteFactory;
  private gameboardConfig: GameboardConfig;

  constructor(
    x: number,
    y: number,
    gameboardConfig: GameboardConfig,
    position = 0,
    value = 0
  ) {
    let singleton = Singleton.getInstance();
    this.game = singleton.game;
    this.config = singleton.config;
    this.gameboardConfig = gameboardConfig;
    this.willBeDestroyed = false;
    this.willBeMerged = false;

    if (value === 0) {
      this.model = gameboardConfig.tiles[position];
    } else {
      this.model = gameboardConfig.tiles.find(x => x.staticValue === value);
    }
    this.value = this.model.staticValue;

    this.posX = x;
    this.posY = y;
    this.spriteFactory = new SpriteFactory();
    this.sprite = this.createSprite();
  }

  private createSprite() {
    let tile = this.model;
    let sprite = this.spriteFactory.makeTile(this.posX, this.posY, tile.id);
    this.game.physics.enable(sprite, Phaser.Physics.ARCADE);
    sprite.body.collideWorldBounds = true;

    return sprite;
  }

  updateSprite() {
    let model = this.model;
    let sprite = this.spriteFactory.updateTile(
      this.posX,
      this.posY,
      this.sprite
    );
    this.sprite = sprite;
  }
}
