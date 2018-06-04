import Base from './../../Base';
export default class Window extends Base {
  protected rect: Phaser.Graphics;
  protected sprites: Phaser.Group;
  protected message: Phaser.Group;
  protected background: Phaser.Graphics;
  protected showTween: Phaser.Tween;
  protected hideTween: Phaser.Tween;

  constructor() {
    super();
  }

  init(message: Phaser.Group, sprites = null, rect = null) {
    if(!rect) {
      rect = this.tools.graphic.makeWindowRect();      
    } 
    this.rect = rect;    
    this.background = this.tools.graphic.addWindowBackground();
    let background = this.background;
    if(sprites) {
      this.sprites = sprites;
      rect.addChild(sprites);      
    }
    this.message = message;
    rect.addChild(message);
    background.addChild(rect);
    this.tools.misc.bringToTop(rect);
    background.alpha = 0;
    this.showTween = this.tools.misc.tweenTo(background, { alpha: 1 });
    this.hideTween = this.tools.misc.tweenTo(background, { alpha: 0 });
  }

  show() {
		this.showTween.start();
	}

	protected hide() {
		this.hideTween.start();
	}

	hideAndDestroy() {
		this.hideTween.onComplete.add(this.destroy, this);
		this.hideTween.start();	
	}

  protected destroy() {
		this.background.destroy(true);
		this.tools.misc.removeTween(this.showTween);
		this.tools.misc.removeTween(this.hideTween);		
  }
}
