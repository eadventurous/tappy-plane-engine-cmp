var stage, w, h, loader;
var background, ground, upperground;

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
    ground.tileW = groundImg.width;
    ground.graphics.beginBitmapFill(groundImg).drawRect(0, 0, w + groundImg.width, groundImg.height);
    ground.x = shiftGroundX(ground, Math.random() * groundImg.width);
    ground.y = h - groundImg.height;

    upperground = ground.clone(true);
    upperground.tileW = groundImg.width;
    upperground.x = shiftGroundX(ground, Math.random() * groundImg.width);
    upperground.y = groundImg.height;
    upperground.scaleY = -1;

    stage.addChild(background, ground, upperground);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", tick);
}

function shiftGroundX(ground, deltaX){
    return (ground.x - deltaX) % ground.tileW;
}

function tick(event) {
    let deltaS = event.delta / 1000;
    let speed = 150;
    ground.x = shiftGroundX(ground, deltaS*speed);
    upperground.x = shiftGroundX(upperground, deltaS*speed);
    stage.update(event);
}

