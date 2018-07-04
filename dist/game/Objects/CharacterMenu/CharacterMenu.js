"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TileModel_1 = require("./../../Models/TileModel");
var Carrousel_1 = require("./Carrousel");
var CharacterMenu = (function () {
    function CharacterMenu(config) {
        this.gameboardConfig = config;
        this.create();
    }
    CharacterMenu.prototype.create = function () {
        this.displayArray = this.gameboardConfig.tiles.filter(function (x) { return x.playable; });
        this.displayArray.push(new TileModel_1.default('random', 'Random', 'Select a random character', '', '', 0, null, null, null, null, 'Decision paralysis? Just click the button and start playing, you fool!'));
        this.carrousel = new Carrousel_1.default(this.displayArray, function (character) {
        }.bind(this));
    };
    return CharacterMenu;
}());
exports.default = CharacterMenu;
