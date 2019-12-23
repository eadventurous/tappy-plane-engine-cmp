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
var Obstacle = (function (_super) {
    __extends(Obstacle, _super);
    function Obstacle(imageName, main) {
        var _this = _super.call(this) || this;
        _this._alreadyHitOrPassed = false;
        var img = Main.createBitmapByName(imageName);
        var hb = new egret.Shape();
        hb.graphics.beginFill(0xe74c3c);
        hb.graphics.drawRect(0, 0, img.width, img.height);
        hb.graphics.endFill();
        _this._hitbox = hb;
        _this._image = img;
        _this.x = main.stage.stageWidth;
        if (Math.random() > 0.5) {
            _this.scaleY = -1;
            _this.y = img.height;
        }
        else {
            _this.y = main.stage.stageHeight - img.height;
        }
        hb.alpha = 0;
        _this.addChild(hb);
        _this.addChild(_this._image);
        return _this;
    }
    Obstacle.prototype.checkPass = function (x) {
        return !this._alreadyHitOrPassed && x > this.x;
    };
    Obstacle.prototype.checkCollision = function (x, y) {
        return this._hitbox.hitTestPoint(x, y, false);
    };
    Obstacle.prototype.setAsUsed = function () {
        this._alreadyHitOrPassed = true;
    };
    return Obstacle;
}(egret.DisplayObjectContainer));
__reflect(Obstacle.prototype, "Obstacle");
//# sourceMappingURL=Obstacle.js.map