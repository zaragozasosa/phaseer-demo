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
            this.game.time.desiredFps = 30;
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
            var hasVisualViewport = window.visualViewport;
            var paddingX = 0;
            var paddingY = 0;
            var safeWidth = 0;
            var safeHeight = 0;
            var baseWidth = 320;
            var baseHeight = 480;
            var maxPixelRatio = 3;
            var baseProportion = baseHeight / baseWidth;
            var screenPixelRatio = window.devicePixelRatio <= maxPixelRatio ? window.devicePixelRatio : maxPixelRatio;
            var screenWidth = hasVisualViewport ? window.visualViewport.width * screenPixelRatio : window.innerWidth * screenPixelRatio;
            screenWidth = screenPixelRatio == 1 && screenWidth > 1080 ? 1080 : screenWidth;
            var screenHeight = hasVisualViewport ? window.visualViewport.height * screenPixelRatio : window.innerHeight * screenPixelRatio;
            screenHeight = screenPixelRatio == 1 && screenHeight > 940 ? 940 : screenHeight;
            var screenProportion = screenHeight / screenWidth;
            var widthProportion = hasVisualViewport ? window.visualViewport.width / baseWidth : window.innerWidth / baseWidth;
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
                lineColor: 0x003399,
                gridPaddingX: 0 * _this.scaleFactor,
                gridPaddingY: 200 * _this.scaleFactor,
                tileScale: 240 / 180,
                arraySize: 3,
                initialArray: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
            this.addWhiteBackground();
            this.addFrameBackground();
            this.addScore();
            this.tiles = {
                array: this.game.tileSettings.initialArray,
                sprites: this.game.add.group()
            };
            this.xSpeed = 0;
            this.ySpeed = 0;
            this.speed = 800;
            this.animating = false;
            this.arraySize = this.game.tileSettings.arraySize;
            this.addNewTile();
            this.addNewTile();
            this.addDebuggingMatrix();
            this.cursors = this.game.input.keyboard.createCursorKeys();
        };
        MainMenu.prototype.update = function () {
            this.updateDebuggingMatrix();
            if (!this.animating) {
                if (this.cursors.left.justDown) {
                    this.handleInput(Phaser.Keyboard.LEFT, -this.speed, 0);
                }
                else if (this.cursors.right.justDown) {
                    this.handleInput(Phaser.Keyboard.RIGHT, this.speed, 0);
                }
                else if (this.cursors.up.justDown) {
                    this.handleInput(Phaser.Keyboard.UP, 0, -this.speed);
                }
                else if (this.cursors.down.justDown) {
                    this.handleInput(Phaser.Keyboard.DOWN, 0, this.speed);
                }
            }
            else {
            }
        };
        MainMenu.prototype.handleInput = function (keyboardInput, xSpeed, ySpeed) {
            this.animating = true;
            this.xSpeed = xSpeed;
            this.ySpeed = ySpeed;
            this.updateArray(keyboardInput);
            this.animating = false;
        };
        MainMenu.prototype.updateArray = function (keyboardInput) {
            this.isDirty = false;
            var minX = keyboardInput === Phaser.KeyCode.LEFT ? 1 : 0;
            var minY = keyboardInput === Phaser.KeyCode.UP ? 1 : 0;
            var maxX = keyboardInput === Phaser.KeyCode.RIGHT ? this.arraySize - 1 : this.arraySize;
            var maxY = keyboardInput === Phaser.KeyCode.DOWN ? this.arraySize - 1 : this.arraySize;
            var startY = keyboardInput === Phaser.KeyCode.DOWN ? maxY : minY;
            var stopY = keyboardInput === Phaser.KeyCode.DOWN ? minY : maxY;
            var yIncrement = keyboardInput === Phaser.KeyCode.DOWN ? -1 : 1;
            var startX = keyboardInput === Phaser.KeyCode.RIGHT ? maxX : minX;
            var stopX = keyboardInput === Phaser.KeyCode.RIGHT ? minX : maxX;
            var xIncrement = keyboardInput === Phaser.KeyCode.RIGHT ? -1 : 1;
            startY -= yIncrement;
            do {
                startY += yIncrement;
                startX = keyboardInput === Phaser.KeyCode.RIGHT ? maxX : minX;
                startX -= xIncrement;
                do {
                    startX += xIncrement;
                    var tile = this.getArray(startX, startY);
                    debugger;
                    if (tile) {
                        this.pushTile(startX, startY, keyboardInput);
                    }
                } while (startX !== stopX);
            } while (startY !== stopY);
            if (this.isDirty && !this.isArrayFull()) {
                this.addNewTile();
            }
        };
        MainMenu.prototype.pushTile = function (x, y, keyboardInput) {
            var tile = this.getArray(x, y);
            var pushX = keyboardInput === Phaser.KeyCode.RIGHT ? 1 : keyboardInput === Phaser.KeyCode.LEFT ? -1 : 0;
            var pushY = keyboardInput === Phaser.KeyCode.DOWN ? 1 : keyboardInput === Phaser.KeyCode.UP ? -1 : 0;
            var actualX = x;
            var actualY = y;
            var newX = actualX + pushX;
            var newY = actualY + pushY;
            while (newX >= 0 && newX <= this.arraySize && newY >= 0 && newY <= this.arraySize) {
                var nextTile = this.getArray(newX, newY);
                if (nextTile === 0) {
                    this.setArray(newX, newY, tile);
                    this.setArray(actualX, actualY, 0);
                    actualX = newX;
                    actualY = newY;
                    this.isDirty = true;
                }
                else if (nextTile === tile) {
                    tile *= 2;
                    this.setArray(newX, newY, tile);
                    this.setArray(actualX, actualY, 0);
                    this.isDirty = true;
                }
                newX += pushX;
                newY += pushY;
            }
        };
        MainMenu.prototype.addPuzzleTile = function (posX, posY, id, number) {
            var scale = this.game.tileSettings.tileSize * this.game.scaleFactor;
            var textX = (posX) * scale;
            var textY = (posY) * scale;
            var group = this.game.add.group();
            this.setArray(posX, posY, number);
            var tileFrame = this.addTileFrame(posX * scale, posY * scale);
            var sprite = this.addSprite(posX * scale, posY * scale, id, this.game.tileSettings.tileScale);
            this.game.physics.enable(sprite, Phaser.Physics.ARCADE);
            var text = this.addTileNumber(textX, textY, number.toString());
            group.add(sprite);
            group.add(text);
            group.add(tileFrame);
            return group;
        };
        MainMenu.prototype.addTileFrame = function (posX, posY) {
            var graphics = this.game.add.graphics(0, 0);
            var lineWidth = this.game.tileSettings.frameLineWidth;
            var frameSize = this.game.tileSettings.tileSize - (lineWidth / 2);
            var color = this.game.tileSettings.lineColor;
            var xPad = this.game.safeZone.paddingX + this.game.tileSettings.gridPaddingX;
            var yPad = this.game.safeZone.paddingY + this.game.tileSettings.gridPaddingY;
            graphics.lineStyle(lineWidth, color, 1);
            var rect = graphics.drawRect(posX + xPad, posY + yPad, frameSize * this.game.scaleFactor, frameSize * this.game.scaleFactor);
            this.game.physics.enable(rect, Phaser.Physics.ARCADE);
            return rect;
        };
        MainMenu.prototype.addSprite = function (posX, posY, id, spriteScale) {
            if (spriteScale === void 0) { spriteScale = 1; }
            var game = this.game;
            var xPad = game.safeZone.paddingX + this.game.tileSettings.gridPaddingX;
            var yPad = game.safeZone.paddingY + this.game.tileSettings.gridPaddingY;
            var sprite = this.add.sprite(posX + xPad, posY + yPad, id);
            sprite.scale.setTo(game.scaleFactor * spriteScale, game.scaleFactor * spriteScale);
            return sprite;
        };
        MainMenu.prototype.addWhiteBackground = function () {
            var game = this.game;
            var xPad = game.safeZone.paddingX;
            var yPad = game.safeZone.paddingY;
            var graphics = this.game.add.graphics(0, 0);
            graphics.lineStyle(0);
            graphics.beginFill(0xCCFFCC, 1);
            graphics.drawRect(xPad, yPad, game.safeZone.safeWidth, game.safeZone.safeHeight);
            graphics.endFill();
        };
        MainMenu.prototype.addFrameBackground = function () {
            var game = this.game;
            var xPad = game.safeZone.paddingX + game.tileSettings.gridPaddingX;
            var yPad = game.safeZone.paddingY + game.tileSettings.gridPaddingY;
            var graphics = game.add.graphics(0, 0);
            var wallLength = game.tileSettings.tileSize * 4 * game.scaleFactor;
            graphics.lineStyle(0);
            graphics.beginFill(0x66CCFF, 1);
            graphics.drawRect(xPad, yPad, wallLength, wallLength);
            graphics.endFill();
            var wall1 = this.add.sprite(xPad - 1, yPad - 1);
            this.game.physics.enable(wall1, Phaser.Physics.ARCADE);
            wall1.body.setSize(1, wallLength);
            wall1.body.immovable = true;
            var wall2 = this.add.sprite(xPad - 1, yPad - 1);
            this.game.physics.enable(wall2, Phaser.Physics.ARCADE);
            wall2.body.setSize(wallLength, 1);
            wall2.body.immovable = true;
            var wall3 = this.add.sprite(xPad - 1, yPad + wallLength + 1);
            this.game.physics.enable(wall3, Phaser.Physics.ARCADE);
            wall3.body.setSize(wallLength, 1);
            wall3.body.immovable = true;
            var wall4 = this.add.sprite(xPad + wallLength + 1, yPad - 1);
            this.game.physics.enable(wall4, Phaser.Physics.ARCADE);
            wall4.body.setSize(1, wallLength);
            wall4.body.immovable = true;
            this.wallsGroup = this.game.add.group();
            this.wallsGroup.add(wall1);
            this.wallsGroup.add(wall2);
            this.wallsGroup.add(wall3);
            this.wallsGroup.add(wall4);
        };
        MainMenu.prototype.addScore = function () {
            var posX = this.game.safeZone.paddingX + 20 * this.game.scaleFactor;
            var posY = this.game.safeZone.paddingY + 80 * this.game.scaleFactor;
            this.addStrokedText(posX, posY, "Score: 2048   Movements: 100", 50);
        };
        MainMenu.prototype.addTileNumber = function (posX, posY, text) {
            var xPad = this.game.safeZone.paddingX + this.game.tileSettings.gridPaddingX;
            var yPad = this.game.safeZone.paddingY + this.game.tileSettings.gridPaddingY;
            return this.addStrokedText(posX + xPad, posY + yPad, text, 40);
        };
        MainMenu.prototype.addStrokedText = function (posX, posY, text, textSize) {
            var textObj = this.game.add.text(posX, posY, text);
            textObj.font = 'Arial Black';
            textObj.fontSize = textSize * this.game.scaleFactor;
            textObj.stroke = '#000000';
            textObj.strokeThickness = (textSize / 4) * this.game.scaleFactor;
            textObj.addColor('#ffffff', 0);
            this.game.physics.enable(textObj, Phaser.Physics.ARCADE);
            return textObj;
        };
        MainMenu.prototype.addPowerButton = function () {
            var posX = this.game.safeZone.paddingX + 250 * this.game.scaleFactor;
            var posY = this.game.safeZone.paddingY + 1200 * this.game.scaleFactor;
            var button = this.game.add.button(posX, posY, 'button', null, this, 1, 0, 2);
            button.scale.setTo(this.game.scaleFactor, this.game.scaleFactor);
        };
        MainMenu.prototype.addDebuggingMatrix = function () {
            var posX = this.game.safeZone.paddingX + 350 * this.game.scaleFactor;
            var posY = this.game.safeZone.paddingY + 1200 * this.game.scaleFactor;
            this.debugArray = [];
            this.debugArray.push(this.addStrokedText(posX, posY, '', 30));
            this.debugArray.push(this.addStrokedText(posX, posY + 50 * this.game.scaleFactor, '', 30));
            this.debugArray.push(this.addStrokedText(posX, posY + 100 * this.game.scaleFactor, '', 30));
            this.debugArray.push(this.addStrokedText(posX, posY + 150 * this.game.scaleFactor, '', 30));
        };
        MainMenu.prototype.updateDebuggingMatrix = function () {
            this.debugArray.forEach(function (text, index) {
                text.setText(this.getArray(0, index) + "        " + this.getArray(1, index) + "        " + this.getArray(2, index) + "        " + this.getArray(3, index));
            }.bind(this));
        };
        MainMenu.prototype.getArray = function (x, y) {
            return this.tiles.array[y * (this.arraySize + 1) + x];
        };
        MainMenu.prototype.setArray = function (x, y, value) {
            this.tiles.array[y * (this.arraySize + 1) + x] = value;
        };
        MainMenu.prototype.isArrayFull = function () {
            for (var _i = 0, _a = this.tiles.array; _i < _a.length; _i++) {
                var tile = _a[_i];
                if (tile === 0) {
                    return false;
                }
            }
            return true;
        };
        MainMenu.prototype.addNewTile = function () {
            do {
                var ranX = this.game.rnd.integerInRange(0, 3);
                var ranY = this.game.rnd.integerInRange(0, 3);
            } while (this.getArray(ranX, ranY));
            var chance = this.game.rnd.integerInRange(0, 99);
            this.setArray(ranX, ranY, chance === 99 ? 8 : chance > 96 ? 4 : chance > 89 ? 2 : 1);
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
            this.load.image('rox', 'img/rox.png');
            this.load.image('choco', 'img/choco.png');
            this.load.image('mira', 'img/mira.png');
            this.load.image('lord_fancy', 'img/lordfancy.png');
            this.load.image('nacho', 'img/nacho.png');
            this.load.image('chili', 'img/chili.png');
            this.load.image('magil', 'img/magil.png');
            this.load.image('jessy', 'img/jessy.png');
            this.load.image('shy_senpai', 'img/shysenpai.png');
            this.load.image('kinjo', 'img/kinjo.png');
            this.load.image('lily', 'img/lily.png');
            this.load.image('agent_smith', 'img/agentsmith.png');
            this.load.image('astaroth', 'img/astaroth.png');
            this.load.image('r1r1', 'img/r1r1.png');
            this.game.tilesData = {
                mainTile: 'nacho',
                minimumValue: 1,
                tilesOrder: ['nacho', 'chili', 'mira', 'lord_fancy', 'choco', 'rox', 'kinjo', 'shy_senpai', 'magil', 'jessy', 'agent_smith', 'lily', 'r1r1', 'astaroth']
            };
            this.game.load.spritesheet('button', 'img/button-mayo.png', 480, 180);
        };
        Preloader.prototype.create = function () {
            this.game.state.start('MainMenu');
        };
        return Preloader;
    }(Phaser.State));
    MyGame.Preloader = Preloader;
})(MyGame || (MyGame = {}));
//# sourceMappingURL=app.js.map