import GameboardConfig from './../../Config/GameboardConfig';
import TileModel from './../../Models/TileModel';
import Carrousel from './Carrousel';
import Base from './../../Base';
import { ColorSettings, } from './../../Config/Config';

export default class CharacterMenu extends Base {
  private gameboardConfig: GameboardConfig;
  private displayArray: Array<TileModel>;
  private carrousel: Carrousel;
  selectedCharacter: TileModel;

  selectedName: Phaser.Text;
  selectedFullName: Phaser.Text;
  selectedSummary: Phaser.Text;
  selectedPower: Phaser.Text;
  startButton: Phaser.Button;

  rightSprite: Phaser.Sprite;
  leftSprite: Phaser.Sprite;

  constructor(config: GameboardConfig) {
    super();
    this.gameboardConfig = config;
    this.create();
  }

  private create() {
    this.initializeUI();
    this.displayArray = this.gameboardConfig.tiles.filter(x => x.playable);

    this.displayArray.push(
      new TileModel(
        'random',
        'Random',
        'Select a random character',
        'nacho',
        '',
        0,
        null,
        null,
        null,
        null,
        'Decision paralysis? Just click the button and start playing, you fool!'
      )
    );

    this.carrousel = new Carrousel(this.displayArray, function (sprite, character) {
      this.setSelectedCharacter(sprite, character);
    }.bind(this));

  }

  private setSelectedCharacter(sprite: Phaser.Sprite, char: TileModel) {
    this.tools.audio.playBeep();

    let leftOrRight = this.tools.misc.randomBetween(0, 1);

    if (leftOrRight) {
      this.rightSprite.loadTexture(char.id);
      this.rightSprite.tint = Phaser.Color.WHITE;
      this.leftSprite.loadTexture(char.id === 'nacho' ? 'random' : char.friendId);
      this.leftSprite.tint = Phaser.Color.GRAY;
    } else {
      this.leftSprite.loadTexture(char.id);
      this.leftSprite.tint = Phaser.Color.WHITE;
      this.rightSprite.loadTexture(char.id === 'nacho' ? 'random' : char.friendId);
      this.rightSprite.tint = Phaser.Color.GRAY;
    }

    this.selectedCharacter = char;
    this.selectedName.setText(char.name);
    this.selectedFullName.setText(char.fullName);
    this.selectedPower.setText(`${char.power ? char.power.name : '?????'}`);
    this.selectedSummary.setText(char.summary);
  }

  private initializeUI() {
    this.tools.text.makeXBounded(
      230,
      'Select your character',
      50,
      'center',
      ColorSettings.PRIMARY
    );


    this.selectedName = this.tools.text.make(18, 700, '', 50);

    this.selectedFullName = this.tools.text.make(18, 765, '', 35);

    this.tools.text.make(20, 820, `Special Power:`, 35);

    this.selectedPower = this.tools.text.make(
      20,
      870,
      '',
      40
    );

    this.selectedSummary = this.tools.text.makeXBounded(
      950,
      '',
      35,
      'left',
      ColorSettings.ALT_TEXT
    );

    this.rightSprite = this.tools.sprite.createSprite(
      530,
      320,
      null,
      2
    );

    this.leftSprite = this.tools.sprite.createSprite(
      30,
      320,
      null,
      2
    );
  }
}