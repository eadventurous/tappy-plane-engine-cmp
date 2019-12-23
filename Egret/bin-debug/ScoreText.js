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
var ScoreText = (function (_super) {
    __extends(ScoreText, _super);
    function ScoreText() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScoreText.prototype.setNumber = function (i) {
        var _this = this;
        this.removeChildren();
        var digits = i.toString(10).split("");
        digits.forEach(function (digit, i) {
            var bm = Main.createBitmapByName("number" + digit + "_png");
            bm.x = i * bm.width + 5;
            _this.addChild(bm);
        });
    };
    return ScoreText;
}(egret.DisplayObjectContainer));
__reflect(ScoreText.prototype, "ScoreText");
//# sourceMappingURL=ScoreText.js.map