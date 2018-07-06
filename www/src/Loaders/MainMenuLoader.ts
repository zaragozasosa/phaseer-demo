export default class MainMenuLoader {

  loadResources(loader: Phaser.Loader) {
    loader.audio('test-bgm', ['assets/audio/Puzzle-Action-2.mp3']);
    
    loader.audio('title-bgm', ['assets/audio/meet-the-cast.mp3']);
    loader.audio('title-bgm-intro', ['assets/audio/meet-the-cast-intro.mp3']);

    loader.audio('beep', 'assets/sfx/beep.wav');
  }
}