var stage, w, h, loader;
var background, ground;

function init() {
    stage = new createjs.Stage("demoCanvas");

    w = stage.canvas.width;
    h = stage.canvas.height;

    loader = new createjs.LoadQueue();

    manifest = [
        { src: "background.png", id: "background" },
        { src: "groundGrass.png", id: "ground" }
    ]

    loader.addEventListener("complete", handleComplete);
    loader.loadManifest(manifest, true, "../assets/png/");
}

function handleComplete() {
    background = new createjs.Shape();
    backgroundImg = loader.getResult("background");
    background.graphics.beginBitmapFill(backgroundImg).drawRect(0, 0, w, h);

    var groundImg = loader.getResult("ground");
    ground = new createjs.Shape();
    ground.graphics.beginBitmapFill(groundImg).drawRect(0, 0, w + groundImg.width, groundImg.height);
    ground.tileW = groundImg.width;
    ground.y = h - groundImg.height;

    stage.addChild(background, ground);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", tick);
}

function tick(event) {
    var deltaS = event.delta / 1000;
    ground.x = (ground.x - deltaS * 150) % ground.tileW;
    stage.update(event);
}

