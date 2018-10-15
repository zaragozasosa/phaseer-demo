import Window from './Window';
import { ColorSettings } from './../../Config/Config';
import TileModel from './../../Models/TileModel';
export default class WinWindow extends Window {
  constructor(
    character: TileModel,
    contCallback: any
  ) {
    super();
    let y = 150;
    let elements = this.tools.misc.addGroup();
    let sprites = this.tools.misc.addGroup();
    let text;
    sprites.add(this.tools.sprite.makeCenteredFromSpriteSheet(y + 120, character.spriteId, character.specialSpriteFrame, 2));
    text = 'You win!';

    this.config.storyboard.windowActionSignal = new Phaser.Signal();

    this.tools.misc.runLater(500, function() {
      this.config.storyboard.windowActionSignal.addOnce(function () {
        contCallback();
      }.bind(this));
    }.bind(this));


    elements.add(
      this.tools.text.makeXBounded(
        y + 470,
        text,
        80,
        'center',
        ColorSettings.PRIMARY
      )
    );

    let cont = this.tools.text.makeXBounded(
      740,
      'Press a key to continue.',
      50,
      'center',
      ColorSettings.TEXT
    );

    this.tools.tween.blinkStart(cont);

    elements.add(cont);
    this.init(elements, sprites);
    this.show();
  }
}
