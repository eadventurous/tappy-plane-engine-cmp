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
var Plane = (function (_super) {
    __extends(Plane, _super);
    function Plane() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Plane.prototype.init = function (imageName, main) {
        this._initialized = true;
        this._main = main;
        this._ySpeed = 0;
        var img = Main.createBitmapByName(imageName);
        img.anchorOffsetX = img.width * 0.5;
        img.anchorOffsetY = img.height * 0.5;
        this.x = this._main.stage.stageWidth * 0.5;
        this.y = this._main.stage.stageHeight * 0.5;
        this._image = img;
        this.addChild(this._image);
    };
    Plane.prototype.update = function () {
        if (!this._initialized)
            return;
        this.y -= this._ySpeed;
        if (this.y < 70 || this.y > this._main.stage.stageHeight - 70) {
            this._main.changeState(new EndState(this._main));
        }
        this._ySpeed -= Main.GRAVITY;
    };
    Plane.prototype.jump = function () {
        var JUMP_SPEED = 5;
        this._ySpeed = JUMP_SPEED;
    };
    return Plane;
}(egret.DisplayObjectContainer));
__reflect(Plane.prototype, "Plane");
//# sourceMappingURL=Plane.js.map