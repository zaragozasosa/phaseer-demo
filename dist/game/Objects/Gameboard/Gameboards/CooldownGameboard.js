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
var Gameboard_1 = require("./../Gameboard");
var CooldownGameboard = (function (_super) {
    __extends(CooldownGameboard, _super);
    function CooldownGameboard(gameboardConfig) {
        var _this = _super.call(this, gameboardConfig) || this;
        _this.actionButton.kill();
        _this.passedTurns = 0;
        _this.cooldown = 0;
        _this.powerStarted = false;
        _this.powerFinished = false;
        var group = _this.grid.activatePower();
        _this.elements = group;
        _this.cooldownText = _this.tools.text.make(20, 150, 'Status: Idle', 50);
        _this.gameboardConfig.cooldownSignal.add(function (activatePower, cooldown, success) {
            if (success) {
                this.cooldownText.setText("Status: Success!");
                this.powerFinished = true;
            }
            else if (activatePower) {
                this.cooldownPower(cooldown);
            }
            else {
                this.blockElements(cooldown);
            }
        }.bind(_this));
        _this.gameboardConfig.turnsSignal.add(function () {
            if (!this.powerFinished) {
                this.newTurn();
            }
        }.bind(_this));
        return _this;
    }
    CooldownGameboard.prototype.newTurn = function () {
        this.passedTurns++;
        if (this.powerStarted && this.passedTurns === this.turnsForPower) {
            this.cooldownText.setText('Status: Failure');
            this.powerFinished = true;
        }
        else if (this.powerStarted) {
            this.cooldownText.setText("Status: " + (this.turnsForPower -
                this.passedTurns) + " turns left");
        }
        else if (this.turnsForPower && this.passedTurns === this.turnsForPower) {
            var turns = this.grid.activatePower();
            this.showMessage('You found the culprit!', 65);
            this.cooldownText.setText("Status: " + turns + " turns left");
            this.passedTurns = 0;
            this.powerStarted = true;
        }
        if (this.cooldown && this.passedTurns === this.cooldown) {
            this.unblockElements();
        }
        else if (this.cooldown) {
            this.cooldownText.setText("Status: " + (this.cooldown - this.passedTurns) + " turns of cd");
        }
    };
    CooldownGameboard.prototype.blockElements = function (cooldown) {
        this.passedTurns = 0;
        var elementsToKill = this.elements.getAll('tint', Phaser.Color.WHITE);
        for (var _i = 0, elementsToKill_1 = elementsToKill; _i < elementsToKill_1.length; _i++) {
            var e = elementsToKill_1[_i];
            e.kill();
        }
        this.cooldown = cooldown;
        this.cooldownText.setText("Status: " + cooldown + " turns of cd");
    };
    CooldownGameboard.prototype.unblockElements = function () {
        this.elements.callAll('revive', null);
        this.elements.setAllChildren('inputEnabled', true);
        this.cooldown = null;
        this.cooldownText.setText("Status: Investigating");
    };
    CooldownGameboard.prototype.cooldownPower = function (turnsToActivate) {
        this.elements.kill();
        this.turnsForPower = turnsToActivate;
        this.passedTurns = 0;
        this.showMessage('The culprit will appear soon!', 55);
        this.cooldownText.setText('Status: ?');
    };
    return CooldownGameboard;
}(Gameboard_1.default));
exports.default = CooldownGameboard;
