import GameboardConfig from './../Objects/GameboardConfig';
import SpriteFactory from './../Tools/SpriteFactory';
import GraphicsFactory from './../Tools/GraphicsFactory';
import InputManager from './../Tools/InputManager';
import Tile from './../Objects/Tile';
import TextFactory from './../Tools/TextFactory';
import { Config, Singleton } from './../Config';
import ButtonFactory from './../Tools/ButtonFactory';

export default class CharacterSelection extends Phaser.State {
  game: Phaser.Game;
  config: Config;
  gameboardConfig: GameboardConfig;
  spriteFactory: SpriteFactory;
  textFactory: TextFactory;
  graphicsFactory: GraphicsFactory;
  buttonFactory: ButtonFactory;
  inputManager: InputManager;

  preloadBar: Phaser.Sprite;
  selectedCharacter: Tile;
  displayArray: Array<Tile>;
  menuItems: Array<Phaser.Sprite>;
  updated: boolean;
  ratio: number;
  yMenuPad: number;

  selectedFrame: Phaser.Sprite;
  selectedName: Phaser.Text;
  selectedFullName: Phaser.Text;
  selectedSummary: Phaser.Text;
  selectedPower: Phaser.Text;
  selectedSprite: Phaser.Sprite;
  startButton: Phaser.Button;

  preload() {
    let singleton = Singleton.getInstance();
    this.game = singleton.game;
    this.config = singleton.config;

    this.gameboardConfig = new GameboardConfig();
    this.spriteFactory = new SpriteFactory();
    this.textFactory = new TextFactory();
    this.graphicsFactory = new GraphicsFactory();
    this.buttonFactory = new ButtonFactory();
    this.inputManager = new InputManager();
    for (let sprite of this.gameboardConfig.tiles) {
      let path = `assets/images/tiles/${sprite.id}.png`;
      let sfx = `assets/sfx/${sprite.id}-${sprite.sfxId}`;

      this.load.image(sprite.id, path);
      this.load.audio(`${sprite.id}-sfx`, [sfx]);
    }

    this.load.image('random', 'assets/images/tiles/random.png');
    this.load.audio(`random-sfx`, 'assets/sfx/random-sound.wav');

    this.preloadBar = this.spriteFactory.makeCentered(300, 'preloadBar', 2);
    this.load.setPreloadSprite(this.preloadBar);
  }

  create() {
    this.preloadBar.destroy();
    this.updated = false;
    let yMenuPad = 20;
    let row = 0;
    let column = 0;
    let arraySize = this.gameboardConfig.arraySize + 1;
    let maxColumns = 6;
    let ratio = arraySize / maxColumns;
    let characters: Array<Tile>;
    let displayArray: Array<Tile> = [];
    this.menuItems = [];
    characters = JSON.parse(JSON.stringify(this.gameboardConfig.tiles));
    displayArray = characters.filter(x => x.playable);

    this.graphicsFactory.addBackground();

    displayArray.push(
      new Tile(
        'random',
        'Random',
        'Select a random character',
        '',
        'sound.wav',
        '',
        '?????',
        'Decision paralysis? Just click the button and start playing, you fool!'
      )
    );

    for (let char of displayArray) {
      let sprite = this.spriteFactory.makeMenuTile(
        column,
        row,
        char.id,
        yMenuPad,
        ratio
      );

      let frame = this.spriteFactory.makeMenuTile(
        column,
        row,
        'frame',
        yMenuPad,
        ratio
      );

      sprite.inputEnabled = true;
      sprite.events.onInputDown.add(
        function() {
          this.setSelectedCharacter(char);
        }.bind(this)
      );

      char.frame = frame;

      column++;
      if (column === maxColumns) {
        row++;
        let finalRowIncomplete = displayArray.length < (row + 1) * column;
        if (finalRowIncomplete) {
          let finalRowCount = (row + 1) * column - displayArray.length;
          if ((maxColumns - finalRowCount) % 2 === 0) {
            column = (maxColumns - finalRowCount) / 2 - 1;
          } else {
            column = 0;
          }
        } else {
          column = 0;
        }
      }
    }

    this.yMenuPad = yMenuPad;
    this.ratio = ratio;
    this.displayArray = displayArray;

    let rnd = this.game.rnd.between(0, displayArray.length - 2);
    this.setSelectedCharacter(displayArray[rnd]);

    this.buttonFactory.make(
      635,
      935,
      ['start-1', 'start-2', 'start-3'],
      function() {
        this.gameStart();
      }.bind(this)
    );

    this.selectedSprite = this.spriteFactory.createSprite(
      590,
      550,
      this.selectedCharacter.id,
      2
    );
  }

  gameStart() {
    if (this.selectedCharacter.id === 'random') {
      this.selectedCharacter = this.displayArray[
        this.game.rnd.between(0, this.displayArray.length - 1)
      ];
    }
    this.gameboardConfig.mainTile = this.selectedCharacter;
    this.game.sound.play(`${this.selectedCharacter.id}-sfx`, 1);
    this.state.start('Unranked', true, false, this.gameboardConfig);
  }

  setSelectedCharacter(char: Tile) {
    this.game.sound.play('beep', 1.5);
    this.selectedCharacter = char;
    if (this.selectedSprite) {
      this.selectedSprite.loadTexture(char.id);
    }

    if (this.selectedFrame) {
      this.selectedFrame.tint = Phaser.Color.WHITE;
    }

    char.frame.tint = Phaser.Color.BLACK;
    this.selectedFrame = char.frame;

    if (!this.selectedName) {
      this.selectedName = this.textFactory.make(18, 700, char.name, 50);
    } else {
      this.selectedName.setText(char.name);
    }

    if (!this.selectedFullName) {
      this.selectedFullName = this.textFactory.makeXBoundedOptions(
        740,
        char.fullName,
        35,
        'left',
        600,
        20,
        -10
      );
    } else {
      this.selectedFullName.setText(char.fullName);
    }

    if (!this.selectedPower) {
      this.selectedPower = this.textFactory.make(
        20,
        875,
        `Special Power: ${char.powerName}`,
        30
      );
    } else {
      this.selectedPower.setText(`Special Power: ${char.powerName}`);
    }

    if (!this.selectedSummary) {
      this.selectedSummary = this.textFactory.makeXBounded(
        1040,
        char.summary,
        30,
        'left',
        true
      );
    } else {
      this.selectedSummary.setText(char.summary);
    }
  }

  update() {
    if (this.inputManager.checkKeys()) {
      this.gameStart();
    }
  }
}
