import Base from './../Base';
import TileModel from './../Models/TileModel';
import GameboardConfig from './../Config/GameboardConfig';

export default class GridTile extends Base {
  model: TileModel;
  nextTile: GridTile;
  posX: number;
  posY: number;
  value: number;
  sprite: Phaser.Sprite;
  number: Phaser.Text;
  group: Phaser.Group;

  private gameboardConfig: GameboardConfig;
  private mergeTween: Phaser.Tween;

  constructor(
    x: number,
    y: number,
    gameboardConfig: GameboardConfig,
    position = 0,
    value = 0
  ) {
    super();
    this.gameboardConfig = gameboardConfig;
    this.nextTile = null;

    if (value === 0) {
      this.model = gameboardConfig.tiles[position];
    } else {
      this.model = gameboardConfig.tiles.find(x => x.staticValue === value);
    }
    this.value = this.model.staticValue;

    this.posX = x;
    this.posY = y;
    this.sprite = this.createSprite();

    this.sprite.alpha = 0;
    this.game.add.tween(this.sprite).to({ alpha: 1 }, 500, 'Linear', true);

    let tween1 = this.game.add
      .tween(this.sprite)
      .to({ alpha: 0.3 }, 100, 'Linear');
    let tween2 = this.game.add
      .tween(this.sprite)
      .to({ alpha: 1 }, 300, 'Linear');

    this.mergeTween = tween1.chain(tween2);

    // this.number = this.tools.text.makeTileNumber(
    //   this.posX,
    //   this.posY,
    //   this.value,
    //   40
    // );
    // this.group = this.game.add.group();
    // this.group.add(this.sprite);
    // this.group.add(this.number);

    // this.group.bringToTop(this.number);
  }

  get isMoving(): boolean {
    if (!this.sprite) {
      return false;
    }

    let velocity = this.sprite.body.velocity;
    return velocity.x || velocity.y;
  }

  animate(keyboardInput: number) {
    let direction = this.getDirection(keyboardInput);
    let body = this.sprite.body;
    let config = this.config;

    if (direction !== null) {
      let distance = config.safeZone.safeWidth * config.scaleFactor;
      body.moves = true;
      body.moveTo(500, this.config.safeZone.safeWidth, direction);
      // body.setAll('moves', true);
      // body.callAll(
      //   'moveTo',
      //   this,
      //   500,
      //   this.config.safeZone.safeWidth,
      //   direction
      // );
      body.onMoveComplete.addOnce(this.updateTile, this);
    }
  }

  overlaps(tilesGroup: Phaser.Group, wallsGroup: Phaser.Group) {
    this.game.physics.arcade.overlap(
      this.sprite,
      tilesGroup,
      function(a: Phaser.Sprite, b: Phaser.Sprite) {
        if (a && b) {
          if (a.key === b.key) {
            console.log('collision, merging');
            return false;
          } else {
            let velocity = this.sprite.body.velocity;
            if (velocity.x || velocity.y) {
              console.log('collision in sprites x sprite');
              this.sprite.body.stopMovement(true);
              return true;
            }
          }
        }
      }.bind(this)
    );

    this.game.physics.arcade.overlap(
      this.sprite,
      wallsGroup,
      function(a: any, b: any) {
        if (a && b) {
          let velocity = this.sprite.body.velocity;
          if (velocity.x || velocity.y) {
            console.log('collision in sprites x wall');
            this.sprite.body.stopMovement(true);
            return true;
          }
        }
      }.bind(this)
    );
  }

  private updateTile() {
    this.sprite.body.moves = false;
    if (this.nextTile) {
      this.sprite.kill();
      this.nextTile.merge();
    } else {
      this.tools.sprite.updateTile(this.posX, this.posY, this.sprite);
    }
  }

  private merge() {
    let tile = this.gameboardConfig.tiles.find(
      x => x.staticValue === this.value
    );
    this.model = tile;
    this.sprite.loadTexture(tile.id);
    // this.number.setText(this.value + '');
    this.mergeTween.start();
  }

  private createSprite() {
    let tile = this.model;
    let sprite = this.tools.sprite.makeTile(this.posX, this.posY, tile.id);
    this.game.physics.enable(sprite, Phaser.Physics.ARCADE);
    sprite.body.collideWorldBounds = true;

    return sprite;
  }

  private getDirection(keyboardInput: number) {
    return keyboardInput === Phaser.Keyboard.UP
      ? Phaser.ANGLE_UP
      : keyboardInput === Phaser.Keyboard.DOWN
        ? Phaser.ANGLE_DOWN
        : keyboardInput === Phaser.Keyboard.RIGHT
          ? Phaser.ANGLE_RIGHT
          : keyboardInput === Phaser.Keyboard.LEFT ? Phaser.ANGLE_LEFT : null;
  }

  toString() {
    return `${this.sprite.key}  ${this.value} -  ${this.posX}:${this.posY}`;
  }
}
