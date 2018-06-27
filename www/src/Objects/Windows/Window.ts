import Base from './../../Base';
import Menu from './../../Objects/Menu/Menu';

export default class Window extends Base {
  protected rect: Phaser.Graphics;
  protected sprites: Phaser.Group;
  protected elements: Phaser.Group;
  protected background: Phaser.Graphics;
  protected showTween: Phaser.Tween;
  protected hideTween: Phaser.Tween;
  private windowType: number;
  private defaultAlpha = 0.8;

  protected menu: Menu;

  static readonly DEFAULT_WINDOW = 1;
  static readonly DEFAULT_HIDE_BACKGROUND = 2;
  static readonly SMALL_CENTER = 3;

  constructor(windowType = Window.DEFAULT_WINDOW) {
    super();
    this.windowType = windowType;
  }

  init(elements: Phaser.Group, sprites = null) {
    let rect = this.makeRect();
    this.background = this.makeBackground();
    if (sprites) {
      this.sprites = sprites;
      rect.addChild(sprites);
    }
    this.elements = elements;
    rect.addChild(elements);
    this.background.addChild(rect);
    this.tools.misc.bringToTop(rect);
    this.background.alpha = 0;
    this.showTween = this.tools.misc.tweenTo(this.background, { alpha: 1 });
    this.hideTween = this.tools.misc.tweenTo(this.background, { alpha: 0 });
  }

  show() {
    this.showTween.start();
    if(this.menu) {
      this.menu.show();
    }
  }

  hideAndDestroy() {
    if(this.menu) {
      this.menu.destroy();
    }
    
    this.hideTween.onComplete.add(this.destroy, this);
    this.hideTween.start();
  }

  protected makeRect() {
    if (this.windowType === Window.SMALL_CENTER) {
      let win = this.config.window;
      let x = win.defaultX;
      let line = win.defaultLineWidth;
      let w = win.defaultWidth;
      let y = win.centerY;
      let h = win.centerHeight;

      return this.tools.graphic.makeWindowRect(x, y, w, h, line);
    } else {
      return this.tools.graphic.makeWindowRect();
    }
  }

  protected makeBackground() {
    if (this.windowType === Window.DEFAULT_HIDE_BACKGROUND) {
      return this.tools.graphic.addWindowBackground(1);
    } else {
      return this.tools.graphic.addWindowBackground(this.defaultAlpha);
    }
  }

  protected hide() {
    this.hideTween.start();
  }

  protected destroy() {
    this.background.destroy(true);
    this.tools.misc.removeTween(this.showTween);
    this.tools.misc.removeTween(this.hideTween);
  }
}
