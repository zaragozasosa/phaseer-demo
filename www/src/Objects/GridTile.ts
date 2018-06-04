import Base from './../Base';
import TileModel from './../Models/TileModel';
import GameboardConfig from './../Config/GameboardConfig';

export default class GridTile extends Base {
  model: TileModel;
  nextTile: GridTile;
  posX: number;
  posY: number;
  value: number;
  private frame: Phaser.Sprite;
  private sprite: Phaser.Sprite;
  private number: Phaser.Text;
  private group: Phaser.Group;

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
    this.frame = this.createFrame();
    this.sprite = this.createSprite();
    this.number = this.tools.text.makeTileNumber(
      this.posX,
      this.posY,
      this.value,
      40
    );
    this.group = this.tools.misc.addGroup();
    this.group.addChild(this.sprite);
    this.group.addChild(this.number);
    this.group.addChild(this.frame);

    this.group.alpha = 0;
    let misc = this.tools.misc;
    misc.tweenTo(this.group, { alpha: 1 }, 500, 'Linear', true);

    let t1 = misc.tweenTo(this.group, { alpha: 0.3 }, 100, 'Linear');
    let t2 = misc.tweenTo(this.group, { alpha: 1 }, 300, 'Linear');

    this.mergeTween = t1.chain(t2);

    this.sprite.inputEnabled = true;
    this.sprite.events.onInputDown.add(function() {
      this.gameboardConfig.clickTileSignal.dispatch(this);      
    }.bind(this));
  }

  get isAlive(): boolean {
    return this.sprite && this.sprite.alive;
  }
  get isMoving(): boolean {
    if (!this.sprite) {
      return false;
    }

    let velocity = this.sprite.body.velocity;
    return velocity.x || velocity.y;
  }

  get getGroup(): Phaser.Group {
    return this.group;
  }

  animate(keyboardInput: number) {
    let direction = this.getDirection(keyboardInput);
    let body = this.sprite.body;
    let config = this.config;
    if (direction !== null) {
      let distance = config.safeZone.safeWidth * config.scaleFactor;
      for (let item of this.group.getAll()) {
        item.body.moves = true;
        item.body.moveTo(500, this.config.safeZone.safeWidth, direction);
      }
      body.onMoveComplete.addOnce(this.update, this);
    }
  }

  overlaps(tilesGroup: Phaser.Group, wallsGroup: Phaser.Group) {
    let group = this.group;

    for (let groupItem of tilesGroup.getAll()) {
      this.tools.misc.overlap(
        this.sprite,
        groupItem.getBottom(),
        function(s: Phaser.Sprite, g: Phaser.Sprite) {
          if (s && g) {
            if (s.key === g.key) {
              return false;
            } else {
              let velocity = this.sprite.body.velocity;
              if (velocity.x || velocity.y) {
                for (let item of group.getAll()) {
                  item.body.stopMovement(true);
                }
                return true;
              }
            }
          }
        }.bind(this)
      );
    }

    this.tools.misc.overlap(
      this.sprite,
      wallsGroup,
      function(a: any, b: any) {
        if (a && b) {
          let velocity = this.sprite.body.velocity;
          if (velocity.x || velocity.y) {
            for (let item of group.getAll()) {
              item.body.stopMovement(true);
            }
            return true;
          }
        }
      }.bind(this)
    );
  }

  destroy(destroyChildren = false) {
    this.group.destroy(destroyChildren);
  }

  kill() {
    for (let item of this.group.getAll()) {
      item.kill();
    }
  }

  changeValue(newValue: number) {
    this.value = newValue;
    this.transform();
  }

  duplicate() {
    this.changeValue(this.value * 2);
  }

  randomize(
    maxVal: number,
    maxChance: number,
    minVal: number,
    minChance: number
  ) {
    let randomChance = this.tools.misc.randomBetween(0, 99);
    if (randomChance == 0 || randomChance < maxChance) {
      this.value = maxVal;
    } else if (
      randomChance == maxChance ||
      randomChance < maxChance + minChance
    ) {
      this.value = minVal;
    } else {
      let valuesBetween = this.getValuesBetween(maxVal, minVal);
      let random = this.tools.misc.randomBetween(0, valuesBetween.length - 1);
      this.value = valuesBetween[random];
    }

    this.transform();
  }

  private update() {
    for (let item of this.group.getAll()) {
      item.body.moves = false;
    }
    if (this.nextTile) {
      for (let item of this.group.getAll()) {
        item.kill();
      }
      this.nextTile.transform();
    } else {
      for (let item of this.group.getAll()) {
        if (item instanceof Phaser.Sprite) {
          this.tools.sprite.updateTile(this.posX, this.posY, item);
        }

        if (item instanceof Phaser.Text) {
          this.tools.text.updateTileNumber(this.posX, this.posY, item);
        }
      }
    }
  }

  private transform() {
    let tile = this.gameboardConfig.tiles.find(
      x => x.staticValue === this.value
    );
    this.model = tile;
    this.sprite.loadTexture(tile.id);
    this.number.setText(this.value + '');
    this.mergeTween.start();
  }

  private createSprite() {
    let tile = this.model;
    let sprite = this.tools.sprite.makeTile(this.posX, this.posY, tile.id);
    sprite.body.collideWorldBounds = true;

    return sprite;
  }

  private createFrame() {
    let tile = this.model;
    let sprite = this.tools.sprite.makeFrame(this.posX, this.posY);
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

  private getValuesBetween(max: number, min: number) {
    let array = [];
    max = max / 2;
    
    while (max > min) {
      array.push(max);      
      max = max / 2;
    }

    return array;
  }

  toString() {
    return `${this.sprite.key}  ${this.value} -  ${this.posX}:${this.posY}`;
  }
}
