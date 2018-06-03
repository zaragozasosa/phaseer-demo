import Window from './Window';
import { ColorSettings } from './../../Config/Config';
import TileModel from './../../Models/TileModel';
export default class PowerWindow extends Window {
  constructor(character: TileModel) {
    super();
    let rect = this.tools.graphic.makeWindowRect();
    let message = this.tools.text.makeXBounded(820, character.powerName + '!', 70, 'center', ColorSettings.PRIMARY);
    let sprites = this.tools.misc.addGroup();
    let secondSfx = character.friendSfxLabel;
    if(character.friendId) {
      sprites.add(this.tools.sprite.createSprite(100, 500, character.id, 1.8));
      sprites.add(this.tools.sprite.createSprite(550, 500, character.friendId, 1.8));  
    } else {
      sprites.add(this.tools.sprite.makeCentered(250, character.id, 1.8));
      secondSfx = character.sfxLabel;  
    }
    this.init(rect, sprites, message);

    this.tools.audio.playSound(character.sfxLabel);
    this.tools.misc.runLater(500, function() {
      this.tools.audio.playSound(secondSfx);
    }.bind(this));

    this.show();

    this.tools.misc.runLater(1500, function() {
      this.hideAndDestroy();
    }.bind(this));
  }
}
