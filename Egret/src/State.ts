interface State {
    update() : void;
    onClick() : void;
    enter() : void;
    exit() : void;
}

abstract class SomeState {
    protected _main : Main;
    public constructor(main : Main) {
        this._main = main;
    }
}

class PreGameState extends SomeState {

    _getReadyCaption : egret.Bitmap;

    public update () {
    }

    public onClick() {
        this._main.changeState(new GameState(this._main));
    }

    public enter () {
        let getReadyCaption = this._getReadyCaption == null ? Main.createBitmapByName("textGetReady_png") : this._getReadyCaption;
        this._getReadyCaption = getReadyCaption;
        getReadyCaption.anchorOffsetX = getReadyCaption.width * 0.5;
        getReadyCaption.x = this._main.stage.stageWidth * 0.5;
        getReadyCaption.y = 25;
        this._main.addChild(getReadyCaption);
    }

    public exit() {
        this._main.removeChild(this._getReadyCaption);
    }
}

class GameState extends SomeState {
    public update () {
        let main = this._main;

        let advance = obj => obj.x -= Main.HORIZONTAL_SPEED;

        main._backgrounds.forEach(advance);
        main._obstacles.forEach(advance);

        this.checkObstacles(main._obstacles);

        main.loopBackgrounds();

        main._player.update();
    }

    public onClick() {
        this._main._player.jump();
    }

    public enter () {

    }

    public exit() {

    }

    private checkObstacles(obstacles : Obstacle[]) : void {
        let player = this._main._player;
        let checkPass = (obstacle : Obstacle) => {
            console.log(obstacle.checkPass(player.x));
        };
        obstacles.forEach(checkPass);
    }
}

class EndState extends SomeState {

    _gameOverCaption : egret.Bitmap;

    public update () {}
    public onClick () {}
    public enter() {
        let goc = this._gameOverCaption == null ? Main.createBitmapByName("textGameOver_png") : this._gameOverCaption;
        this._gameOverCaption = goc;
        goc.anchorOffsetX = goc.width * 0.5;
        goc.x = this._main.stage.stageWidth * 0.5;
        goc.y = 25;
        this._main.addChild(goc);
    }
    public exit() {
        this._main.removeChild(this._gameOverCaption);
    }
}