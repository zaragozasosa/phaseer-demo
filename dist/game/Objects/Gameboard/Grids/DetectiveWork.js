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
var Grid_1 = require("./../Grid");
var GridTile_1 = require("./../GridTile");
var GhostTile_1 = require("./../Tiles/GhostTile");
var DetectiveWork = (function (_super) {
    __extends(DetectiveWork, _super);
    function DetectiveWork(config) {
        var _this = _super.call(this, config) || this;
        _this.direction = null;
        _this.makeGhost = false;
        return _this;
    }
    DetectiveWork.prototype.activatePower = function () {
        return this.createGhostTile();
    };
    DetectiveWork.prototype.getPowerConfiguration = function () {
        var group = this.tools.misc.addGroup();
        group.inputEnableChildren = true;
        group.add(this.tools.text.make(50, 1195, 'UP', 45));
        group.add(this.tools.text.make(200, 1195, 'DOWN', 45));
        group.add(this.tools.text.make(475, 1195, 'LEFT', 45));
        group.add(this.tools.text.make(700, 1195, 'RIGHT', 45));
        var btn = this.tools.text.makeXBounded(1240, 'SEARCH', 60, 'center');
        btn.tint = Phaser.Color.GRAY;
        group.add(btn);
        btn.inputEnabled = false;
        group.onChildInputDown.add(function (child) {
            group.setAllChildren('tint', Phaser.Color.WHITE);
            child.tint = Phaser.Color.RED;
            if (child.text === 'UP') {
                this.changeFlow(Phaser.Keyboard.UP);
            }
            else if (child.text === 'DOWN') {
                this.changeFlow(Phaser.Keyboard.DOWN);
            }
            else if (child.text === 'LEFT') {
                this.changeFlow(Phaser.Keyboard.LEFT);
            }
            else if (child.text === 'RIGHT') {
                this.changeFlow(Phaser.Keyboard.RIGHT);
            }
            else {
                this.investigate();
            }
        }.bind(this));
        this.elements = group;
        return group;
    };
    DetectiveWork.prototype.add = function () {
        if (this.grid.isFull()) {
            return;
        }
        var pos = this.getTileNewPosition();
        if (this.makeGhost) {
            var tile_1 = new GhostTile_1.default(pos.x, pos.y, this.gameboardConfig, null, this.ghostTileValue, this.turnsToDisappear);
            this.grid.set(pos.x, pos.y, tile_1);
            this.tilesGroup.add(tile_1.getGroup);
            this.direction = null;
            this.makeGhost = false;
            this.gameboardConfig.turnsSignal.add(function () {
                if (tile_1.checkGhostTurns()) {
                    this.cleanGrid();
                }
            }.bind(this));
        }
        else {
            var tile = new GridTile_1.default(pos.x, pos.y, this.gameboardConfig);
            this.grid.set(pos.x, pos.y, tile);
            this.tilesGroup.add(tile.getGroup);
        }
    };
    DetectiveWork.prototype.getTileNewPosition = function () {
        debugger;
        var maxPosition = this.gameboardConfig.arraySize;
        if (!this.direction) {
            return _super.prototype.getTileNewPosition.call(this);
        }
        else {
            if (this.direction === Phaser.Keyboard.UP) {
                return this.makeNewTileAround(null, 0, 1);
            }
            else if (this.direction === Phaser.Keyboard.DOWN) {
                return this.makeNewTileAround(null, maxPosition, -1);
            }
            if (this.direction === Phaser.Keyboard.LEFT) {
                return this.makeNewTileAround(0, null, 1);
            }
            if (this.direction === Phaser.Keyboard.RIGHT) {
                return this.makeNewTileAround(maxPosition, null, -1);
            }
        }
    };
    DetectiveWork.prototype.changeFlow = function (direction) {
        this.gameboardConfig.cooldownSignal.dispatch(false, 5);
        this.direction = direction;
    };
    DetectiveWork.prototype.investigate = function () {
        var turnsToActivate = this.tools.misc.randomBetween(2, 6);
        this.gameboardConfig.cooldownSignal.dispatch(true, turnsToActivate);
    };
    DetectiveWork.prototype.createGhostTile = function () {
        this.makeGhost = true;
        this.ghostTileValue = this.grid.getOrdered()[0].value;
        if (this.ghostTileValue === this.gameboardConfig.winningTile || this.ghostTileValue === this.gameboardConfig.winningTile / 2) {
            this.turnsToDisappear = 3;
        }
        else if (this.ghostTileValue === this.gameboardConfig.winningTile / 4) {
            this.turnsToDisappear = 3;
        }
        else if (this.ghostTileValue === this.gameboardConfig.winningTile / 8) {
            this.turnsToDisappear = 4;
        }
        else {
            this.turnsToDisappear = 5;
        }
        this.add();
        return this.turnsToDisappear;
    };
    DetectiveWork.prototype.makeNewTileAround = function (posX, posY, delta) {
        var max = this.gameboardConfig.arraySize;
        var min = 0;
        if (posX === null) {
            for (var _i = 0, _a = this.randomListBetween(min, max); _i < _a.length; _i++) {
                var x = _a[_i];
                if (!this.grid.get(x, posY)) {
                    return new Phaser.Point(x, posY);
                }
            }
            if ((posY === min && delta === -1) || (posY === max && delta === 1)) {
                return;
            }
            else {
                return this.makeNewTileAround(null, posY + delta, delta);
            }
        }
        else if (posY === null) {
            for (var _b = 0, _c = this.randomListBetween(min, max); _b < _c.length; _b++) {
                var y = _c[_b];
                if (!this.grid.get(posX, y)) {
                    return new Phaser.Point(posX, y);
                }
            }
            if ((posX === min && delta === -1) || (posX === max && delta === 1)) {
                return;
            }
            else {
                return this.makeNewTileAround(posX + delta, null, delta);
            }
        }
    };
    DetectiveWork.prototype.randomListBetween = function (min, max) {
        var list = [];
        for (var i = min; i <= max; i++) {
            list.push(i);
        }
        return this.tools.misc.shuffleUniqueArray(list);
    };
    return DetectiveWork;
}(Grid_1.default));
exports.default = DetectiveWork;
