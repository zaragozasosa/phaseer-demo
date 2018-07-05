import GameboardConfig from './../Config/GameboardConfig';
import InputManager from './../InputManager';
import TileModel from './../Models/TileModel';

import { Config, Singleton, ColorSettings, Tools } from './../Config/Config';

export default class OldCharacterSelection extends Phaser.State {
  game: Phaser.Game;
  config: Config;
  tools: Tools;
  gameboardConfig: GameboardConfig;
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
    this.tools = singleton.tools;

    this.gameboardConfig = new GameboardConfig();
    this.inputManager = new InputManager(this.config);
    for (let sprite of this.gameboardConfig.tiles) {
      let path = `assets/images/${sprite.imagePath}`;
      let specialPath = `assets/images/${sprite.specialImagePath}`;
      let sfx = `assets/sfx/${sprite.sfxRoute}`;

      this.load.image(sprite.id, path);
      this.load.image(sprite.specialId, specialPath);
      this.load.audio(sprite.sfxLabel, [sfx]);
    }

    this.load.image('random', 'assets/images/tiles/random.png');

    this.preloadBar = this.tools.sprite.makeCentered(600, 'preloadBar', 2);
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
    displayArray = characters.filter(x => x.isMenuVisible);
    this.selectedSprite = null;
    this.selectedFullName = null;
    this.selectedName = null;
    this.selectedPower = null;
    this.selectedSummary = null;

    this.tools.graphic.addBackground();

    displayArray.push(
      new TileModel(
        'random',
        'Random',
        'Select a random character',
        '',
        'sound.wav',
        0,
        null,
        null,
        null,
        null,
        'Decision paralysis? Just click the button and start playing, you fool!'
      )
    );

    for (let char of displayArray) {
      let sprite = this.tools.sprite.makeMenuTile(
        column,
        row,
        char.id,
        0,
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

    let select = this.tools.text.makeXBounded(
      480,
      'Select your character',
      50,
      'center',
      ColorSettings.PRIMARY
    );

    let rnd = this.tools.misc.randomBetween(0, displayArray.length - 2);
    this.setSelectedCharacter(this.spriteArray[rnd], displayArray[rnd]);

    this.tools.button.make(
      675,
      965,
      ['start-1', 'start-2', 'start-3'],
      function() {
        this.gameStart();
      }.bind(this),
      1.5
    );

    this.selectedSprite = this.tools.sprite.createSprite(
      590,
      580,
      this.selectedCharacter.id,
      2
    );

    this.tools.text.make(20, 860, `Special Power:`, 35);
  }

  gameStart() {
    if (this.selectedCharacter.id === 'random') {
      this.selectedCharacter = this.displayArray[
        this.tools.misc.randomBetween(0, this.displayArray.length - 1)
      ];
    }
    this.gameboardConfig.mainTile = this.gameboardConfig.tiles.find(
      function(tile) {
        return tile.id === this.selectedCharacter.id;
      }.bind(this)
    );
    this.tools.audio.playCharacterSound(
      this.gameboardConfig.tiles.find(x => x.id === this.selectedCharacter.id)
    );
    this.state.start('Story', true, false, this.gameboardConfig);
  }

  setSelectedCharacter(sprite: Phaser.Sprite, char: TileModel) {
    this.tools.audio.playBeep();
    this.spriteArray.forEach(x => (x.tint = Phaser.Color.GRAY));

    sprite.tint = Phaser.Color.WHITE;
    this.selectedCharacter = char;
    if (this.selectedSprite) {
      this.selectedSprite.loadTexture(char.id);
    }

    if (!this.selectedName) {
      this.selectedName = this.tools.text.make(18, 700, char.name, 50);
    } else {
      this.selectedName.setText(char.name);
    }

    if (!this.selectedFullName) {
      this.selectedFullName = this.tools.text.makeXBoundedOptions(
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
      this.selectedPower = this.tools.text.make(
        20,
        900,
        `${char.power ? char.power.name : '?????'}`,
        40
      );
    } else {
      this.selectedPower.setText(`${char.power ? char.power.name : '?????'}`);
    }

    if (!this.selectedSummary) {
      this.selectedSummary = this.tools.text.makeXBounded(
        1040,
        char.summary,
        35,
        'left',
        ColorSettings.ALT_TEXT
      );
    } else {
      this.selectedSummary.setText(char.summary);
    }
  }

  update() {
    if (this.inputManager.checkKeys() === Phaser.Keyboard.ENTER) {
      this.gameStart();
    }
  }
}
