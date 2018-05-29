import GameboardConfig from './../Config/GameboardConfig';
import SpriteFactory from './../Tools/SpriteFactory';
import GraphicsFactory from './../Tools/GraphicsFactory';

import InputManager from './../InputManager';
import TileModel from './../Models/TileModel';

import TextFactory from './../Tools/TextFactory';
import { Config, Singleton } from './../Config/Config';
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
  selectedCharacter: TileModel;
  spriteArray: Array<Phaser.Sprite>;
  displayArray: Array<TileModel>;
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
    let singleton = Singleton.get();
    this.config = singleton.config;

    this.gameboardConfig = new GameboardConfig();
    this.spriteFactory = new SpriteFactory(this.config);
    this.textFactory = new TextFactory(this.config);
    this.graphicsFactory = new GraphicsFactory(this.config);
    this.buttonFactory = new ButtonFactory(this.config);
    this.inputManager = new InputManager(this.config);
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
    let yMenuPad = 5;
    let row = 0;
    let column = 0;
    let arraySize = this.gameboardConfig.arraySize + 1;
    let maxColumns = 6;
    let ratio = arraySize / maxColumns;
    let characters: Array<TileModel>;
    let displayArray: Array<TileModel> = [];
    this.spriteArray = [];
    this.menuItems = [];
    characters = JSON.parse(JSON.stringify(this.gameboardConfig.tiles));
    displayArray = characters.filter(x => x.playable);

    this.graphicsFactory.addBackground();

    displayArray.push(
      new TileModel(
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
      sprite.tint = Phaser.Color.GRAY;
      this.spriteArray.push(sprite);

      sprite.inputEnabled = true;
      sprite.events.onInputDown.add(
        function() {
          this.setSelectedCharacter(sprite, char);
        }.bind(this)
      );

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

    let select = this.textFactory.makeXBounded(
      480,
      'Select your character',
      50,
      'center'
    );

    let rnd = this.game.rnd.between(0, displayArray.length - 2);
    this.setSelectedCharacter(this.spriteArray[rnd], displayArray[rnd]);

    this.buttonFactory.make(
      675,
      965,
      ['start-1', 'start-2', 'start-3'],
      function() {
        this.gameStart();
      }.bind(this),
      1.5
    );

    this.selectedSprite = this.spriteFactory.createSprite(
      590,
      580,
      this.selectedCharacter.id,
      2
    );

    this.textFactory.make(20, 860, `Special Power:`, 35);
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

  setSelectedCharacter(sprite: Phaser.Sprite, char: TileModel) {
    this.game.sound.play('beep', 1);
    this.spriteArray.forEach(x => (x.tint = Phaser.Color.GRAY));

    sprite.tint = Phaser.Color.WHITE;
    this.selectedCharacter = char;
    if (this.selectedSprite) {
      this.selectedSprite.loadTexture(char.id);
    }

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
        900,
        `${char.powerName}`,
        40
      );
    } else {
      this.selectedPower.setText(`${char.powerName}`);
    }

    if (!this.selectedSummary) {
      this.selectedSummary = this.textFactory.makeXBounded(
        1040,
        char.summary,
        35,
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
