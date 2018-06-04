import Window from './Window';
import { ColorSettings } from './../../Config/Config';
import TileModel from './../../Models/TileModel';
export default class PowerWindow extends Window {
  constructor(character: TileModel) {
    super();
    let messages = this.tools.misc.addGroup();
    let message = this.tools.text.makeXBounded(870, character.powerName + '!', 70, 'center', ColorSettings.PRIMARY);
    messages.add(message);
    let sprites = this.tools.misc.addGroup();
    let secondSfx = character.friendSfxLabel;
    if(character.friendId) {
      sprites.add(this.tools.sprite.createSprite(70, 440, character.id, 2));
      sprites.add(this.tools.sprite.createSprite(530, 440, character.friendId, 2));  
    } else {
      sprites.add(this.tools.sprite.makeCentered(200, character.id, 2.5));
      secondSfx = character.sfxLabel;  
    }
    this.init(messages, sprites);
    this.sprites.alpha = 0;
    let spritesTween = this.tools.misc.tweenTo(this.sprites, { alpha: 1 }, 300);
    this.showTween.chain(spritesTween);

    this.tools.audio.playSound(character.sfxLabel);
    this.tools.misc.runLater(500, function() {
      this.tools.audio.playSound(secondSfx);
    }.bind(this));

    this.show();

    this.tools.misc.runLater(2500, function() {
      this.hideAndDestroy();
    }.bind(this));
  }
}
