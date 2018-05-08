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
    var Config = (function () {
        function Config() {
        }
        return Config;
    }());
    MyGame.Config = Config;
    var SafeZone = (function () {
        function SafeZone(safeWidth, safeHeight, paddingX, paddingY) {
            this.safeWidth = safeWidth;
            this.safeHeight = safeHeight;
            this.paddingX = paddingX;
            this.paddingY = paddingY;
        }
        return SafeZone;
    }());
    MyGame.SafeZone = SafeZone;
    var TileSettings = (function () {
        function TileSettings() {
        }
        return TileSettings;
    }());
    MyGame.TileSettings = TileSettings;
    var TileData = (function () {
        function TileData() {
        }
        return TileData;
    }());
    MyGame.TileData = TileData;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Singleton = (function () {
        function Singleton() {
        }
        Singleton.getInstance = function () {
            if (!Singleton.instance) {
                Singleton.instance = new Singleton();
                Singleton.instance._config = new MyGame.Config();
            }
            return Singleton.instance;
        };
        Object.defineProperty(Singleton.prototype, "config", {
            get: function () {
                return this._config;
            },
            set: function (config) {
                this._config = config;
            },
            enumerable: true,
            configurable: true
        });
        return Singleton;
    }());
    MyGame.Singleton = Singleton;
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = this;
            var scaleFactor;
            var safeZone;
            var tileSettings;
            var tilesData;
            var config = Singleton.getInstance().config;
            var hasVisualViewport = window.visualViewport;
            var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
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
            screenWidth = !isMobile && screenWidth > 1080 ? 1080 : screenWidth;
            var screenHeight = hasVisualViewport ? window.visualViewport.height * screenPixelRatio : window.innerHeight * screenPixelRatio;
            screenHeight = !isMobile ? (screenHeight / screenPixelRatio) - 20 : screenHeight > 940 ? 940 : screenHeight;
            var screenProportion = screenHeight / screenWidth;
            var widthProportion = hasVisualViewport ? window.visualViewport.width / baseWidth : window.innerWidth / baseWidth;
            _this = _super.call(this, screenWidth, screenHeight, Phaser.CANVAS, 'content', null, true) || this;
            if (screenProportion > baseProportion) {
                safeWidth = screenWidth;
                safeHeight = safeWidth * baseProportion;
                paddingY = (screenHeight - safeHeight) / 2;
                scaleFactor = (screenPixelRatio / 3) * widthProportion;
            }
            else if (screenProportion < baseProportion) {
                safeHeight = screenHeight;
                safeWidth = safeHeight / baseProportion;
                paddingX = (screenWidth - safeWidth) / 2;
                scaleFactor = safeWidth / (baseWidth * maxPixelRatio);
            }
            safeZone = new MyGame.SafeZone(safeWidth, safeHeight, paddingX, paddingY);
            tileSettings = new MyGame.TileSettings();
            tileSettings.tileSize = 240;
            tileSettings.frameLineWidth = 4;
            tileSettings.lineColor = 0x003399;
            tileSettings.gridPaddingX = 0 * scaleFactor;
            tileSettings.gridPaddingY = 200 * scaleFactor;
            tileSettings.tileScale = 240 / 180;
            tileSettings.arraySize = 3;
            tileSettings.initialArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            config.scaleFactor = scaleFactor;
            config.safeZone = safeZone;
            config.tileSettings = tileSettings;
            Singleton.getInstance().config = config;
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
    var Gameboard = (function () {
        function Gameboard(game, config) {
            this.game = game;
            this.config = config;
            this.movements = 0;
            this.xSpeed = 0;
            this.ySpeed = 0;
            this.speed = 2000 * this.config.scaleFactor;
            this.animating = false;
            this.arraySize = this.config.tileSettings.arraySize;
            this.wallsGroup = this.game.add.group();
            this.addBackground();
            this.addFrameBackground();
            this.tilesArray = this.config.tileSettings.initialArray;
            this.tilesSprites = this.game.add.group();
            this.framesGroup = this.game.add.group();
            this.addFrames();
            this.addNewTile();
            this.addNewTile();
            this.points = this.calculatePoints();
            this.addHeader();
            this.addDebuggingMatrix();
            this.cursors = this.game.input.keyboard.createCursorKeys();
        }
        Gameboard.prototype.update = function () {
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
                this.game.physics.arcade.overlap(this.tilesSprites, this.tilesSprites, null, function (a, b) {
                    a.body.stop();
                    b.body.stop();
                    return true;
                });
                this.game.physics.arcade.collide(this.tilesSprites, this.wallsGroup);
                var allStopped_1 = true;
                this.tilesSprites.forEach(function (sprite) {
                    if (sprite.body.velocity.x !== 0 || sprite.body.velocity.y !== 0) {
                        allStopped_1 = false;
                    }
                }.bind(this));
                if (allStopped_1) {
                    debugger;
                    this.animating = false;
                    if (this.isDirty && !this.isArrayFull()) {
                        this.addNewTile();
                        this.movements++;
                        this.points = this.calculatePoints();
                        this.updateDebuggingMatrix();
                        this.updateHeader();
                    }
                }
            }
        };
        Gameboard.prototype.handleInput = function (keyboardInput, xSpeed, ySpeed) {
            this.animating = true;
            this.xSpeed = xSpeed;
            this.ySpeed = ySpeed;
            this.updateArray(keyboardInput);
            this.tilesSprites.forEach(function (sprite) {
                sprite.body.velocity.x = this.xSpeed;
                sprite.body.velocity.y = this.ySpeed;
            }.bind(this));
        };
        Gameboard.prototype.updateArray = function (keyboardInput) {
            this.isDirty = false;
            var minX = keyboardInput === Phaser.KeyCode.LEFT ? 1 : 0;
            var minY = keyboardInput === Phaser.KeyCode.UP ? 1 : 0;
            var maxX = keyboardInput === Phaser.KeyCode.RIGHT
                ? this.arraySize - 1
                : this.arraySize;
            var maxY = keyboardInput === Phaser.KeyCode.DOWN
                ? this.arraySize - 1
                : this.arraySize;
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
                    if (tile) {
                        this.pushTile(startX, startY, keyboardInput);
                    }
                } while (startX !== stopX);
            } while (startY !== stopY);
        };
        Gameboard.prototype.pushTile = function (x, y, keyboardInput) {
            var tile = this.getArray(x, y);
            var pushX = keyboardInput === Phaser.KeyCode.RIGHT
                ? 1
                : keyboardInput === Phaser.KeyCode.LEFT ? -1 : 0;
            var pushY = keyboardInput === Phaser.KeyCode.DOWN
                ? 1
                : keyboardInput === Phaser.KeyCode.UP ? -1 : 0;
            var actualX = x;
            var actualY = y;
            var newX = actualX + pushX;
            var newY = actualY + pushY;
            while (newX >= 0 &&
                newX <= this.arraySize &&
                newY >= 0 &&
                newY <= this.arraySize) {
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
                    break;
                }
                else {
                    break;
                }
                newX += pushX;
                newY += pushY;
            }
        };
        Gameboard.prototype.addPuzzleTile = function (posX, posY, number) {
            var scale = this.config.tileSettings.tileSize * this.config.scaleFactor;
            var textX = posX * scale;
            var textY = posY * scale;
            var id = this.getTileSprite(number);
            var sprite = this.addSprite(posX * scale, posY * scale, id, this.config.tileSettings.tileScale);
            this.game.physics.enable(sprite, Phaser.Physics.ARCADE);
            sprite.body.collideWorldBounds = true;
            return sprite;
        };
        Gameboard.prototype.addFrames = function () {
            for (var x = 0; x <= this.arraySize; x++) {
                for (var y = 0; y <= this.arraySize; y++) {
                    this.framesGroup.add(this.addTileFrame(x, y));
                }
            }
        };
        Gameboard.prototype.addTileFrame = function (posX, posY) {
            var graphics = this.game.add.graphics(0, 0);
            var lineWidth = this.config.tileSettings.frameLineWidth;
            var frameSize = this.config.tileSettings.tileSize - lineWidth / 2;
            var color = this.config.tileSettings.lineColor;
            var xPad = this.config.safeZone.paddingX + this.config.tileSettings.gridPaddingX;
            var yPad = this.config.safeZone.paddingY + this.config.tileSettings.gridPaddingY;
            var x = posX * this.config.tileSettings.tileSize * this.config.scaleFactor + xPad;
            var y = posY * this.config.tileSettings.tileSize * this.config.scaleFactor + yPad;
            graphics.lineStyle(lineWidth, color, 1);
            var rect = graphics.drawRect(x, y, frameSize * this.config.scaleFactor, frameSize * this.config.scaleFactor);
            this.game.physics.enable(rect, Phaser.Physics.ARCADE);
            return rect;
        };
        Gameboard.prototype.addSprite = function (posX, posY, id, spriteScale) {
            if (spriteScale === void 0) { spriteScale = 1; }
            var config = this.config;
            var xPad = config.safeZone.paddingX + this.config.tileSettings.gridPaddingX;
            var yPad = config.safeZone.paddingY + this.config.tileSettings.gridPaddingY;
            var sprite = this.game.add.sprite(posX + xPad, posY + yPad, id);
            sprite.scale.setTo(config.scaleFactor * spriteScale, config.scaleFactor * spriteScale);
            return sprite;
        };
        Gameboard.prototype.addBackground = function () {
            var game = this.game;
            var config = this.config;
            var xPad = config.safeZone.paddingX;
            var yPad = config.safeZone.paddingY;
            var graphics = this.game.add.graphics(0, 0);
            graphics.lineStyle(0);
            graphics.beginFill(0xe7e5df, 1);
            graphics.drawRect(xPad, yPad, config.safeZone.safeWidth, config.safeZone.safeHeight);
            graphics.endFill();
        };
        Gameboard.prototype.addFrameBackground = function () {
            var game = this.game;
            var config = this.config;
            var xPad = config.safeZone.paddingX + config.tileSettings.gridPaddingX;
            var yPad = config.safeZone.paddingY + config.tileSettings.gridPaddingY;
            var graphics = game.add.graphics(0, 0);
            var wallLength = config.tileSettings.tileSize * 4 * config.scaleFactor;
            graphics.lineStyle(0);
            graphics.beginFill(0x66ccff, 1);
            graphics.drawRect(xPad, yPad, wallLength, wallLength);
            graphics.endFill();
            var wall1 = this.game.add.sprite(xPad - 1, yPad - 1);
            this.game.physics.enable(wall1, Phaser.Physics.ARCADE);
            wall1.body.setSize(1, wallLength);
            wall1.body.immovable = true;
            var wall2 = this.game.add.sprite(xPad - 1, yPad - 1);
            this.game.physics.enable(wall2, Phaser.Physics.ARCADE);
            wall2.body.setSize(wallLength, 1);
            wall2.body.immovable = true;
            var wall3 = this.game.add.sprite(xPad - 1, yPad + wallLength + 1);
            this.game.physics.enable(wall3, Phaser.Physics.ARCADE);
            wall3.body.setSize(wallLength, 1);
            wall3.body.immovable = true;
            var wall4 = this.game.add.sprite(xPad + wallLength + 1, yPad - 1);
            this.game.physics.enable(wall4, Phaser.Physics.ARCADE);
            wall4.body.setSize(1, wallLength);
            wall4.body.immovable = true;
            this.wallsGroup.add(wall1);
            this.wallsGroup.add(wall2);
            this.wallsGroup.add(wall3);
            this.wallsGroup.add(wall4);
        };
        Gameboard.prototype.addHeader = function () {
            var posX = this.config.safeZone.paddingX + 20 * this.config.scaleFactor;
            var posY = this.config.safeZone.paddingY + 80 * this.config.scaleFactor;
            this.header = this.addStrokedText(posX, posY, '', 50);
            this.updateHeader();
        };
        Gameboard.prototype.addTileNumber = function (posX, posY, text) {
            var xPad = this.config.safeZone.paddingX + this.config.tileSettings.gridPaddingX;
            var yPad = this.config.safeZone.paddingY + this.config.tileSettings.gridPaddingY;
            return this.addStrokedText(posX + xPad, posY + yPad, text, 40);
        };
        Gameboard.prototype.addStrokedText = function (posX, posY, text, textSize, center) {
            if (center === void 0) { center = false; }
            var textObj = this.game.add.text(posX, posY, text);
            textObj.font = 'Arial Black';
            textObj.fontSize = textSize * this.config.scaleFactor;
            textObj.stroke = '#000000';
            textObj.strokeThickness = textSize / 4 * this.config.scaleFactor;
            textObj.addColor('#ffffff', 0);
            if (center) {
                textObj.anchor.set(0.5);
            }
            this.game.physics.enable(textObj, Phaser.Physics.ARCADE);
            return textObj;
        };
        Gameboard.prototype.addPowerButton = function () {
            var posX = this.config.safeZone.paddingX + 250 * this.config.scaleFactor;
            var posY = this.config.safeZone.paddingY + 1200 * this.config.scaleFactor;
            var button = this.game.add.button(posX, posY, 'button', null, this, 1, 0, 2);
            button.scale.setTo(this.config.scaleFactor, this.config.scaleFactor);
        };
        Gameboard.prototype.addDebuggingMatrix = function () {
            var posX = this.config.safeZone.paddingX + 250 * this.config.scaleFactor;
            var posY = this.config.safeZone.paddingY + 1300 * this.config.scaleFactor;
            this.debugArray = [];
            this.debugArray.push(this.addStrokedText(posX, posY, '', 30, true));
            this.debugArray.push(this.addStrokedText(posX + 150 * this.config.scaleFactor, posY, '', 30, true));
            this.debugArray.push(this.addStrokedText(posX + 300 * this.config.scaleFactor, posY, '', 30, true));
            this.debugArray.push(this.addStrokedText(posX + 450 * this.config.scaleFactor, posY, '', 30, true));
            this.updateDebuggingMatrix();
        };
        Gameboard.prototype.updateDebuggingMatrix = function () {
            this.debugArray.forEach(function (text, index) {
                text.setText(this.getArray(index, 0) + "\n" + this.getArray(index, 1) + "\n" + this.getArray(index, 2) + "\n" + this.getArray(index, 3));
            }.bind(this));
        };
        Gameboard.prototype.updateHeader = function () {
            this.header.setText("Score: " + this.points + "     Movements: " + this.movements);
        };
        Gameboard.prototype.getArray = function (x, y) {
            return this.tilesArray[y * (this.arraySize + 1) + x];
        };
        Gameboard.prototype.setArray = function (x, y, value) {
            this.tilesArray[y * (this.arraySize + 1) + x] = value;
        };
        Gameboard.prototype.isArrayFull = function () {
            for (var _i = 0, _a = this.tilesArray; _i < _a.length; _i++) {
                var tile = _a[_i];
                if (tile === 0) {
                    return false;
                }
            }
            return true;
        };
        Gameboard.prototype.arrayEmptyTiles = function () {
            var empty = 0;
            for (var _i = 0, _a = this.tilesArray; _i < _a.length; _i++) {
                var tile = _a[_i];
                if (tile === 0) {
                    empty++;
                }
            }
            return empty;
        };
        Gameboard.prototype.calculatePoints = function () {
            var points = 0;
            for (var _i = 0, _a = this.tilesArray; _i < _a.length; _i++) {
                var tile = _a[_i];
                points += tile;
            }
            return points;
        };
        Gameboard.prototype.addNewTile = function () {
            do {
                var ranX = this.game.rnd.integerInRange(0, 3);
                var ranY = this.game.rnd.integerInRange(0, 3);
            } while (this.getArray(ranX, ranY));
            if (this.arrayEmptyTiles() > 6) {
                var chance = this.game.rnd.integerInRange(0, 99);
                this.setArray(ranX, ranY, chance === 98 ? 4 : chance >= 90 ? 2 : 1);
            }
            else {
                this.setArray(ranX, ranY, 1);
            }
            var tile = this.getArray(ranX, ranY);
            var sprite = this.addPuzzleTile(ranX, ranY, tile);
            this.tilesSprites.add(sprite);
            this.game.world.bringToTop(this.framesGroup);
        };
        Gameboard.prototype.getTileSprite = function (tile) {
            var list = this.config.tilesData.tilesOrder;
            while (list[0] !== this.config.tilesData.mainTile) {
                var last = list.pop();
                list.unshift(last);
            }
            var index = Math.sqrt(tile) - 1;
            if (index >= 0) {
                return this.config.tilesData.tilesOrder[index];
            }
            return null;
        };
        return Gameboard;
    }());
    MyGame.Gameboard = Gameboard;
})(MyGame || (MyGame = {}));
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
            this.game.time.desiredFps = 60;
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
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainMenu.prototype.create = function () {
            this.config = MyGame.Singleton.getInstance().config;
            this.gameboard = new MyGame.Gameboard(this.game, this.config);
        };
        MainMenu.prototype.update = function () {
            this.gameboard.update();
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
            var config = MyGame.Singleton.getInstance().config;
            var tileData = new MyGame.TileData();
            this.preloadBar = this.add.sprite(0, 0, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);
            this.game.load.spritesheet('button', 'img/button-mayo.png', 480, 180);
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
            this.load.image('joji', 'img/joji.png');
            this.load.image('bren', 'img/bren.png');
            tileData.minimumValue = 1;
            tileData.tilesOrder = ['nacho', 'chili', 'mira', 'lord_fancy', 'choco', 'rox', 'kinjo', 'shy_senpai', 'magil', 'jessy', 'agent_smith', 'lily', 'r1r1', 'astaroth', 'bren', 'joji'];
            tileData.mainTile = tileData.tilesOrder[this.game.rnd.integerInRange(0, 15)];
            config.tilesData = tileData;
            MyGame.Singleton.getInstance().config = config;
        };
        Preloader.prototype.create = function () {
            this.game.state.start('MainMenu');
        };
        return Preloader;
    }(Phaser.State));
    MyGame.Preloader = Preloader;
})(MyGame || (MyGame = {}));
//# sourceMappingURL=app.js.map