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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this._backgrounds = new Array();
        _this._player = new Plane();
        _this._scoreText = new ScoreText();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        var _this = this;
        egret.lifecycle.addLifecycleListener(function (context) {
            context.onUpdate = function () {
                _this._backgrounds.forEach(function (bg) {
                    bg.x -= Main.HORIZONTAL_SPEED;
                });
                _this.loopBackgrounds();
                _this._player.update();
            };
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        this.runGame().catch(function (e) {
            console.log(e);
        });
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    Main.prototype.onClick = function (evt) {
        this._player.jump();
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, RES.getResAsync("description_json")];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 2:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        var _this = this;
        this._backgrounds.push(this.createBackground(0));
        this._backgrounds.push(this.createBackground(1));
        this._backgrounds.push(this.createTopBackgroundAddition(0));
        this._backgrounds.push(this.createTopBackgroundAddition(1));
        this._backgrounds.push(this.createBottomBackgroundAddition(0));
        this._backgrounds.push(this.createBottomBackgroundAddition(1));
        this._backgrounds.forEach(function (bg, i) {
            _this.addChild(bg);
        });
        this._player.init("planeGreen1_png", this.stage);
        this.addChild(this._player);
        var st = this._scoreText;
        st.x = this.stage.stageWidth * 0.5;
        st.y = 25;
        st.setNumber(0);
        this.addChild(st);
    };
    Main.prototype.createBackground = function (i) {
        var bg = Main.createBitmapByName("background_png");
        bg.x = bg.width * i;
        return bg;
    };
    Main.prototype.createTopBackgroundAddition = function (i) {
        var stageW = this.stage.stageWidth;
        var bg = Main.createBitmapByName("groundGrass_png");
        bg.x = bg.width * i;
        bg.scaleY = -1;
        bg.y = bg.height;
        return bg;
    };
    Main.prototype.createBottomBackgroundAddition = function (i) {
        var stageH = this.stage.stageHeight;
        var bg = Main.createBitmapByName("groundGrass_png");
        bg.x = bg.width * i;
        bg.y = stageH - bg.height;
        return bg;
    };
    Main.prototype.createObstacle = function () {
        var obs = new Obstacle("rockGrass_png");
        return obs;
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Main.prototype.loopBackgrounds = function () {
        this._backgrounds.forEach(function (bg, i) {
            if (bg.x <= -bg.width) {
                // Moving background forward to a double of its width
                // Only works when background is wider than the screen
                // Also possible to accumulate integral error (constant additions instead of hard assignment)
                bg.x += bg.width * 2;
            }
        });
    };
    Main.GRAVITY = 0.2;
    Main.HORIZONTAL_SPEED = 5;
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map