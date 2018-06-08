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
var DetectiveWorkLogic_1 = require("./../../Logic/PlayerLogic/DetectiveWorkLogic");
var DetectiveWork = (function (_super) {
    __extends(DetectiveWork, _super);
    function DetectiveWork(config) {
        var _this = this;
        var gridLogic = new DetectiveWorkLogic_1.default(config);
        _this = _super.call(this, config, gridLogic) || this;
        return _this;
    }
    DetectiveWork.prototype.activatePower = function () {
        if (!this.elements) {
            this.elements = this.makeElements();
            return this.elements;
        }
    };
    DetectiveWork.prototype.makeElements = function () {
        var group = this.tools.misc.addGroup();
        group.inputEnableChildren = true;
        group.add(this.tools.text.make(50, 1250, 'UP', 60));
        group.add(this.tools.text.make(200, 1250, 'DOWN', 60));
        group.add(this.tools.text.make(475, 1250, 'LEFT', 60));
        group.add(this.tools.text.make(700, 1250, 'RIGHT', 60));
        group.onChildInputDown.add(function (child) {
            group.setAllChildren('tint', Phaser.Color.WHITE);
            child.tint = Phaser.Color.RED;
            if (child.text === 'UP') {
                this.gridLogic.investigate(Phaser.Keyboard.UP);
            }
            else if (child.text === 'DOWN') {
                this.gridLogic.investigate(Phaser.Keyboard.DOWN);
            }
            if (child.text === 'LEFT') {
                this.gridLogic.investigate(Phaser.Keyboard.LEFT);
            }
            if (child.text === 'RIGHT') {
                this.gridLogic.investigate(Phaser.Keyboard.RIGHT);
            }
        }.bind(this));
        return group;
    };
    return DetectiveWork;
}(Grid_1.default));
exports.default = DetectiveWork;
