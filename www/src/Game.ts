/// <reference path="../../node_modules/phaser-ce/typescript/phaser.comments.d.ts"/>

import { Config, SafeZone, TileSettings, Singleton } from './Config';
import Boot from './States/Boot';
import Preloader from './States/Preloader';
import MainMenu from './States/MainMenu';

export default class Game extends Phaser.Game {
  constructor() {
    let scaleFactor;
    let safeZone;
    let tileSettings;

    let config = Singleton.getInstance().config;

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

    tileSettings = new TileSettings();
    tileSettings.tileSize = 240;
    tileSettings.frameLineWidth = 4;
    tileSettings.lineColor = 0x003399;
    tileSettings.gridPaddingX = 0 * scaleFactor;
    tileSettings.gridPaddingY = 200 * scaleFactor;
    tileSettings.tileScale = 240 / 180;
    tileSettings.arraySize = 3;
    tileSettings.initialArray = [
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

    tileSettings.minimumValue = 1;
    tileSettings.tiles = [
      'nacho',
      'chili',
      'mira',
      'lord_fancy',
      'choco',
      'rox',
      'kinjo',
      'shy_senpai',
      'magil',
      'jessy',
      'agent_smith',
      'lily',
      'r1r1',
      'astaroth',
      'bren',
      'joji'
    ];
    tileSettings.mainTile = tileSettings.tiles[this.rnd.integerInRange(0, 15)];

    config.scaleFactor = scaleFactor;
    config.safeZone = safeZone;
    config.tileSettings = tileSettings;
    Singleton.getInstance().config = config;
    Singleton.getInstance().game = this;

    this.state.add('Boot', Boot, false);
    this.state.add('Preloader', Preloader, false);
    this.state.add('MainMenu', MainMenu, false);
    this.state.start('Boot');
  }
}

new Game();
