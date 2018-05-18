/// <reference path="../../node_modules/phaser-ce/typescript/phaser.comments.d.ts"/>

import { Config, SafeZone, GridSettings, Singleton } from './Config';
import Boot from './States/Boot';
import Preloader from './States/Preloader';
import MainMenu from './States/MainMenu';
import Unranked from './States/Unranked';
import CharacterSelection from './States/CharacterSelection';

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
    this.state.add('CharacterSelection', CharacterSelection, false);
    this.state.add('Unranked', Unranked, false);

    this.state.start('Boot');
  }
}

new Game();
