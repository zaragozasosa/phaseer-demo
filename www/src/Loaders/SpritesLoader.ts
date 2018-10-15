import GameboardConfig from './../Config/GameboardConfig'
export default class SpritesLoader {

    loadResources(loader: Phaser.Loader, config: GameboardConfig) {
      for (let sprite of config.baseList) {
        let path = `assets/images/${sprite.imagePath}`;
        loader.spritesheet(sprite.spriteId, path, 180, 180);
      }
    }
  }