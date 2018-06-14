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
  private randomizeTween: Phaser.Tween;

  private ghostTween: Phaser.Tween;
  private ghostCooldown: number;
  private ghostTurns: number;

  private timeStopped: boolean;

  constructor(
    x: number,
    y: number,
    gameboardConfig: GameboardConfig,
    position = 0,
    value = 0,
    ghost = false,
    ghostCooldown = 0
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
    this.group = this.tools.misc.addGroup();
    this.sprite.anchor.setTo(0, 0);
    this.number = this.tools.text.makeTileNumber(
      this.posX,
      this.posY,
      this.value,
      35
    );

    this.group.addChild(this.sprite);
    this.group.addChild(this.number);
    this.group.addChild(this.frame);

    this.group.alpha = 0;
    this.group.angle = 0;

    let misc = this.tools.misc;

    let t1 = misc.tweenTo(this.group, { alpha: 0.3 }, 100, 'Linear');
    let t2 = misc.tweenTo(this.group, { alpha: 1 }, 300, 'Linear');

    this.mergeTween = t1.chain(t2);

    this.randomizeTween = this.tools.misc.tweenTo(
      this.sprite,
      { angle: 360 },
      500
    );

    this.ghostTween = misc.tweenTo(
      this.group,
      { alpha: 0.3 },
      1000,
      'Linear',
      false,
      0,
      -1,
      true
    );

    if (ghost) {
      this.group.alpha = 1;
      this.ghostCooldown = ghostCooldown;
      this.ghostTurns = 0;
      this.ghostTween.start();
    } else {
      misc.tweenTo(this.group, { alpha: 1 }, 500, 'Linear', true);
    }

    this.sprite.inputEnabled = true;
    this.sprite.events.onInputDown.add(
      function() {
        this.gameboardConfig.clickTileSignal.dispatch(this);
      }.bind(this)
    );
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

  duplicate() {
    this.changeValue(this.value * 2);
  }

  changeValue(newValue: number) {
    this.value = newValue;
    this.mergeTransform();
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

    this.randomizeTransform();
  }

  isGhost() {
    return this.ghostCooldown !== undefined;
  }

  stopGhost() {
    if (this.ghostTween.isRunning) {
      this.ghostTween.stop();
    }
    this.ghostCooldown = undefined;
  }

  checkGhostTurns() {
    if (this.ghostCooldown) {
      this.ghostTurns++;
      if (this.ghostCooldown === this.ghostTurns) {
        this.kill();
        this.ghostCooldown = null;
        return true;
      }
    }
    return false;
  }

  startTimeStop() {
    this.timeStopped = true;
    this.sprite.loadTexture(this.model.negativeId);
  }

  stopTimeStop() {
    this.timeStopped = false;
    this.sprite.loadTexture(this.model.id);
  }

  private update() {
    for (let item of this.group.getAll()) {
      item.body.moves = false;
    }
    if (this.nextTile) {
      for (let item of this.group.getAll()) {
        item.kill();
      }
      this.nextTile.mergeTransform();
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

  private mergeTransform() {
    this.transform();
    this.mergeTween.start();
  }

  private randomizeTransform() {
    this.transform();
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.position.x += this.sprite.width / 2;
    this.sprite.position.y += this.sprite.height / 2;

    this.randomizeTween.start().onComplete.add(
      function() {
        this.sprite.anchor.setTo(0, 0);
        this.tools.sprite.updateTile(this.posX, this.posY, this.sprite);
      }.bind(this)
    );
  }

  private transform() {
    let tile = this.gameboardConfig.tiles.find(
      x => x.staticValue === this.value
    );
    this.model = tile;
    if (this.timeStopped) {
      this.sprite.loadTexture(tile.negativeId);
    } else {
      this.sprite.loadTexture(tile.id);
    }
    this.number.setText(this.value + '');
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
