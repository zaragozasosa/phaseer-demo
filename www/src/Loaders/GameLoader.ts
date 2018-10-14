export default class CharacterSelectionLoader {

  loadResources(loader: Phaser.Loader) {
    loader.image('bullet', 'assets/images/bullet.png');
    loader.image('dice', 'assets/images/dice.png');
    loader.image('diamond', 'assets/images/diamond.png');

    loader.image('halloween_bg', 'assets/images/backgrounds/halloween.png');
    loader.image('mystery_bg', 'assets/images/backgrounds/mystery.png');
    loader.image('gacha_pull_bg', 'assets/images/backgrounds/gacha_pull.png');
    loader.image('space_dungeons_bg', 'assets/images/backgrounds/space_dungeons.png');
    loader.image('nationalism_bg', 'assets/images/backgrounds/nationalism.png');
    loader.image('reported_bg', 'assets/images/backgrounds/reported.png');
    loader.image('mexican_beagle_bg', 'assets/images/backgrounds/mexican_beagle.png');
    loader.image('nerd_code', 'assets/images/backgrounds/nerd_code.png');
    
    loader.image('menu', 'assets/images/menu.png');
    loader.image('bug', 'assets/images/bug.png');
    loader.image('bullet', 'assets/images/bullet.png');
    loader.image('dice', 'assets/images/dice.png');
    loader.image('diamond', 'assets/images/diamond.png');
    
    loader.audio('game-bgm', ['assets/audio/number-crunching.ogg']);
    loader.audio('game-bgm-intro', ['assets/audio/number-crunching-intro.ogg']);

    loader.audio('boss-bgm', ['assets/audio/number-decimation.ogg']);
    loader.audio('boss-bgm-intro', ['assets/audio/number-decimation-intro.ogg']);

    loader.spritesheet('power', 'assets/images/buttons/power.png', 249, 93);
    loader.spritesheet('sage', 'assets/images/buttons/sage.png', 249, 93);
    loader.spritesheet('ban', 'assets/images/buttons/ban.png', 249, 93);
    loader.spritesheet('report', 'assets/images/buttons/report.png', 249, 93);
  }
}