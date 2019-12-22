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
    function Obstacle(imageName) {
        var _this = _super.call(this) || this;
        var img = Main.createBitmapByName(imageName);
        img.anchorOffsetX = img.width * 0.5;
        img.anchorOffsetY = img.height - 10;
        _this._image = img;
        _this.addChild(_this._image);
        return _this;
    }
    return Obstacle;
}(egret.DisplayObjectContainer));
__reflect(Obstacle.prototype, "Obstacle");
//# sourceMappingURL=Obstacle.js.map