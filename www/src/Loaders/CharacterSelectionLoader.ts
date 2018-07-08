import TileModel from './../Models/TileModel';

export default class CharacterSelectionLoader {
  private tiles: Array<TileModel>;

  constructor(tiles: Array<TileModel>) {
    this.tiles = tiles;
  }

  loadResources(loader: Phaser.Loader) {
    loader.image('frame', 'assets/images/frame.png');

    loader.spritesheet('start', 'assets/images/buttons/start.png', 249, 93);

    for (let sprite of this.tiles) {
      let sfx = `assets/sfx/${sprite.sfxRoute}`;
      loader.audio(sprite.sfxLabel, [sfx]);
    }
  }
}