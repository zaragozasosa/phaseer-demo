import Window from './Window';
import { ColorSettings } from './../../Config/Config';
import TileModel from './../../Models/TileModel';
export default class GameOverWindow extends Window {
  constructor(
    character: TileModel,
    win: boolean,
    contCallback: any,
    quitCallback: any
  ) {
    super();
    let y = 150;
    let elements = this.tools.misc.addGroup();
    let sprites = this.tools.misc.addGroup();
    let text;
    let retryText;
    if (win) {
      sprites.add(this.tools.sprite.makeCentered(y + 150, character.specialId, 2));
      text = 'You win!';
      retryText = 'Play again';
    } else {
      sprites.add(this.tools.sprite.makeCentered(y + 150, character.id, 2));

      text = 'Game Over...';
      retryText = 'Try again!';
    }

    elements.add(
      this.tools.text.makeXBounded(
        y + 520,
        text,
        80,
        'center',
        ColorSettings.PRIMARY
      )
    );

    let cont = this.tools.text.make(
      100,
      800,
      retryText,
      70,
      ColorSettings.TEXT
    );
    cont.inputEnabled = true;

    cont.events.onInputDown.add(
      function() {
        contCallback();
      }.bind(this)
    );

    let quit = this.tools.text.make(650, 800, 'Quit', 70, ColorSettings.TEXT);
    quit.inputEnabled = true;

    quit.events.onInputDown.add(
      function() {
        quitCallback();
      }.bind(this)
    );

    elements.add(cont);
    elements.add(quit);

    this.init(elements, sprites);

    this.show();
  }
}
