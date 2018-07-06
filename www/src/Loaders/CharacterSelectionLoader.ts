import TileModel from './../Models/TileModel';

export default class CharacterSelectionLoader {
  private tiles: Array<TileModel>;

  constructor(tiles: Array<TileModel>) {
    this.tiles = tiles;
  }

  loadResources(loader: Phaser.Loader) {
    loader.image('frame', 'assets/images/frame.png');
    loader.image('random', 'assets/images/tiles/random.png');

    loader.spritesheet('start', 'assets/images/start.png', 249, 93);
    loader.spritesheet('smith-sheet', 'assets/images/smith.png', 180, 180);
    loader.spritesheet('lily-sheet', 'assets/images/lily.png', 180, 180);

    for (let sprite of this.tiles) {
      let sfx = `assets/sfx/${sprite.sfxRoute}`;
      loader.audio(sprite.sfxLabel, [sfx]);
    }
  }
}