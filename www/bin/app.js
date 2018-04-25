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
var MyGame;
(function (MyGame) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Boot.prototype.init = function () {
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            if (this.game.device.desktop) {
                this.scale.pageAlignHorizontally = true;
            }
            else {
                this.scale.forcePortrait = true;
                this.scale.pageAlignHorizontally = true;
                this.scale.pageAlignVertically = true;
            }
        };
        Boot.prototype.preload = function () {
            this.load.image('preloadBar', 'img/loader.png');
        };
        Boot.prototype.create = function () {
            this.game.state.start('Preloader');
        };
        return Boot;
    }(Phaser.State));
    MyGame.Boot = Boot;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = this;
            var paddingX = 0;
            var paddingY = 0;
            var safeWidth = 0;
            var safeHeight = 0;
            var baseWidth = 320;
            var baseHeight = 480;
            var maxPixelRatio = 3;
            var baseProportion = baseHeight / baseWidth;
            var screenPixelRatio = window.devicePixelRatio <= maxPixelRatio ? window.devicePixelRatio : maxPixelRatio;
            var screenWidth = window.visualViewport.width * screenPixelRatio;
            screenWidth = screenPixelRatio == 1 && screenWidth > 1080 ? 1080 : screenWidth;
            var screenHeight = window.visualViewport.height * screenPixelRatio;
            screenHeight = screenPixelRatio == 1 && screenHeight > 940 ? 940 : screenHeight;
            var screenProportion = screenHeight / screenWidth;
            var widthProportion = window.visualViewport.width / baseWidth;
            _this = _super.call(this, screenWidth, screenHeight, Phaser.CANVAS, 'content') || this;
            if (screenProportion > baseProportion) {
                safeWidth = screenWidth;
                safeHeight = safeWidth * baseProportion;
                paddingY = (screenHeight - safeHeight) / 2;
                _this.scaleFactor = (screenPixelRatio / 3) * widthProportion;
            }
            else if (screenProportion < baseProportion) {
                safeHeight = screenHeight;
                safeWidth = safeHeight / baseProportion;
                paddingX = (screenWidth - safeWidth) / 2;
                _this.scaleFactor = safeWidth / (baseWidth * maxPixelRatio);
            }
            _this.safeZone = {
                safeWidth: safeWidth,
                safeHeight: safeHeight,
                paddingX: paddingX,
                paddingY: paddingY
            };
            _this.tileSettings = {
                tileSize: 240,
                frameLineWidth: 4,
                lineColor: 0x0000FF,
                gridPaddingX: 0 * _this.scaleFactor,
                gridPaddingY: 200 * _this.scaleFactor
            };
            _this.state.add('Boot', MyGame.Boot, false);
            _this.state.add('Preloader', MyGame.Preloader, false);
            _this.state.add('MainMenu', MyGame.MainMenu, false);
            _this.state.start('Boot');
            return _this;
        }
        return Game;
    }(Phaser.Game));
    MyGame.Game = Game;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainMenu.prototype.create = function () {
            var x = this.game.tileSettings.tileSize * this.game.scaleFactor;
            this.addWhiteBackground();
            this.addFrameBackground();
            this.addScore();
            this.addPuzzleTile(0, 0, 'cirno', 2);
            this.addPuzzleTile(0, 1, 'genji', 4);
            this.addPuzzleTile(1, 0, 'ozaki', 8);
            this.addPuzzleTile(1, 1, 'choco', 16);
            this.addPuzzleTile(2, 0, 'rosa', 32);
            this.addPuzzleTile(2, 1, 'genji', 64);
            this.addPuzzleTile(3, 0, 'cirno', 128);
            this.addPuzzleTile(3, 1, 'ozaki', 256);
            this.addPuzzleTile(0, 2, 'choco', 512);
            this.addPuzzleTile(1, 2, 'ozaki', 1024);
            this.addPuzzleTile(2, 2, 'genji', 2048);
            this.addPuzzleTile(3, 2, 'rosa', 2);
            this.addPuzzleTile(0, 3, 'ozaki', 2);
            this.addPuzzleTile(1, 3, 'rosa', 2);
            this.addPuzzleTile(2, 3, 'cirno', 2);
            this.addPuzzleTile(3, 3, 'choco', 2);
        };
        MainMenu.prototype.addPuzzleTile = function (posX, posY, id, number) {
            var scale = this.game.tileSettings.tileSize * this.game.scaleFactor;
            var textX = (posX) * scale;
            var textY = (posY) * scale;
            this.addSprite(posX * scale, posY * scale, id);
            this.addTileFrame(posX * scale, posY * scale);
            this.addStrokedText(textX, textY, number.toString());
        };
        MainMenu.prototype.addTileFrame = function (posX, posY) {
            var graphics = this.game.add.graphics(0, 0);
            var lineWidth = this.game.tileSettings.frameLineWidth;
            var frameSize = this.game.tileSettings.tileSize - (lineWidth / 2);
            var color = this.game.tileSettings.lineColor;
            var xPad = this.game.safeZone.paddingX + this.game.tileSettings.gridPaddingX;
            var yPad = this.game.safeZone.paddingY + this.game.tileSettings.gridPaddingY;
            graphics.lineStyle(lineWidth, color, 1);
            graphics.drawRect(posX + xPad, posY + yPad, frameSize * this.game.scaleFactor, frameSize * this.game.scaleFactor);
        };
        MainMenu.prototype.addSprite = function (posX, posY, id) {
            var game = this.game;
            var xPad = game.safeZone.paddingX + this.game.tileSettings.gridPaddingX;
            var yPad = game.safeZone.paddingY + this.game.tileSettings.gridPaddingY;
            var sprite = this.add.sprite(posX + xPad, posY + yPad, id);
            sprite.scale.setTo(game.scaleFactor, game.scaleFactor);
        };
        MainMenu.prototype.addWhiteBackground = function () {
            var game = this.game;
            var xPad = game.safeZone.paddingX;
            var yPad = game.safeZone.paddingY;
            var graphics = this.game.add.graphics(0, 0);
            graphics.lineStyle(0);
            graphics.beginFill(0xffffff, 1);
            graphics.drawRect(xPad, yPad, game.safeZone.safeWidth, game.safeZone.safeHeight);
            graphics.endFill();
        };
        MainMenu.prototype.addFrameBackground = function () {
            var game = this.game;
            var xPad = game.safeZone.paddingX + game.tileSettings.gridPaddingX;
            var yPad = game.safeZone.paddingY + game.tileSettings.gridPaddingY;
            var graphics = game.add.graphics(0, 0);
            graphics.lineStyle(0);
            graphics.beginFill(0xADD8E6, 1);
            graphics.drawRect(xPad, yPad, game.tileSettings.tileSize * 4 * game.scaleFactor, game.tileSettings.tileSize * 4 * game.scaleFactor);
            graphics.endFill();
        };
        MainMenu.prototype.addScore = function () {
        };
        MainMenu.prototype.addStrokedText = function (posX, posY, text) {
            var xPad = this.game.safeZone.paddingX + this.game.tileSettings.gridPaddingX;
            var yPad = this.game.safeZone.paddingY + this.game.tileSettings.gridPaddingY;
            var textObj = this.game.add.text(posX + xPad, posY + yPad, text);
            textObj.font = 'Arial Black';
            textObj.fontSize = 40 * this.game.scaleFactor;
            textObj.stroke = '#000000';
            textObj.strokeThickness = 10 * this.game.scaleFactor;
            textObj.addColor('#ffffff', 0);
        };
        return MainMenu;
    }(Phaser.State));
    MyGame.MainMenu = MainMenu;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.ready = false;
            return _this;
        }
        Preloader.prototype.preload = function () {
            this.preloadBar = this.add.sprite(0, 0, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);
            this.load.image('cirno', 'img/cirnotest.png');
            this.load.image('choco', 'img/chocotest.png');
            this.load.image('ozaki', 'img/ozakitest.png');
            this.load.image('rosa', 'img/rosatest.png');
            this.load.image('genji', 'img/genjitest.png');
        };
        Preloader.prototype.create = function () {
            this.game.state.start('MainMenu');
        };
        return Preloader;
    }(Phaser.State));
    MyGame.Preloader = Preloader;
})(MyGame || (MyGame = {}));
//# sourceMappingURL=app.js.map