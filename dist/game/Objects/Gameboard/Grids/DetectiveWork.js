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
var DetectiveWorkLogic_1 = require("./../GridLogic/DetectiveWorkLogic");
var DetectiveWork = (function (_super) {
    __extends(DetectiveWork, _super);
    function DetectiveWork(config) {
        var _this = this;
        var gridLogic = new DetectiveWorkLogic_1.default(config);
        _this = _super.call(this, config, gridLogic) || this;
        return _this;
    }
    DetectiveWork.prototype.activatePower = function () {
        return this.gridLogic.createGhostTile();
    };
    DetectiveWork.prototype.getPowerConfiguration = function () {
        var group = this.tools.misc.addGroup();
        group.inputEnableChildren = true;
        group.add(this.tools.text.make(50, 1200, 'UP', 50));
        group.add(this.tools.text.make(200, 1200, 'DOWN', 50));
        group.add(this.tools.text.make(475, 1200, 'LEFT', 50));
        group.add(this.tools.text.make(700, 1200, 'RIGHT', 50));
        var btn = this.tools.text.makeXBounded(1280, 'Catch the culprit!', 50, 'center');
        btn.tint = Phaser.Color.GRAY;
        group.add(btn);
        btn.inputEnabled = false;
        group.onChildInputDown.add(function (child) {
            group.setAllChildren('tint', Phaser.Color.WHITE);
            child.tint = Phaser.Color.RED;
            if (child.text === 'UP') {
                this.gridLogic.changeFlow(Phaser.Keyboard.UP);
            }
            else if (child.text === 'DOWN') {
                this.gridLogic.changeFlow(Phaser.Keyboard.DOWN);
            }
            else if (child.text === 'LEFT') {
                this.gridLogic.changeFlow(Phaser.Keyboard.LEFT);
            }
            else if (child.text === 'RIGHT') {
                this.gridLogic.changeFlow(Phaser.Keyboard.RIGHT);
            }
            else {
                this.gridLogic.investigate();
            }
        }.bind(this));
        this.elements = group;
        return group;
    };
    return DetectiveWork;
}(Grid_1.default));
exports.default = DetectiveWork;
