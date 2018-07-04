import GameboardConfig from './../../Config/GameboardConfig';
import TileModel from './../../Models/TileModel';
import Carrousel from './Carrousel';


export default class CharacterMenu {
  private gameboardConfig: GameboardConfig;
  private displayArray: Array<TileModel>;
  private carrousel: Carrousel;

  constructor(config: GameboardConfig) {
    this.gameboardConfig = config;
    this.create();
  }

  create() {
    this.displayArray = this.gameboardConfig.tiles.filter(x => x.playable);

    this.displayArray.push(
      new TileModel(
        'random',
        'Random',
        'Select a random character',
        '',
        '',
        0,
        null,
        null,
        null,
        null,
        'Decision paralysis? Just click the button and start playing, you fool!'
      )
    );

    this.carrousel = new Carrousel(this.displayArray, function(character) {

    }.bind(this));

  }
}