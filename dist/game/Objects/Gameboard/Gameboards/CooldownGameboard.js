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
    function CooldownGameboard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CooldownGameboard.prototype.start = function () {
        this.createGrid();
        this.passedTurns = 0;
        this.cooldown = 0;
        this.powerStarted = false;
        this.powerFinished = false;
        var group = this.grid.getPowerConfiguration();
        this.playerUI.create(group);
        this.gameboardConfig.cooldownSignal.add(function (activatePower, cooldown, success) {
            if (success) {
                this.playerUI.updateSpecialElements('Status: Success!');
                this.powerFinished = true;
            }
            else if (activatePower) {
                this.cooldownPower(cooldown);
            }
            else {
                this.blockElements(cooldown);
            }
        }.bind(this));
        this.gameboardConfig.turnsSignal.add(function () {
            if (!this.powerFinished) {
                this.newTurn();
            }
        }.bind(this));
    };
    CooldownGameboard.prototype.newTurn = function () {
        this.passedTurns++;
        if (this.powerStarted && this.passedTurns === this.turnsForPower) {
            this.playerUI.updateSpecialElements('Status: Failure!');
            this.powerFinished = true;
        }
        else if (this.powerStarted) {
            this.playerUI.updateSpecialElements("Status: " + (this.turnsForPower - this.passedTurns) + " turns left");
        }
        else if (this.turnsForPower && this.passedTurns === this.turnsForPower) {
            var turns = this.grid.activatePower();
            this.showMessage('You found the culprit!', 65);
            this.playerUI.updateSpecialElements("Status: " + turns + " turns left");
            this.passedTurns = 0;
            this.powerStarted = true;
        }
        if (this.cooldown && this.passedTurns === this.cooldown) {
            this.unblockElements();
        }
        else if (this.cooldown) {
            this.playerUI.updateSpecialElements("Status: " + (this.cooldown - this.passedTurns) + " turns of cd");
        }
    };
    CooldownGameboard.prototype.blockElements = function (cooldown) {
        this.passedTurns = 0;
        this.cooldown = cooldown;
        this.playerUI.blockButtons(true);
        this.playerUI.updateSpecialElements("Status: " + cooldown + " turns of cd");
    };
    CooldownGameboard.prototype.unblockElements = function () {
        this.cooldown = null;
        this.playerUI.blockButtons(false);
    };
    CooldownGameboard.prototype.cooldownPower = function (turnsToActivate) {
        this.turnsForPower = turnsToActivate;
        this.passedTurns = 0;
        this.playerUI.activatePower();
    };
    return CooldownGameboard;
}(Gameboard_1.default));
exports.default = CooldownGameboard;
