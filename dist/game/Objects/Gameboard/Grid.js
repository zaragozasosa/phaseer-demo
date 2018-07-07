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
var Base_1 = require("./../../Base");
var GameboardConfig_1 = require("./../../Config/GameboardConfig");
var Grid = (function (_super) {
    __extends(Grid, _super);
    function Grid(gameboardConfig, gridLogic) {
        var _this = _super.call(this) || this;
        _this.gameboardConfig = gameboardConfig;
        _this.animating = false;
        _this.wallsGroup = _this.makeWalls();
        _this.gridLogic = gridLogic;
        return _this;
    }
    Grid.prototype.update = function (cursor) {
        if (!this.animating) {
            if (cursor) {
                this.animating = this.gridLogic.scanGrid(cursor);
                this.buttonDisableMightChange();
            }
            cursor = null;
        }
        else {
            this.manageCollisions();
        }
    };
    Grid.prototype.calculatePoints = function () {
        return this.gridLogic.sumTiles();
    };
    Grid.prototype.activatePower = function () {
        this.gridLogic.power();
        this.gameboardConfig.updateScoreSignal.dispatch(false);
    };
    Grid.prototype.canUsePower = function () {
        return this.gridLogic.canUsePower();
    };
    Grid.prototype.buttonDisableMightChange = function () {
        if (!this.animating && this.canUsePower()) {
            this.gameboardConfig.toggleButtonSignal.dispatch(GameboardConfig_1.default.BUTTON_ACTIVE);
        }
        else if (this.animating && this.canUsePower()) {
            this.gameboardConfig.toggleButtonSignal.dispatch(GameboardConfig_1.default.BUTTON_SLEEP);
        }
        else {
            this.gameboardConfig.toggleButtonSignal.dispatch(GameboardConfig_1.default.BUTTON_SLEEP_DISABLED);
        }
    };
    Grid.prototype.manageCollisions = function () {
        if (this.gridLogic.manageCollisions(this.wallsGroup)) {
            this.animating = false;
            this.buttonDisableMightChange();
            this.gameboardConfig.updateScoreSignal.dispatch();
        }
    };
    Grid.prototype.makeWalls = function () {
        var wallLength = this.config.grid.tileSize * 4;
        var group = this.tools.misc.addGroup();
        group.add(this.tools.graphic.makeWall(0, 0, 1, wallLength));
        group.add(this.tools.graphic.makeWall(0, 0, wallLength, 1));
        group.add(this.tools.graphic.makeWall(0, wallLength, wallLength, 1));
        group.add(this.tools.graphic.makeWall(wallLength, 0, 1, wallLength));
        return group;
    };
    Grid.prototype.getPowerConfiguration = function () { };
    return Grid;
}(Base_1.default));
exports.default = Grid;
