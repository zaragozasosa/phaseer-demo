import Window from './Window';
import { ColorSettings } from './../../Config/Config';
import TileModel from './../../Models/TileModel';
export default class PowerWindow extends Window {
  constructor(character: TileModel) {
    super(Window.SMALL_CENTER);
    let y = this.config.window.centerY;
    let elements = this.tools.misc.addGroup();
    let sprites = this.tools.misc.addGroup();
    if (character.friendId) {
      sprites.add(this.tools.sprite.createSprite(90, y + 200, character.specialId, 1.8));
      sprites.add(
        this.tools.sprite.createSprite(510, y + 200, character.friendSpecialId, 1.8)
      );
    } else {
      sprites.add(this.tools.sprite.makeCentered(y - 50, character.specialId, 2));
    }
    this.init(elements, sprites);
    this.sprites.alpha = 0;
    let spritesTween = this.tools.misc.tweenTo(this.sprites, { alpha: 1 }, 300);
    this.showTween.chain(spritesTween);

    let message = this.tools.text.makeXBounded(
      y + 550,
      character.power.name + '!',
      60,
      'center',
      ColorSettings.PRIMARY
    );
    elements.add(message);

    this.show();

    this.tools.misc.runLater(
      2000,
      function() {
        this.hideAndDestroy();
      }.bind(this)
    );
  }
}
