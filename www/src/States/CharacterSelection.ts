import GameboardConfig from './../Object/GameboardConfig';
import SpriteFactory from './../Tools/SpriteFactory';
import Tile from './../Object/Tile';
import TextFactory from './../Tools/TextFactory';
import { Config, Singleton } from './../Config';
import ButtonFactory from './../Tools/ButtonFactory';

export default class CharacterSelection extends Phaser.State {
  game: Phaser.Game;
  config: Config;
  gameboardConfig: GameboardConfig;
  spriteFactory: SpriteFactory;
  textFactory: TextFactory;
  buttonFactory: ButtonFactory;
  preloadBar: Phaser.Sprite;
  selectedCharacter: Tile;
  selectedFrame: Phaser.Graphics;
  selectedName: Phaser.Text;
  selectedFullName: Phaser.Text;
  selectedSummary: Phaser.Text;
  selectedPower: Phaser.Text;
  selectedSprite: Phaser.Sprite;
  startButton: Phaser.Button;

  displayArray: Array<Tile>;
  menuItems: Array<Phaser.Sprite>;
  updated: boolean;

  ratio: number;
  yMenuPad: number;

  preload() {
    let singleton = Singleton.getInstance();
    this.game = singleton.game;
    this.config = singleton.config;

    this.gameboardConfig = new GameboardConfig();
    this.spriteFactory = new SpriteFactory();
    this.textFactory = new TextFactory();
    this.buttonFactory = new ButtonFactory();
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
    // let playableGroups = this.gameboardConfig.groups.filter(
    //   x => x !== '5DeMayo'
    // );

    // while (displayArray.length < playableGroups.length * 2) {
    //   let randomGroup =
    //     playableGroups[this.game.rnd.between(0, playableGroups.length - 1)];
    //   if (!displayArray.some(x => x.powerId === randomGroup)) {
    //     displayArray = displayArray.concat(
    //       characters.filter(x => x.powerId === randomGroup)
    //     );
    //   }
    // }

    // displayArray.push(characters.find(x => x.id === 'nacho'));
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
      sprite.inputEnabled = true;
      sprite.events.onInputDown.add(
        function() {
          this.setSelectedCharacter(char);
        }.bind(this)
      );

      char.sprite = sprite;
      char.gridX = column;
      char.gridY = row;

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
    this.setSelectedCharacter(displayArray[0]);

    this.buttonFactory.make(
      635,
      935,
      ['start-1', 'start-2', 'start-3'],
      function() {
        this.gameStart();
      }.bind(this)
    );

    this.selectedSprite = this.spriteFactory.createSprite(
      570,
      530,
      this.selectedCharacter.id,
      2.1
    );
  }

  gameStart() {
    if (this.selectedCharacter.id === 'random') {
      this.selectedCharacter = this.displayArray[
        this.game.rnd.between(0, this.displayArray.length - 1)
      ];
    }
    this.gameboardConfig.mainTile = this.selectedCharacter;
    this.game.sound.play(`${this.selectedCharacter.id}-sfx`, 1.5);
    this.state.start('Unranked', true, false, this.gameboardConfig);
  }

  setSelectedCharacter(char: Tile) {
    this.game.sound.play('beep', 2);
    this.selectedCharacter = char;
    if (this.selectedSprite) {
      this.selectedSprite.loadTexture(char.id);
    }

    this.selectedFrame = this.spriteFactory.makeTileFrame(
      char.gridX,
      char.gridY,
      this.ratio,
      0,
      this.yMenuPad
    );

    if (!this.selectedName) {
      this.selectedName = this.textFactory.make(
        -633,
        -190,
        char.name,
        50,
        false,
        '#ffffff'
      );
    } else {
      this.selectedName.setText(char.name);
    }

    if (!this.selectedFullName) {
      this.selectedFullName = this.textFactory.make(
        -630,
        -120,
        char.fullName,
        35,
        false,
        '#ffffff'
      );
    } else {
      this.selectedFullName.setText(char.fullName);
    }

    if (!this.selectedPower) {
      this.selectedPower = this.textFactory.make(
        -630,
        -70,
        `Special ability: ${char.powerName}`,
        35,
        false,
        '#ffffff'
      );
    } else {
      this.selectedPower.setText(`Special ability: ${char.powerName}`);
    }

    if (!this.selectedSummary) {
      this.selectedSummary = this.textFactory.makeYBounded(
        0,
        char.summary,
        35,
        'bottom'
      );

      this.selectedSummary.addChild(this.selectedPower);
      this.selectedSummary.addChild(this.selectedFullName);
      this.selectedSummary.addChild(this.selectedName);
    } else {
      this.selectedSummary.setText(char.summary);
    }
  }
}
