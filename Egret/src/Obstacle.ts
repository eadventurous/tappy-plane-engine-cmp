class Obstacle extends egret.DisplayObjectContainer {

    _image : egret.Bitmap;
    _hitbox : egret.Shape;
    _passBox : egret.Shape;
    
    _alreadyHit : Boolean;

    public constructor(imageName : string, main : Main) {
        super();
        let img = Main.createBitmapByName(imageName);
        //img.scaleY = -1;
        //img.anchorOffsetX = img.width * 0.5;
        //img.anchorOffsetY = img.height - 10;

        let pb = new egret.Shape();
        pb.graphics.beginFill(0x2ecc71);
        pb.graphics.drawRect(img.width, 0, 10, main.stage.stageHeight);
        pb.graphics.endFill();

        let hb = new egret.Shape();
        hb.graphics.beginFill(0xe74c3c);
        hb.graphics.drawRect(0, 0, img.width, img.height);
        hb.graphics.endFill();

        this._image = img;

        this.addChild(pb);
        this.addChild(hb);
        this.addChild(this._image);
    }

    public checkPass(x : number) : Boolean {
        return x > this._passBox.x;
    }

    public checkCollision(x : number, y : number) : Boolean{
        return this._hitbox.hitTestPoint(x, y, false);
    }
}