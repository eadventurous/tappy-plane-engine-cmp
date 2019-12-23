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
        let main = this._main;
        main._score = 0;
        main.updateScoreText();
        main._player.y = main.stage.stageHeight * 0.5;
        main._player._ySpeed = 0;

        let removeObstacles = obs => {
            main.removeChild(obs);
        }
        main._obstacles.forEach(removeObstacles);
        main._obstacles = new Array();

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

    _lastSpawnedObstacle : number;
    readonly SPAWN_OBSTACLE_EVERY = 400;

    public update () {
        let main = this._main;

        let advance = obj => obj.x -= Main.HORIZONTAL_SPEED;

        main._backgrounds.forEach(advance);
        main._obstacles.forEach(advance);

        if(this._lastSpawnedObstacle <= 0) {
            let obs = new Obstacle("rockGrass_png", main);
            main._obstacles.push(obs);
            main.addChild(obs);
            this._lastSpawnedObstacle = this.SPAWN_OBSTACLE_EVERY;
        }

        this.checkObstacles(main._obstacles);
        main.loopBackgrounds();

        main._player.update();

        this._lastSpawnedObstacle -= Main.HORIZONTAL_SPEED;
    }

    public onClick() {
        this._main._player.jump();
    }

    public enter () {
        this._lastSpawnedObstacle = 0;
    }

    public exit() {

    }

    private checkObstacles(obstacles : Obstacle[]) : void {
        let player = this._main._player;
        let checkPass = (obstacle : Obstacle) => {
            if(obstacle.checkPass(player.x)) {
                obstacle.setAsUsed();
                this._main.increaseScore();
                return;
            }
            if(obstacle.checkCollision(player.x, player.y)) {
                obstacle.setAsUsed();
                this._main.changeState(new EndState(this._main));
            }            
        };
        obstacles.forEach(checkPass);
    }
}

class EndState extends SomeState {

    _gameOverCaption : egret.Bitmap;

    public update () {}
    public onClick () {
        this._main.changeState(new PreGameState(this._main));
    }
    public enter() {
        let goc = this._gameOverCaption == null ? Main.createBitmapByName("textGameOver_png") : this._gameOverCaption;
        this._gameOverCaption = goc;
        goc.anchorOffsetX = goc.width * 0.5;
        goc.x = this._main.stage.stageWidth * 0.5;
        goc.y = this._main.stage.stageHeight * 0.5;
        this._main.addChild(goc);
    }
    public exit() {
        this._main.removeChild(this._gameOverCaption);
    }
}