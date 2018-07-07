export default class CharacterSelectionLoader {

  loadResources(loader: Phaser.Loader) {
    loader.image('bullet', 'assets/images/bullet.png');
    loader.image('dice', 'assets/images/dice.png');
    loader.image('diamond', 'assets/images/diamond.png');
    loader.image('witch', 'assets/images/witch.jpeg');
    loader.image('menu', 'assets/images/menu.png');
    loader.image('bug', 'assets/images/bug.png');
    loader.image('bullet', 'assets/images/bullet.png');
    loader.image('dice', 'assets/images/dice.png');
    loader.image('diamond', 'assets/images/diamond.png');
    
    loader.audio('game-bgm', ['assets/audio/number-crunching.mp3']);
    loader.audio('game-bgm-intro', ['assets/audio/number-crunching-intro.mp3']);

    loader.spritesheet('power', 'assets/images/power.png', 249, 93);
  }
}