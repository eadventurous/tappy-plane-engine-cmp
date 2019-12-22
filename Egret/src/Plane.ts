class Plane extends egret.DisplayObjectContainer {

    _image : egret.Bitmap;
    _ySpeed : number;
    _stage : egret.Stage;

    _initialized : Boolean;

    public init(imageName : string, stage : egret.Stage) : void {
        this._initialized = true;

        this._stage = stage;

        this._ySpeed = 0;

        let img = Main.createBitmapByName(imageName);
        img.anchorOffsetX = img.width * 0.5;
        img.anchorOffsetY = img.height * 0.5;

        this.x = this._stage.stageWidth * 0.5;
        this.y = this._stage.stageHeight * 0.5;

        console.log(`${this.x} ${this.y}`);

        this._image = img;

        this.addChild(this._image);
    }

    public update() : void {
        if(!this._initialized) return;

         this._ySpeed -= Main.GRAVITY;
         this.y -= this._ySpeed;
    }

    public jump() : void {
        const JUMP_SPEED = 5;
        this._ySpeed = JUMP_SPEED;
    }
}