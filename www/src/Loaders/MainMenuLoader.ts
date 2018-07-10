export default class MainMenuLoader {

  loadResources(loader: Phaser.Loader) {    
    loader.audio('title-bgm', ['assets/audio/meet-the-cast.ogg']);
    loader.audio('title-bgm-intro', ['assets/audio/meet-the-cast-intro.ogg']);

    loader.audio('beep', 'assets/sfx/beep.wav');
  }
}