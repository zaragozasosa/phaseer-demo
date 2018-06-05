import Window from './Window';
import { ColorSettings } from './../../Config/Config';
import TileModel from './../../Models/TileModel';
export default class PowerWindow extends Window {
  constructor(character: TileModel) {
    super();
    let messages = this.tools.misc.addGroup();
    let message = this.tools.text.makeXBounded(870, character.power.name + '!', 70, 'center', ColorSettings.PRIMARY);
    messages.add(message);
    let sprites = this.tools.misc.addGroup();
    if(character.friendId) {
      sprites.add(this.tools.sprite.createSprite(70, 440, character.id, 2));
      sprites.add(this.tools.sprite.createSprite(530, 440, character.friendId, 2));  
    } else {
      sprites.add(this.tools.sprite.makeCentered(200, character.id, 2.5));
    }
    this.init(messages, sprites);
    this.sprites.alpha = 0;
    let spritesTween = this.tools.misc.tweenTo(this.sprites, { alpha: 1 }, 300);
    this.showTween.chain(spritesTween);
    this.show();

    this.tools.misc.runLater(2000, function() {
      this.hideAndDestroy();
    }.bind(this));
  }
}
