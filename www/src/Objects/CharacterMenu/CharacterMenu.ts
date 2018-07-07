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
  private specialLabel: Phaser.Text;

  constructor(config: GameboardConfig) {
    super();
    this.gameboardConfig = config;
    this.create();
  }

  get selectedId() {
    return this.selectedCharacter.id;
  }

  update(cursor: number) {
    if(this.carrousel.isBusy){
      return;
    }

    if (cursor === Phaser.Keyboard.RIGHT) {
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
      function(character, changePage) {
        this.setSelectedCharacter(character, changePage);
      }.bind(this)
    );
  }

  private setSelectedCharacter(char: TileModel, changePage: boolean) {
    this.tools.audio.playBeep();
    let spritePosition = this.findSpritePosition(char);

    if (spritePosition === Phaser.RIGHT) {
      this.rightSprite.loadTexture(char.id);
      this.rightSprite.tint = Phaser.Color.WHITE;
      this.rightSprite.events.destroy();

      this.leftSprite.loadTexture(char.getMenuFriendId);
      this.leftSprite.events.destroy();
      this.leftSprite.events.onInputDown.addOnce(
        function() {
          this.setSelectedCharacter(
            this.gameboardConfig.getTileModel(char.getMenuFriendId)
          );
        }.bind(this)
      );
      this.leftSprite.tint = Phaser.Color.GRAY;
    } else {
      this.leftSprite.loadTexture(char.id);
      this.leftSprite.tint = Phaser.Color.WHITE;
      this.leftSprite.events.destroy();

      this.rightSprite.loadTexture(char.getMenuFriendId);
      this.rightSprite.tint = Phaser.Color.GRAY;
      this.rightSprite.events.destroy();
      this.rightSprite.events.onInputDown.addOnce(
        function() {
          this.setSelectedCharacter(
            this.gameboardConfig.getMenuTileModel(char.getMenuFriendId)
          );
        }.bind(this)
      );
    }

    if (changePage) {
      this.rightSprite.alpha = 0;
      this.tools.tween.to(this.rightSprite, { alpha: 1 }, 300, true);
      this.leftSprite.alpha = 0;
      this.tools.tween.to(this.leftSprite, { alpha: 1 }, 300, true);

      this.selectedName.alpha = 0;
      this.tools.tween.to(this.selectedName, { alpha: 1 }, 300, true);
      this.selectedFullName.alpha = 0;
      this.tools.tween.to(this.selectedFullName, { alpha: 1 }, 300, true);
      this.selectedPower.alpha = 0;
      this.tools.tween.to(this.selectedPower, { alpha: 1 }, 300, true);
      this.selectedSummary.alpha = 0;
      this.tools.tween.to(this.selectedSummary, { alpha: 1 }, 300, true);
      this.specialLabel.alpha = 0;
      this.tools.tween.to(this.specialLabel, { alpha: 1 }, 300, true);
    }

    this.selectedCharacter = char;
    this.selectedName.setText(char.name);
    this.selectedFullName.setText(char.fullName);
    this.selectedPower.setText(`${char.power ? char.power.name : '?????'}`);
    this.selectedSummary.setText(char.summary);
  }

  private findSpritePosition(char: TileModel) {
    let i = this.gameboardConfig.menuTiles.findIndex(tile => tile.id === char.id);
    return i % 2 ? Phaser.RIGHT : Phaser.LEFT;
  }

  private initializeUI() {
    this.tools.text.makeXBounded(
      225,
      'Select your character',
      55,
      'center',
      ColorSettings.PRIMARY,
      true
    );

    let leftSign = this.tools.text.makeStroked(
      20,
      237,
      '<',
      60,
      ColorSettings.TEXT
    );
    let rightSign = this.tools.text.makeStroked(
      850,
      237,
      '>',
      60,
      ColorSettings.TEXT
    );

    this.selectedName = this.tools.text.makeStroked(8, 730, '', 65);

    this.selectedFullName = this.tools.text.make(18, 815, '', 35);

    this.specialLabel = this.tools.text.make(20, 865, `Special:`, 35);

    this.selectedPower = this.tools.text.makeStroked(
      185,
      853,
      '',
      45,
      ColorSettings.PRIMARY
    );

    this.selectedSummary = this.tools.text.makeXBounded(
      920,
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
