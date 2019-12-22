class Plane extends egret.DisplayObjectContainer {

    _image : egret.Bitmap;
    _ySpeed : number;
    _main : Main;

    _initialized : Boolean;

    public init(imageName : string, main : Main) : void {
        this._initialized = true;

        this._main = main;

        this._ySpeed = 0;

        let img = Main.createBitmapByName(imageName);
        img.anchorOffsetX = img.width * 0.5;
        img.anchorOffsetY = img.height * 0.5;

        this.x = this._main.stage.stageWidth * 0.5;
        this.y = this._main.stage.stageHeight * 0.5;

        this._image = img;

        this.addChild(this._image);
    }

    public update() : void {
        if(!this._initialized) return;

         this.y -= this._ySpeed;

         if(this.y < 70 || this.y > this._main.stage.stageHeight - 70) {
             this._main.changeState(new EndState(this._main));
         }

         this._ySpeed -= Main.GRAVITY;
    }

    public jump() : void {
        const JUMP_SPEED = 5;
        this._ySpeed = JUMP_SPEED;
    }
}