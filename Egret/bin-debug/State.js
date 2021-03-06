var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var SomeState = (function () {
    function SomeState(main) {
        this._main = main;
    }
    return SomeState;
}());
__reflect(SomeState.prototype, "SomeState");
var PreGameState = (function (_super) {
    __extends(PreGameState, _super);
    function PreGameState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PreGameState.prototype.update = function () {
    };
    PreGameState.prototype.onClick = function () {
        this._main.changeState(new GameState(this._main));
    };
    PreGameState.prototype.enter = function () {
        var main = this._main;
        main._score = 0;
        main.updateScoreText();
        main._player.y = main.stage.stageHeight * 0.5;
        main._player._ySpeed = 0;
        var removeObstacles = function (obs) {
            main.removeChild(obs);
        };
        main._obstacles.forEach(removeObstacles);
        main._obstacles = new Array();
        var getReadyCaption = this._getReadyCaption == null ? Main.createBitmapByName("textGetReady_png") : this._getReadyCaption;
        this._getReadyCaption = getReadyCaption;
        getReadyCaption.anchorOffsetX = getReadyCaption.width * 0.5;
        getReadyCaption.x = this._main.stage.stageWidth * 0.5;
        getReadyCaption.y = 25;
        this._main.addChild(getReadyCaption);
    };
    PreGameState.prototype.exit = function () {
        this._main.removeChild(this._getReadyCaption);
    };
    return PreGameState;
}(SomeState));
__reflect(PreGameState.prototype, "PreGameState");
var GameState = (function (_super) {
    __extends(GameState, _super);
    function GameState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.SPAWN_OBSTACLE_EVERY = 400;
        return _this;
    }
    GameState.prototype.update = function () {
        var main = this._main;
        var advance = function (obj) { return obj.x -= Main.HORIZONTAL_SPEED; };
        main._backgrounds.forEach(advance);
        main._obstacles.forEach(advance);
        if (this._lastSpawnedObstacle <= 0) {
            var obs = new Obstacle("rockGrass_png", main);
            main._obstacles.push(obs);
            main.addChild(obs);
            this._lastSpawnedObstacle = this.SPAWN_OBSTACLE_EVERY;
        }
        this.checkObstacles(main._obstacles);
        main.loopBackgrounds();
        main._player.update();
        this._lastSpawnedObstacle -= Main.HORIZONTAL_SPEED;
    };
    GameState.prototype.onClick = function () {
        this._main._player.jump();
    };
    GameState.prototype.enter = function () {
        this._lastSpawnedObstacle = 0;
    };
    GameState.prototype.exit = function () {
    };
    GameState.prototype.checkObstacles = function (obstacles) {
        var _this = this;
        var player = this._main._player;
        var checkPass = function (obstacle) {
            if (obstacle.checkPass(player.x)) {
                obstacle.setAsUsed();
                _this._main.increaseScore();
                return;
            }
            if (obstacle.checkCollision(player.x, player.y)) {
                obstacle.setAsUsed();
                _this._main.changeState(new EndState(_this._main));
            }
        };
        obstacles.forEach(checkPass);
    };
    return GameState;
}(SomeState));
__reflect(GameState.prototype, "GameState");
var EndState = (function (_super) {
    __extends(EndState, _super);
    function EndState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EndState.prototype.update = function () { };
    EndState.prototype.onClick = function () {
        this._main.changeState(new PreGameState(this._main));
    };
    EndState.prototype.enter = function () {
        var goc = this._gameOverCaption == null ? Main.createBitmapByName("textGameOver_png") : this._gameOverCaption;
        this._gameOverCaption = goc;
        goc.anchorOffsetX = goc.width * 0.5;
        goc.x = this._main.stage.stageWidth * 0.5;
        goc.y = this._main.stage.stageHeight * 0.5;
        this._main.addChild(goc);
    };
    EndState.prototype.exit = function () {
        this._main.removeChild(this._gameOverCaption);
    };
    return EndState;
}(SomeState));
__reflect(EndState.prototype, "EndState");
//# sourceMappingURL=State.js.map