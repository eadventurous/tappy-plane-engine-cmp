class Obstacle extends egret.DisplayObjectContainer {

    _image : egret.Bitmap;

    public constructor(imageName : string) {
        super();
        let img = Main.createBitmapByName(imageName);
        img.anchorOffsetX = img.width * 0.5;
        img.anchorOffsetY = img.height - 10;

        this._image = img;

        this.addChild(this._image);
    }
}