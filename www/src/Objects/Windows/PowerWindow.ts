import Window from './Window';
import { ColorSettings } from './../../Config/Config';
import TileModel from './../../Models/TileModel';
export default class PowerWindow extends Window {
  constructor(character: TileModel) {
    super(Window.SMALL_CENTER);
    let y = 500;
    let elements = this.tools.misc.addGroup();
    let sprites = this.tools.misc.addGroup();
    if (character.friendId) {
      sprites.add(this.tools.sprite.createFromSpriteSheet(90, y, character.spriteId, character.specialSpriteFrame, 1.8));
      sprites.add(this.tools.sprite.createFromSpriteSheet(520, y, character.friendSpriteId, character.specialSpriteFrame, 1.8));
    } else {
      sprites.add(this.tools.sprite.makeCenteredFromSpriteSheet(y, character.spriteId, character.specialSpriteFrame, 2));
    }
    this.init(elements, sprites);
    this.sprites.alpha = 0;
    let spritesTween = this.tools.tween.to(this.sprites, { alpha: 1 }, 300);
    this.showTween.chain(spritesTween);

    let message = this.tools.text.makeXBounded(
      y + 350,
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
