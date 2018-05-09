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
    var Singleton = (function () {
        function Singleton() {
        }
        Singleton.getInstance = function () {
            if (!Singleton.instance) {
                Singleton.instance = new Singleton();
                Singleton.instance._config = new Config();
                Singleton.instance._game = null;
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
        Object.defineProperty(Singleton.prototype, "game", {
            get: function () {
                return this._game;
            },
            set: function (config) {
                this._game = config;
            },
            enumerable: true,
            configurable: true
        });
        return Singleton;
    }());
    MyGame.Singleton = Singleton;
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
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = this;
            var scaleFactor;
            var safeZone;
            var tileSettings;
            var config = MyGame.Singleton.getInstance().config;
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
            tileSettings.minimumValue = 1;
            tileSettings.tiles = ['nacho', 'chili', 'mira', 'lord_fancy', 'choco', 'rox', 'kinjo', 'shy_senpai', 'magil', 'jessy', 'agent_smith', 'lily', 'r1r1', 'astaroth', 'bren', 'joji'];
            tileSettings.mainTile = tileSettings.tiles[_this.rnd.integerInRange(0, 15)];
            config.scaleFactor = scaleFactor;
            config.safeZone = safeZone;
            config.tileSettings = tileSettings;
            MyGame.Singleton.getInstance().config = config;
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
        function Gameboard() {
            var singleton = MyGame.Singleton.getInstance();
            this.game = singleton.game;
            this.config = singleton.config;
            this.textFactory = new MyGame.TextFactory();
            this.addBackground();
            this.grid = new MyGame.Grid(function () {
                this.updateScore();
            }.bind(this));
            this.movements = 0;
            this.points = this.grid.tilesArray.calculateSum();
            this.addHeader();
            this.addDebuggingMatrix();
        }
        Gameboard.prototype.update = function () {
            this.grid.update();
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
        Gameboard.prototype.addHeader = function () {
            this.header = this.textFactory.makeStroked(20, 80, '', 50);
            this.updateHeader();
        };
        Gameboard.prototype.addPowerButton = function () {
            var posX = this.config.safeZone.paddingX + 250 * this.config.scaleFactor;
            var posY = this.config.safeZone.paddingY + 1200 * this.config.scaleFactor;
            var button = this.game.add.button(posX, posY, 'button', null, this, 1, 0, 2);
            button.scale.setTo(this.config.scaleFactor, this.config.scaleFactor);
        };
        Gameboard.prototype.addDebuggingMatrix = function () {
            var posX = 250;
            var posY = 1300;
            this.debugArray = [];
            this.debugArray.push(this.textFactory.makeStroked(posX, posY, '', 30, true));
            this.debugArray.push(this.textFactory.makeStroked(posX + 150, posY, '', 30, true));
            this.debugArray.push(this.textFactory.makeStroked(posX + 300, posY, '', 30, true));
            this.debugArray.push(this.textFactory.makeStroked(posX + 450, posY, '', 30, true));
            this.updateDebuggingMatrix();
        };
        Gameboard.prototype.updateScore = function () {
            this.movements++;
            this.points = this.grid.tilesArray.calculateSum();
            this.updateHeader();
            this.updateDebuggingMatrix();
        };
        Gameboard.prototype.updateDebuggingMatrix = function () {
            this.debugArray.forEach(function (text, index) {
                text.setText(this.grid.tilesArray.get(index, 0) + "\n" + this.grid.tilesArray.get(index, 1) + "\n" + this.grid.tilesArray.get(index, 2) + "\n" + this.grid.tilesArray.get(index, 3));
            }.bind(this));
        };
        Gameboard.prototype.updateHeader = function () {
            this.header.setText("Score: " + this.points + "     Movements: " + this.movements);
        };
        return Gameboard;
    }());
    MyGame.Gameboard = Gameboard;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Grid = (function () {
        function Grid(gameboardCallback) {
            var singleton = MyGame.Singleton.getInstance();
            this.game = singleton.game;
            this.config = singleton.config;
            this.textFactory = new MyGame.TextFactory();
            this.gameboardCallback = gameboardCallback;
            this.tiles = new Array();
            this.xSpeed = 0;
            this.ySpeed = 0;
            this.speed = 3000 * this.config.scaleFactor;
            this.animating = false;
            this.arraySize = this.config.tileSettings.arraySize;
            this.wallsGroup = this.game.add.group();
            this.createWalls();
            this.tilesArray = new MyGame.TilesArray();
            this.tilesGroup = this.game.add.group();
            this.framesGroup = this.game.add.group();
            this.addFrames();
            this.addNewTile();
            this.addNewTile();
            this.cursors = this.game.input.keyboard.createCursorKeys();
        }
        Grid.prototype.addNewTile = function () {
            do {
                var ranX = this.game.rnd.integerInRange(0, 3);
                var ranY = this.game.rnd.integerInRange(0, 3);
            } while (this.tilesArray.get(ranX, ranY));
            if (this.tilesArray.emptyTiles() > 6) {
                var chance = this.game.rnd.integerInRange(0, 99);
                this.tilesArray.set(ranX, ranY, chance === 98 ? 4 : chance >= 90 ? 2 : 1);
            }
            else {
                this.tilesArray.set(ranX, ranY, 1);
            }
            var value = this.tilesArray.get(ranX, ranY);
            var tile = new MyGame.Tile(ranX, ranY, value, this.game, this.config);
            this.tilesGroup.add(tile.sprite);
            this.game.world.bringToTop(this.framesGroup);
        };
        Grid.prototype.update = function () {
            if (!this.animating) {
                if (this.cursors.left.justDown) {
                    this.checkLogic(Phaser.Keyboard.LEFT, -this.speed, 0);
                }
                else if (this.cursors.right.justDown) {
                    this.checkLogic(Phaser.Keyboard.RIGHT, this.speed, 0);
                }
                else if (this.cursors.up.justDown) {
                    this.checkLogic(Phaser.Keyboard.UP, 0, -this.speed);
                }
                else if (this.cursors.down.justDown) {
                    this.checkLogic(Phaser.Keyboard.DOWN, 0, this.speed);
                }
            }
            else {
                this.checkCollisions();
            }
        };
        Grid.prototype.checkCollisions = function () {
            this.game.physics.arcade.overlap(this.tilesGroup, this.tilesGroup, null, function (a, b) {
                if (a.key !== b.key) {
                    a.position = a.previousPosition;
                    b.position = b.previousPosition;
                    a.body.stop();
                    b.body.stop();
                }
                return true;
            });
            this.game.physics.arcade.collide(this.tilesGroup, this.wallsGroup);
            var allStopped = true;
            this.tilesGroup.forEach(function (sprite) {
                if (sprite.body.velocity.x !== 0 || sprite.body.velocity.y !== 0) {
                    allStopped = false;
                }
            }.bind(this));
            if (allStopped) {
                this.animating = false;
                this.updateGameboard();
            }
        };
        Grid.prototype.updateGameboard = function () {
            this.tilesGroup.removeAll(true);
            this.tiles = [];
            for (var x = 0; x <= this.config.tileSettings.arraySize; x++) {
                for (var y = 0; y <= this.config.tileSettings.arraySize; y++) {
                    var value = this.tilesArray.get(x, y);
                    if (value !== 0) {
                        var tile = new MyGame.Tile(x, y, value, this.game, this.config);
                        this.tiles.push(tile);
                        this.tilesGroup.add(tile.sprite);
                    }
                }
            }
            if (!this.tilesArray.isFull()) {
                this.addNewTile();
                this.gameboardCallback();
            }
        };
        Grid.prototype.checkLogic = function (keyboardInput, xSpeed, ySpeed) {
            this.xSpeed = xSpeed;
            this.ySpeed = ySpeed;
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
                    var tile = this.tilesArray.get(startX, startY);
                    if (tile) {
                        this.pushTile(startX, startY, keyboardInput);
                    }
                } while (startX !== stopX);
            } while (startY !== stopY);
            if (this.isDirty) {
                this.animating = true;
                this.tilesGroup.forEach(function (sprite) {
                    sprite.body.velocity.x = this.xSpeed;
                    sprite.body.velocity.y = this.ySpeed;
                }.bind(this));
            }
        };
        Grid.prototype.pushTile = function (x, y, keyboardInput) {
            var tile = this.tilesArray.get(x, y);
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
                var nextTile = this.tilesArray.get(newX, newY);
                if (nextTile === 0) {
                    this.tilesArray.set(newX, newY, tile);
                    this.tilesArray.set(actualX, actualY, 0);
                    actualX = newX;
                    actualY = newY;
                    this.isDirty = true;
                }
                else if (nextTile === tile) {
                    tile *= 2;
                    this.tilesArray.set(newX, newY, tile);
                    this.tilesArray.set(actualX, actualY, 0);
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
        Grid.prototype.addFrames = function () {
            for (var x = 0; x <= this.arraySize; x++) {
                for (var y = 0; y <= this.arraySize; y++) {
                    this.framesGroup.add(this.addTileFrame(x, y));
                }
            }
        };
        Grid.prototype.addTileFrame = function (posX, posY) {
            var graphics = this.game.add.graphics(0, 0);
            var lineWidth = this.config.tileSettings.frameLineWidth;
            var frameSize = this.config.tileSettings.tileSize - lineWidth / 2;
            var color = this.config.tileSettings.lineColor;
            var xPad = this.config.safeZone.paddingX + this.config.tileSettings.gridPaddingX;
            var yPad = this.config.safeZone.paddingY + this.config.tileSettings.gridPaddingY;
            var x = posX * this.config.tileSettings.tileSize * this.config.scaleFactor +
                xPad;
            var y = posY * this.config.tileSettings.tileSize * this.config.scaleFactor +
                yPad;
            graphics.lineStyle(lineWidth, color, 1);
            var rect = graphics.drawRect(x, y, frameSize * this.config.scaleFactor, frameSize * this.config.scaleFactor);
            this.game.physics.enable(rect, Phaser.Physics.ARCADE);
            return rect;
        };
        Grid.prototype.createWalls = function () {
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
        return Grid;
    }());
    MyGame.Grid = Grid;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Tile = (function () {
        function Tile(x, y, value, game, config) {
            this.x = x;
            this.y = y;
            this.value = value;
            this.game = game;
            this.config = config;
            this.spriteFactory = new MyGame.SpriteFactory();
            this.createSprite();
        }
        Tile.prototype.createSprite = function () {
            var id = this.getTileSprite(this.value);
            var sprite = this.spriteFactory.makeTile(this.x, this.y, id);
            this.game.physics.enable(sprite, Phaser.Physics.ARCADE);
            sprite.body.collideWorldBounds = true;
            this.sprite = sprite;
        };
        Tile.prototype.getTileSprite = function (tile) {
            var list = this.config.tileSettings.tiles;
            while (list[0] !== this.config.tileSettings.mainTile) {
                var last = list.pop();
                list.unshift(last);
            }
            var index = this.getArrayPositionFromNumber(tile);
            if (index >= 0) {
                return this.config.tileSettings.tiles[index];
            }
            return null;
        };
        Tile.prototype.getArrayPositionFromNumber = function (tile) {
            return tile === this.config.tileSettings.minimumValue
                ? 0
                : this.getArrayPositionFromNumber(tile / 2) + 1;
        };
        return Tile;
    }());
    MyGame.Tile = Tile;
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
            this.gameboard = new MyGame.Gameboard();
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
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Preloader.prototype.preload = function () {
            var singleton = MyGame.Singleton.getInstance();
            var config = singleton.config;
            singleton.game = this.game;
            this.preloadBar = this.add.sprite(0, 0, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);
            this.game.load.spritesheet('button', 'img/button-mayo.png', 480, 180);
            for (var _i = 0, _a = config.tileSettings.tiles; _i < _a.length; _i++) {
                var sprite = _a[_i];
                var path = "img/" + sprite + ".png";
                var altPath = "img/" + sprite + "_alt.png";
                this.load.image(sprite, path);
            }
        };
        Preloader.prototype.create = function () {
            this.game.state.start('MainMenu');
        };
        return Preloader;
    }(Phaser.State));
    MyGame.Preloader = Preloader;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var SpriteFactory = (function () {
        function SpriteFactory() {
            var singleton = MyGame.Singleton.getInstance();
            this.game = singleton.game;
            this.config = singleton.config;
        }
        SpriteFactory.prototype.makeTile = function (x, y, id) {
            var size = this.config.tileSettings.tileSize;
            var scale = this.config.tileSettings.tileScale;
            return this.make(x * size, y * size, id, scale);
        };
        SpriteFactory.prototype.make = function (posX, posY, id, spriteScale) {
            if (spriteScale === void 0) { spriteScale = 1; }
            var x = posX * this.config.scaleFactor;
            var y = posY * this.config.scaleFactor;
            var config = this.config;
            var xPad = config.safeZone.paddingX + this.config.tileSettings.gridPaddingX;
            var yPad = config.safeZone.paddingY + this.config.tileSettings.gridPaddingY;
            var sprite = this.game.add.sprite(x + xPad, y + yPad, id);
            sprite.scale.setTo(config.scaleFactor * spriteScale, config.scaleFactor * spriteScale);
            return sprite;
        };
        return SpriteFactory;
    }());
    MyGame.SpriteFactory = SpriteFactory;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var TextFactory = (function () {
        function TextFactory() {
            var singleton = MyGame.Singleton.getInstance();
            this.game = singleton.game;
            this.config = singleton.config;
        }
        TextFactory.prototype.makeTileNumber = function (x, y, value, size) {
            var xPos = x * this.config.tileSettings.tileSize +
                this.config.tileSettings.gridPaddingX;
            var yPos = y * this.config.tileSettings.tileSize +
                this.config.tileSettings.gridPaddingY;
            return this.makeStroked(xPos, yPos, value.toString(), size);
        };
        TextFactory.prototype.makeStroked = function (posX, posY, text, textSize, center) {
            if (center === void 0) { center = false; }
            var x = this.config.safeZone.paddingX + posX * this.config.scaleFactor;
            var y = this.config.safeZone.paddingY + posY * this.config.scaleFactor;
            var textObj = this.game.add.text(x, y, text);
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
        return TextFactory;
    }());
    MyGame.TextFactory = TextFactory;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var TilesArray = (function () {
        function TilesArray() {
            var singleton = MyGame.Singleton.getInstance();
            var config = singleton.config;
            this.tiles = config.tileSettings.initialArray;
            this.arraySize = config.tileSettings.arraySize;
        }
        TilesArray.prototype.get = function (x, y) {
            return this.tiles[y * (this.arraySize + 1) + x];
        };
        TilesArray.prototype.set = function (x, y, value) {
            this.tiles[y * (this.arraySize + 1) + x] = value;
        };
        TilesArray.prototype.isFull = function () {
            for (var _i = 0, _a = this.tiles; _i < _a.length; _i++) {
                var tile = _a[_i];
                if (tile === 0) {
                    return false;
                }
            }
            return true;
        };
        TilesArray.prototype.emptyTiles = function () {
            var empty = 0;
            for (var _i = 0, _a = this.tiles; _i < _a.length; _i++) {
                var tile = _a[_i];
                if (tile === 0) {
                    empty++;
                }
            }
            return empty;
        };
        TilesArray.prototype.calculateSum = function () {
            var points = 0;
            for (var _i = 0, _a = this.tiles; _i < _a.length; _i++) {
                var tile = _a[_i];
                points += tile;
            }
            return points;
        };
        return TilesArray;
    }());
    MyGame.TilesArray = TilesArray;
})(MyGame || (MyGame = {}));
//# sourceMappingURL=app.js.map