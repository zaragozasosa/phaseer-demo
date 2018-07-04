import MenuList from './MenuList';
import Base from './../../Base';
import { ColorSettings } from './../../Config/Config';

export default class MenuObject extends Base {
  nextMenuObject: MenuObject;
  previousMenuObject: MenuObject;
  parentObject: MenuObject;
  actionCallback: any;
  isBackOption: boolean;
  label: string;
  protected text: Phaser.Text;
  private selected: boolean;

  constructor(label: string, actionCallback = null, isBackOption = false) {
    super();
    this.label = label;
    this.actionCallback = actionCallback;
    this.isBackOption = isBackOption;
  }

  print(positionY: number, size: number) {
    if (this.text) {
      this.text.destroy(true);
    }

    this.text = this.tools.text.makeXBounded(
      positionY,
      this.label,
      size,
      'center',
      ColorSettings.TEXT,
      true
    );

    this.text.alpha = 0;
    let tween = this.tools.misc.tweenTo(this.text, { alpha: 1 }, 500);
    tween.onComplete.addOnce(
      function() {
        this.tools.misc.removeTween(tween);
      }.bind(this)
    );

    tween.start();
    if (this.actionCallback) {
      this.text.inputEnabled = true;
      this.text.events.onInputDown.add(
        function() {
          this.config.storyboard.optionClickSignal.dispatch(this);
        }.bind(this)
      );
    }
  }

  action() {
    if (this.actionCallback) {
      this.actionCallback();
    }
  }

  clear() {
    this.text.destroy();
  }

  toggleOption() {
    if (this.text) {
      this.selected = !this.selected;
      if (this.selected) {
        this.tools.text.changeColor(this.text, ColorSettings.PRIMARY);
      } else {
        this.tools.text.changeColor(this.text, ColorSettings.TEXT);
      }
    }
  }

  changeLabel(label: string) {
    this.label = label;
    if (this.text) {
      this.text.text = label;
    }
  }

  show(position, size) {}
}
