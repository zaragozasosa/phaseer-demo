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
var TransitionFactory = (function (_super) {
    __extends(TransitionFactory, _super);
    function TransitionFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TransitionFactory.prototype.changeState = function (state) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        (_a = this.game.state).start.apply(_a, [state, true, false].concat(args));
        var _a;
    };
    TransitionFactory.prototype.toState = function (state, gameboardConfig) {
        var _this = this;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this.changeState('Transition', gameboardConfig, function () { return _this.changeState.apply(_this, [state].concat(args)); });
    };
    TransitionFactory.prototype.toStateConfig = function (state, gameboardConfig) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this.toState.apply(this, [state, gameboardConfig, gameboardConfig].concat(args));
    };
    TransitionFactory.prototype.toLoader = function (state, gameboardConfig, loader) {
        var _this = this;
        if (loader === void 0) { loader = null; }
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        this.changeState('Transition', gameboardConfig, function () { return _this.changeState.apply(_this, [state].concat(args)); }, true, loader);
    };
    TransitionFactory.prototype.toLoaderConfig = function (state, gameboardConfig, loader) {
        if (loader === void 0) { loader = null; }
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        this.toLoader.apply(this, [state, gameboardConfig, loader, gameboardConfig].concat(args));
    };
    TransitionFactory.prototype.smoothLoaderConfig = function (state, gameboardConfig, loader) {
        var _this = this;
        if (loader === void 0) { loader = null; }
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        this.changeState('Transition', gameboardConfig, function () { return _this.changeState.apply(_this, [state, gameboardConfig].concat(args)); }, false, loader);
    };
    TransitionFactory.prototype.restartState = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this.game.state).restart.apply(_a, [true, false].concat(args));
        var _a;
    };
    return TransitionFactory;
}(Factory_1.default));
exports.default = TransitionFactory;
