"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = require("./Config");
var Boot_1 = require("./States/Boot");
var Preloader_1 = require("./States/Preloader");
var MainMenu_1 = require("./States/MainMenu");
var Unranked_1 = require("./States/Unranked");
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = this;
        var scaleFactor;
        var safeZone;
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        var paddingX = 0;
        var paddingY = 0;
        var safeWidth = 0;
        var safeHeight = 0;
        var baseWidth = 320;
        var baseHeight = 480;
        var maxPixelRatio = 3;
        var baseProportion = baseHeight / baseWidth;
        var screenPixelRatio = window.devicePixelRatio <= maxPixelRatio
            ? window.devicePixelRatio
            : maxPixelRatio;
        var screenWidth = window.innerWidth * screenPixelRatio;
        screenWidth = !isMobile && screenWidth > 1080 ? 1080 : screenWidth;
        var screenHeight = window.innerHeight * screenPixelRatio;
        screenHeight = !isMobile
            ? screenHeight / screenPixelRatio - 20
            : screenHeight > 940 ? 940 : screenHeight;
        var screenProportion = screenHeight / screenWidth;
        var widthProportion = window.innerWidth / baseWidth;
        _this = _super.call(this, screenWidth, screenHeight, Phaser.CANVAS, 'content', null, true) || this;
        if (screenProportion > baseProportion) {
            safeWidth = screenWidth;
            safeHeight = safeWidth * baseProportion;
            paddingY = (screenHeight - safeHeight) / 2;
            scaleFactor = screenPixelRatio / 3 * widthProportion;
        }
        else if (screenProportion < baseProportion) {
            safeHeight = screenHeight;
            safeWidth = safeHeight / baseProportion;
            paddingX = (screenWidth - safeWidth) / 2;
            scaleFactor = safeWidth / (baseWidth * maxPixelRatio);
        }
        safeZone = new Config_1.SafeZone(safeWidth, safeHeight, paddingX, paddingY);
        _this.setupConfig(scaleFactor, safeZone);
        _this.bootGame();
        return _this;
    }
    Game.prototype.createTiles = function () {
        var list = [];
        list.push(new Config_1.Tile('nacho', 'Nacho', 'Ignacio Zaragoza', 'chili', 'gunshot.mp3', 'A simple boy who claims being the long descendant of a famous general. His dog Chili often gets lost when visiting the park.'));
        list.push(new Config_1.Tile('chili', 'Chili', 'Chili Bagel', 'nacho', 'bark.wav', "Hey, you shouldn't be able to read this!", false));
        list.push(new Config_1.Tile('mira', 'Mira', 'Black Witch Mira', 'fancy', 'ahaha.wav', 'Mira is a fickle, cruel witch that enjoys throwing humans into murder games. Also a low-profile online writer, only publishes using pen names.'));
        list.push(new Config_1.Tile('fancy', 'Lord Fancy', 'Sir Lord Fancypants', 'lord-fancy', 'portal.mp3', 'Fancy demon at day, even fancier at night. This creature of elegant nature was hired by Mira to capture humans and bake cookies.'));
        list.push(new Config_1.Tile('kinjo', 'Kinjo', 'Kinjo Goldbar', 'joueur', 'coin.wav', "Famous indie developer addicted to vodka. One of his code's bugs ripped through the fabric of reality, now his day isn't complete without spontaneous time traveling."));
        list.push(new Config_1.Tile('joueur', 'Joueur', 'XxX-Joueur-Timide-PRO-XxX', 'kinjo', 'sorry.wav', "Canadian pro-gamer online, shy as hell in real life. Afraid of social interaction, hides her gender online. Big fan of Kinjo's work."));
        list.push(new Config_1.Tile('smith', 'Agent Smith', 'Codename: S.N.O.W', 'lily', 'radio.mp3', 'Top trained FBI agent, impossible crimes and murders are his speciality. Fluently speaks 32 languages, expert cook, master of observation and deduction.'));
        list.push(new Config_1.Tile('lily', 'Lily', 'Lily Hast', 'smith', 'sweeping.wav', 'Waiting for Tah.'));
        list.push(new Config_1.Tile('bren', 'Bren', 'brotherhating_ridiculously_efficient_nerd.py', 'meushijyo', 'wow.wav', 'Cutting-edge sentinent Artificial Intelligence. Instead of planning the end of the world, this script enjoys munching numbers, playing games and explaining why other players suck.'));
        list.push(new Config_1.Tile('meushijyo', 'Meushi', 'Meushi Jyoji', 'bren', 'keyboard.mp3', 'Genius programmer, created BREN trying to code the perfect little sister, but now she refuses to listen to him. Could get a job anywhere he wanted, but prefers the NEET lifestyle.'));
        list.push(new Config_1.Tile('rox', 'Roxx', 'Roxx Ann', 'choco', 'fire.mp3', "A reserved fairy who comes from the Land of Fiction, highly skilled in fire magic. Often visits our world looking for books or japanese media. Choco's close friend."));
        list.push(new Config_1.Tile('choco', 'Choco', 'Choco Jax', 'rox', 'pencil.mp3', 'Professional digital artist, no lewd commissions! Close friend of Rox, they met each other years ago through the popular online community "Neon Virtual Pets: Z".'));
        list.push(new Config_1.Tile('attarou', 'Attarou', 'Attarou Lionstar', 'r1r1', 'box.mp3', 'Cosplay amateur, full of creativity. Capable of taking a bunch of trash and creating a totally functional budget costume. His cat often accompanies him to cons.'));
        list.push(new Config_1.Tile('r1r1', 'R1-R1', 'Autonomous Socialization Unit R1-R1', 'attarou', 'letsrock.wav', "Highly advanced robotic entity, fugitive from the secret lab where it was assembled, this robot now spends his time in what it found most interesting, human's roleplaying."));
        list.push(new Config_1.Tile('magil', 'Magil', 'Dungeon Master Magil', 'jessy', 'dice.mp3', 'Dungeon Master of legend, owner of a thousand stories. Has been trying to get her friend Jessy into roleplaying games for a while, without much success.'));
        list.push(new Config_1.Tile('jessy', 'Jessy', 'Ph.D. Jessy', 'magil', 'red.mp3', "Witch Doctor, psychologist and compulsive liar. When she's not out in a distant galaxy, the psych enjoys spending time with Magil, although she's not very fond of the nerdy stuff."));
        return list;
    };
    Game.prototype.setupConfig = function (scaleFactor, safeZone) {
        var gridSettings;
        var config = Config_1.Singleton.getInstance().config;
        gridSettings = new Config_1.GridSettings();
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
            gridSettings.tiles[this.rnd.integerInRange(0, gridSettings.tiles.length - 1)].id;
        config.scaleFactor = scaleFactor;
        config.safeZone = safeZone;
        config.gridSettings = gridSettings;
        Config_1.Singleton.getInstance().config = config;
        Config_1.Singleton.getInstance().game = this;
    };
    Game.prototype.bootGame = function () {
        this.state.add('Boot', Boot_1.default, false);
        this.state.add('Preloader', Preloader_1.default, false);
        this.state.add('MainMenu', MainMenu_1.default, false);
        this.state.add('Unranked', Unranked_1.default, false);
        this.state.start('Boot');
    };
    return Game;
}(Phaser.Game));
exports.default = Game;
new Game();
