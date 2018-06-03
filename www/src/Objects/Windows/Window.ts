import Base from './../../Base';
export default class Window extends Base {
  protected rect: Phaser.Graphics;
  protected sprites: Phaser.Group;
  protected message: Phaser.Text;
  protected group: Phaser.Group;
  protected background: Phaser.Graphics;
  protected showTween: Phaser.Tween;
  protected hideTween: Phaser.Tween;

  protected constructor() {
    super();
  }

  protected init(rect: Phaser.Graphics, sprites: Phaser.Group, message) {
    this.background = this.tools.graphic.addWindowBackground();
    let background = this.background;
    this.rect = rect;
    this.sprites = sprites;
    this.message = message;
    rect.addChild(sprites);
    rect.addChild(message);
    background.addChild(rect);
    this.tools.misc.bringToTop(rect);
    background.alpha = 0;
    this.showTween = this.tools.misc.tweenTo(background, { alpha: 1 });
    this.hideTween = this.tools.misc.tweenTo(background, { alpha: 0 });
  }

  protected show() {
		this.showTween.start();
	}

	protected hide() {
		this.hideTween.start();
	}

	protected hideAndDestroy() {
		this.hideTween.onComplete.add(this.destroy, this);
		this.hideTween.start();	
	}

  protected destroy() {
		this.background.destroy(true);
		this.tools.misc.removeTween(this.showTween);
		this.tools.misc.removeTween(this.hideTween);		
  }
}
