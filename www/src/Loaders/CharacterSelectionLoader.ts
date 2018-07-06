import TileModel from './../Models/TileModel';

export default class CharacterSelectionLoader {
  private tiles: Array<TileModel>;

  constructor(tiles: Array<TileModel>) {
    this.tiles = tiles;
  }

  loadResources(loader: Phaser.Loader) {
    loader.image('start-1', 'assets/images/start-1.png');
    loader.image('start-2', 'assets/images/start-2.png');
    loader.image('start-3', 'assets/images/start-3.png');
    loader.image('frame', 'assets/images/frame.png');
    loader.image('random', 'assets/images/tiles/random.png');

    loader.spritesheet('smith-sheet', 'assets/images/smith.png', 180, 180);
    loader.spritesheet('lily-sheet', 'assets/images/lily.png', 180, 180);

    for (let sprite of this.tiles) {
      let sfx = `assets/sfx/${sprite.sfxRoute}`;
      loader.audio(sprite.sfxLabel, [sfx]);
    }
  }
}