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
var InputManager_1 = require("./../InputManager");
var Config_1 = require("./../Config/Config");
var TwoSpritesReader_1 = require("./../Objects/Storyboard/TwoSpritesReader");
var TextAction_1 = require("./../Objects/Storyboard/TextAction");
var SpriteAction_1 = require("./../Objects/Storyboard/SpriteAction");
var TitleAction_1 = require("./../Objects/Storyboard/TitleAction");
var Story = (function (_super) {
    __extends(Story, _super);
    function Story() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Story.prototype.init = function (gameboardConfig) {
        this.gameboardConfig = gameboardConfig;
    };
    Story.prototype.create = function () {
        var config = Config_1.Singleton.get().config;
        var tools = Config_1.Singleton.get().tools;
        this.cursor = new InputManager_1.default(config);
        tools.graphic.addBackground();
        var list = new Array();
        list.push(new SpriteAction_1.default(['smith-sheet', '0', 'left']));
        list.push(new TitleAction_1.default(['Agent Smith', 'left']));
        list.push(new TextAction_1.default(['It was a rainy night. I was asked to come immediately.']));
        list.push(new TextAction_1.default(['The case was a murder in an old mansion. My squad was already investigating, but something happened.']));
        list.push(new SpriteAction_1.default(['lily-sheet', '0', 'right', 'black']));
        list.push(new TextAction_1.default(['One unidentified suspect managed to knock out every police offer on the crime scene. Then they cleaned up the whole place, took all the evidence and left.']));
        list.push(new TextAction_1.default(['We believe the suspect is armed and trained in hand-to-hand combat.']));
        list.push(new TextAction_1.default(['The instructions were clear. Detain the suspect and find the evidence regarding the murder case.']));
        list.push(new TextAction_1.default(["Damn, it's always the difficult cases for me, isn't it?"]));
        list.push(new SpriteAction_1.default(['lily-sheet', '2', 'right']));
        list.push(new TitleAction_1.default(['Lily', 'right']));
        list.push(new TextAction_1.default(["Huh? Who are you? Are you trying to trying to further desacrate the master's propierty?"]));
        list.push(new TitleAction_1.default(['Agent Smith', 'left']));
        list.push(new SpriteAction_1.default(['smith-sheet', '3', 'left']));
        list.push(new TextAction_1.default(['No, wait, stop!']));
        this.reader = new TwoSpritesReader_1.default(list, function () {
            this.state.start('GameboardLoader', true, false, this.gameboardConfig);
        }.bind(this));
        this.reader.start();
    };
    Story.prototype.update = function () {
        if (this.cursor.checkClick()) {
            this.reader.playNextAction();
        }
        if (this.cursor.checkKeys()) {
            this.reader.playNextAction();
        }
    };
    return Story;
}(Phaser.State));
exports.default = Story;
