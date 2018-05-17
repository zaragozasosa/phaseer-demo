/// <reference path="../../node_modules/phaser-ce/typescript/phaser.comments.d.ts"/>

import { Config, SafeZone, GridSettings, Singleton, Tile } from './Config';
import Boot from './States/Boot';
import Preloader from './States/Preloader';
import MainMenu from './States/MainMenu';
import Unranked from './States/Unranked';

export default class Game extends Phaser.Game {
  constructor() {
    let scaleFactor;
    let safeZone;

    //let hasVisualViewport = window.visualViewport;
    let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    let paddingX = 0;
    let paddingY = 0;
    let safeWidth = 0;
    let safeHeight = 0;
    let baseWidth = 320;
    let baseHeight = 480;
    let maxPixelRatio = 3;
    let baseProportion = baseHeight / baseWidth;
    let screenPixelRatio =
      window.devicePixelRatio <= maxPixelRatio
        ? window.devicePixelRatio
        : maxPixelRatio;
    // let screenWidth = hasVisualViewport
    //   ? window.visualViewport.width * screenPixelRatio
    //   : window.innerWidth * screenPixelRatio;
    let screenWidth = window.innerWidth * screenPixelRatio;
    screenWidth = !isMobile && screenWidth > 1080 ? 1080 : screenWidth;
    // let screenHeight = hasVisualViewport
    //   ? window.visualViewport.height * screenPixelRatio
    //   : window.innerHeight * screenPixelRatio;
    let screenHeight = window.innerHeight * screenPixelRatio;
    screenHeight = !isMobile
      ? screenHeight / screenPixelRatio - 20
      : screenHeight > 940 ? 940 : screenHeight;
    var screenProportion = screenHeight / screenWidth;
    // var widthProportion = hasVisualViewport
    //   ? window.visualViewport.width / baseWidth
    //   : window.innerWidth / baseWidth;
    var widthProportion = window.innerWidth / baseWidth;

    super(screenWidth, screenHeight, Phaser.CANVAS, 'content', null, true);
    if (screenProportion > baseProportion) {
      safeWidth = screenWidth;
      safeHeight = safeWidth * baseProportion;
      paddingY = (screenHeight - safeHeight) / 2;
      scaleFactor = screenPixelRatio / 3 * widthProportion;
    } else if (screenProportion < baseProportion) {
      safeHeight = screenHeight;
      safeWidth = safeHeight / baseProportion;
      paddingX = (screenWidth - safeWidth) / 2;
      scaleFactor = safeWidth / (baseWidth * maxPixelRatio);
    }

    safeZone = new SafeZone(safeWidth, safeHeight, paddingX, paddingY);

    this.setupConfig(scaleFactor, safeZone);
    this.bootGame();
  }

  createTiles() {
    let list = [];
    list.push(
      new Tile(
        'nacho',
        'Nacho',
        'Ignacio Zaragoza',
        'chili',
        'gunshot.mp3',
        'A simple boy who claims being the long descendant of a famous general. His dog Chili often gets lost when visiting the park.'
      )
    );

    list.push(
      new Tile(
        'chili',
        'Chili',
        'Chili Bagel',
        'nacho',
        'bark.wav',
        "Hey, you shouldn't be able to read this!",
        false
      )
    );

    list.push(
      new Tile(
        'mira',
        'Mira',
        'Black Witch Mira',
        'fancy',
        'ahaha.wav',
        'Mira is a fickle, cruel witch that enjoys throwing humans into murder games. Also a low-profile online writer, only publishes using pen names.'
      )
    );

    list.push(
      new Tile(
        'fancy',
        'Lord Fancy',
        'Sir Lord Fancypants',
        'lord-fancy',
        'portal.mp3',
        'Fancy demon at day, even fancier at night. This creature of elegant nature was hired by Mira to capture humans and bake cookies.'
      )
    );

    list.push(
      new Tile(
        'kinjo',
        'Kinjo',
        'Kinjo Goldbar',
        'joueur',
        'coin.wav',
        "Famous indie developer addicted to vodka. One of his code's bugs ripped through the fabric of reality, now his day isn't complete without spontaneous time traveling."
      )
    );

    list.push(
      new Tile(
        'joueur',
        'Joueur',
        'XxX-Joueur-Timide-PRO-XxX',
        'kinjo',
        'sorry.wav',
        "Canadian pro-gamer online, shy as hell in real life. Afraid of social interaction, hides her gender online. Big fan of Kinjo's work."
      )
    );

    list.push(
      new Tile(
        'smith',
        'Agent Smith',
        'Codename: S.N.O.W',
        'lily',
        'radio.mp3',
        'Top trained FBI agent, impossible crimes and murders are his speciality. Fluently speaks 32 languages, expert cook, master of observation and deduction.'
      )
    );

    list.push(
      new Tile(
        'lily',
        'Lily',
        'Lily Hast',
        'smith',
        'sweeping.wav',
        'A clumsy maid devoted to her master. Cleaning is her passion and she likes to do her job thoroughly. Sometimes too thoroughly.'
      )
    );

    list.push(
      new Tile(
        'bren',
        'Bren',
        'brotherhating_ridiculously_efficient_nerd.py',
        'meushijyo',
        'wow.wav',
        'Cutting-edge sentinent Artificial Intelligence. Instead of planning the end of the world, this script enjoys munching numbers, playing games and explaining why other players suck.'
      )
    );

    list.push(
      new Tile(
        'meushijyo',
        'Meushi',
        'Meushi Jyoji',
        'bren',
        'keyboard.mp3',
        'Genius programmer, created BREN trying to code the perfect little sister, but now she refuses to listen to him. Could get a job anywhere he wanted, but prefers the NEET lifestyle.'
      )
    );

    list.push(
      new Tile(
        'rox',
        'Roxx',
        'Roxx Ann',
        'choco',
        'fire.mp3',
        "A reserved fairy who comes from the Land of Fiction, highly skilled in fire magic. Often visits our world looking for books or japanese media. Choco's close friend."
      )
    );

    list.push(
      new Tile(
        'choco',
        'Choco',
        'Choco Jax',
        'rox',
        'pencil.mp3',
        'Professional digital artist, no lewd commissions (only Patreon)! Close friend of Rox, they met each other years ago through the popular online community "Neon Virtual Pets: Z".'
      )
    );

    list.push(
      new Tile(
        'attarou',
        'Attarou',
        'Attarou Lionstar',
        'r1r1',
        'box.mp3',
        'Cosplay amateur, full of creativity. Capable of taking a bunch of trash and creating a totally functional budget costume. His cat often accompanies him to cons.'
      )
    );

    list.push(
      new Tile(
        'r1r1',
        'R1-R1',
        'Autonomous Socialization Unit R1-R1',
        'attarou',
        'letsrock.wav',
        "Highly advanced robotic entity, fugitive from the secret lab where it was assembled, this robot now spends his time in what it found most interesting, human's roleplaying."
      )
    );

    list.push(
      new Tile(
        'magil',
        'Magil',
        'Dungeon Master Magil',
        'jessy',
        'dice.mp3',
        'Dungeon Master of legend, owner of a thousand stories. Has been trying to get her friend Jessy into roleplaying games for a while, without much success.'
      )
    );

    list.push(
      new Tile(
        'jessy',
        'Jessy',
        'Ph.D. Jessy',
        'magil',
        'red.mp3',
        "Witch Doctor, psychologist and compulsive liar. When she's not out in a distant galaxy, the psych enjoys spending time with Magil, although she's not very fond of the nerdy stuff."
      )
    );

    return list;
  }

  setupConfig(scaleFactor: number, safeZone: SafeZone) {
    let gridSettings: GridSettings;
    let config = Singleton.getInstance().config;

    gridSettings = new GridSettings();
    gridSettings.tileSize = 240;
    gridSettings.frameLineWidth = 4;
    gridSettings.lineColor = 0x003399;
    gridSettings.gridPaddingX = 0 * scaleFactor;
    gridSettings.gridPaddingY = 200 * scaleFactor;
    gridSettings.tileScale = 240 / 180;
    gridSettings.arraySize = 3;
    gridSettings.initialArray = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ];

    gridSettings.minimumValue = 1;
    gridSettings.tiles = this.createTiles();
    gridSettings.mainTile =
      gridSettings.tiles[
        this.rnd.integerInRange(0, gridSettings.tiles.length - 1)
      ].id;

    config.scaleFactor = scaleFactor;
    config.safeZone = safeZone;
    config.gridSettings = gridSettings;

    Singleton.getInstance().config = config;
    Singleton.getInstance().game = this;
  }

  bootGame() {
    this.state.add('Boot', Boot, false);
    this.state.add('Preloader', Preloader, false);
    this.state.add('MainMenu', MainMenu, false);
    this.state.add('Unranked', Unranked, false);

    this.state.start('Boot');
  }
}

new Game();
