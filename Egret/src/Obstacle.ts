class Obstacle extends egret.DisplayObjectContainer {

    _image : egret.Bitmap;
    _hitbox : egret.Shape;
    
    _alreadyHitOrPassed : Boolean = false;

    public constructor(imageName : string, main : Main) {
        super();
        let img = Main.createBitmapByName(imageName);

        let hb = new egret.Shape();
        hb.graphics.beginFill(0xe74c3c);
        hb.graphics.drawRect(0, 0, img.width, img.height);
        hb.graphics.endFill();
        this._hitbox = hb;

        this._image = img;

        this.x = main.stage.stageWidth;

        if(Math.random() > 0.5) {
            this.scaleY = -1;
            this.y = img.height;
        } else {
            this.y = main.stage.stageHeight - img.height;
        }

        hb.alpha = 0;
        this.addChild(hb);
        this.addChild(this._image);
    }

    public checkPass(x : number) : Boolean {
        return !this._alreadyHitOrPassed && x > this.x;
    }

    public checkCollision(x : number, y : number) : Boolean {
        return this._hitbox.hitTestPoint(x, y, false);
    }

    public setAsUsed() : void {
        this._alreadyHitOrPassed = true;
    }
}