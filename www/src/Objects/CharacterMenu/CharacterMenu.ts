import GameboardConfig from './../../Config/GameboardConfig';
import TileModel from './../../Models/TileModel';
import Carrousel from './Carrousel';
import Base from './../../Base';
import { ColorSettings } from './../../Config/Config';

export default class CharacterMenu extends Base {
  private gameboardConfig: GameboardConfig;
  private displayArray: Array<TileModel>;
  private carrousel: Carrousel;
  private selectedName: Phaser.Text;
  private selectedFullName: Phaser.Text;
  private selectedSummary: Phaser.Text;
  private selectedPower: Phaser.Text;
  private startButton: Phaser.Button;
  private rightSprite: Phaser.Sprite;
  private leftSprite: Phaser.Sprite;
  private selectedCharacter: TileModel;  

  constructor(config: GameboardConfig) {
    super();
    this.gameboardConfig = config;
    this.create();
  }

  get selectedId() {
    return this.selectedCharacter.id;
  }

  update(cursor: number) {
    if(cursor === Phaser.Keyboard.RIGHT) {
      this.carrousel.nextCharacter(this.selectedCharacter);
    } else if (cursor === Phaser.Keyboard.LEFT) {
      this.carrousel.previousCharacter(this.selectedCharacter);
    }
  }

  private create() {
    this.initializeUI();
    this.displayArray = this.gameboardConfig.menuTiles;

    this.carrousel = new Carrousel(
      this.displayArray,
      function(character) {
        this.setSelectedCharacter(character);
      }.bind(this)
    );
  }

  private setSelectedCharacter(char: TileModel) {
    this.tools.audio.playBeep();

    let spritePosition = this.findSpritePosition(char);

    if (spritePosition === Phaser.RIGHT) {
      this.rightSprite.events.destroy();
      this.rightSprite.loadTexture(char.id);
      this.rightSprite.tint = Phaser.Color.WHITE;
      this.leftSprite.loadTexture(char.getMenuFriendId);
      this.leftSprite.events.onInputDown.addOnce(
        function() {
          this.setSelectedCharacter(
            this.gameboardConfig.getTileModel(char.getMenuFriendId)
          );
        }.bind(this)
      );
      this.leftSprite.tint = Phaser.Color.GRAY;
    } else {
      this.leftSprite.events.destroy();
      this.leftSprite.loadTexture(char.id);
      this.leftSprite.tint = Phaser.Color.WHITE;
      this.rightSprite.loadTexture(char.getMenuFriendId);
      this.rightSprite.tint = Phaser.Color.GRAY;
      this.rightSprite.events.onInputDown.addOnce(
        function() {
          this.setSelectedCharacter(
            this.gameboardConfig.getTileModel(char.getMenuFriendId)
          );
        }.bind(this)
      );
    }

    this.selectedCharacter = char;
    this.selectedName.setText(char.name);
    this.selectedFullName.setText(char.fullName);
    this.selectedPower.setText(`${char.power ? char.power.name : '?????'}`);
    this.selectedSummary.setText(char.summary);
  }

  private findSpritePosition(char: TileModel) {
    let i = this.gameboardConfig.tiles.findIndex(tile => tile.id === char.id);
    return i % 2 ? Phaser.RIGHT : Phaser.LEFT;
  }

  private initializeUI() {
    this.tools.text.makeXBounded(
      225,
      'Select your character',
      50,
      'center',
      ColorSettings.TEXT,
      true
    );

    this.selectedName = this.tools.text.make(18, 730, '', 50);

    this.selectedFullName = this.tools.text.make(18, 795, '', 35);

    this.tools.text.make(20, 850, `Special:`, 40);

    this.selectedPower = this.tools.text.makeStroked(
      205,
      843,
      '',
      45,
      ColorSettings.PRIMARY
    );

    this.selectedSummary = this.tools.text.makeXBounded(
      930,
      '',
      35,
      'left',
      ColorSettings.ALT_TEXT
    );

    this.rightSprite = this.tools.sprite.createSprite(530, 350, null, 2);
    this.rightSprite.inputEnabled = true;
    this.leftSprite = this.tools.sprite.createSprite(30, 350, null, 2);
    this.leftSprite.inputEnabled = true;
  }
}
