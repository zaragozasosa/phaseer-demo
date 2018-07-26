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
var Factory_1 = require("./Base/Factory");
var MiscFactory = (function (_super) {
    __extends(MiscFactory, _super);
    function MiscFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MiscFactory.prototype.addGroup = function (name) {
        if (name === void 0) { name = undefined; }
        return this.game.add.group(undefined, undefined);
    };
    MiscFactory.prototype.randomBetween = function (min, max) {
        return this.game.rnd.integerInRange(min, max);
    };
    MiscFactory.prototype.overlap = function (object1, object2, overlapCallback) {
        return this.game.physics.arcade.overlap(object1, object2, overlapCallback);
    };
    MiscFactory.prototype.createTimer = function () {
        return this.game.time.create(false);
    };
    MiscFactory.prototype.bringToTop = function (object) {
        this.game.world.bringToTop(object);
    };
    MiscFactory.prototype.runLater = function (time, functionToCall) {
        this.game.time.events.add(time, function () {
            functionToCall();
        }.bind(this));
    };
    MiscFactory.prototype.repeatEvent = function (time, numberOfCycles, functionToCall) {
        return this.game.time.events.repeat(time, numberOfCycles, function () {
            functionToCall();
        }.bind(this));
    };
    MiscFactory.prototype.shuffleUniqueArray = function (list) {
        var newList = [];
        while (newList.length !== list.length) {
            var element = this.game.rnd.pick(list);
            if (newList.lastIndexOf(element) === -1) {
                newList.push(element);
            }
        }
        return newList;
    };
    MiscFactory.prototype.cacheAddImage = function (key, data) {
        this.game.cache.addImage(key, '', data);
    };
    MiscFactory.prototype.cacheAddSpritesheet = function (key, data) {
        this.game.cache.addSpriteSheet(key, '', data, 180, 180);
    };
    return MiscFactory;
}(Factory_1.default));
exports.default = MiscFactory;
