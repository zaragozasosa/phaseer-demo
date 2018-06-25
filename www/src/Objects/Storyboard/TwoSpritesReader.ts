import Reader from './Reader';
import BaseAction from './BaseAction'
import SpriteActionModel from './SpriteActionModel'


export default class TwoSpritesReader extends Reader {

  private leftSprite: Phaser.Sprite;
  private rightSprite: Phaser.Sprite;
  private title: Phaser.Text;

  constructor(actionList: Array<BaseAction>, endCallback) {
    super(actionList, endCallback);
    this.leftSprite = this.tools.sprite.createSprite(50, 300, null, 1.5);
    this.rightSprite = this.tools.sprite.createSprite(650, 300, null, 1.5);
    this.title = this.tools.text.make(20, 600, '', 60);

    this.config.storyboard.storyboardSignal.add(function (type: number, model: any) {
      debugger;
      if (type === Reader.TITLE_ACTION) {
        this.updateTitle(model);
      } else {
        this.updateSprite(model);
      }
    }.bind(this));
  }

  private updateTitle(title: string) {
    this.title.text = title;
  }

  private updateSprite(model: SpriteActionModel) {
    let sprite = model.position === Reader.SPRITE_LEFT ? this.leftSprite : this.rightSprite;
    if(model.id) {
      sprite.loadTexture(model.id, model.frame);
      sprite.tint = model.tint;
    } else {
      sprite.tint = model.tint;
    }

  }


}