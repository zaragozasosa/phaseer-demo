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
        _this.cooldownText = _this.tools.text.make(20, 150, 'Status: Ready!', 50);
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
            this.cooldownText.setText('Status: Culprit ran away...');
            this.powerFinished = true;
        }
        else if (this.powerStarted) {
            this.cooldownText.setText("Status: Will escape in " + (this.turnsForPower -
                this.passedTurns));
        }
        else if (this.turnsForPower && this.passedTurns === this.turnsForPower) {
            var turns = this.grid.activatePower();
            this.cooldownText.setText("Status: Will escape in " + turns);
            this.passedTurns = 0;
            this.powerStarted = true;
        }
        if (this.cooldown && this.passedTurns === this.cooldown) {
            this.unblockElements();
        }
        else if (this.cooldown) {
            this.cooldownText.setText("Status: " + (this.cooldown - this.passedTurns) + " turns of cooldown.");
        }
    };
    CooldownGameboard.prototype.blockElements = function (cooldown) {
        this.passedTurns = 0;
        this.elements.getTop().tint = Phaser.Color.GRAY;
        this.elements.setAllChildren('inputEnabled', false);
        this.cooldown = cooldown;
        this.cooldownText.setText("Status: " + cooldown + " turns of cooldown.");
    };
    CooldownGameboard.prototype.unblockElements = function () {
        this.elements.getTop().tint = Phaser.Color.WHITE;
        this.elements.setAllChildren('inputEnabled', true);
        this.cooldown = null;
        this.cooldownText.setText("Status: Ready!");
    };
    CooldownGameboard.prototype.cooldownPower = function (turnsToActivate) {
        this.elements.kill();
        this.turnsForPower = turnsToActivate;
        this.passedTurns = 0;
        this.cooldownText.setText('Status: Culprit will appear soon!');
    };
    return CooldownGameboard;
}(Gameboard_1.default));
exports.default = CooldownGameboard;
