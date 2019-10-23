var stage, w, h, loader;
var background, ground, upperground;

var rocks = [];
var rockSpawnTime = 1500;
var rockSpawnTimeVariation = 700;
var rockSpawnCountdown = rockSpawnTime;
var rockType = false;

function init() {
    stage = new createjs.Stage("demoCanvas");

    w = stage.canvas.width;
    h = stage.canvas.height;

    loader = new createjs.LoadQueue();

    manifest = [
        { src: "background.png", id: "background" },
        { src: "groundGrass.png", id: "ground" },
        { src: "rockGrass.png", id: "rock"},
        { src: "rockGrassDown.png", id: "rockDown"}
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

function spawnRock(down){
    let rockImg = loader.getResult(down ? "rockDown" : "rock");
    let rock = new createjs.Shape();
    rock.graphics.beginBitmapFill(rockImg).drawRect(0, 0, rockImg.width, rockImg.height);
    rock.x = w;
    rock.y = down ? 0 : h - rockImg.height;
    rock.width = rockImg.width;
    rocks.push(rock);
    stage.addChildAt(rock, stage.getChildIndex(background)+1);
}

function tick(event) {
    let deltaS = event.delta / 1000;

    rockSpawnCountdown -= event.delta;
    if(rockSpawnCountdown < 0) {
        spawnRock(rockType);
        rockType = !rockType;
        rockSpawnCountdown = rockSpawnTime + Math.random()*rockSpawnTimeVariation;
    }

    let speed = 150;
    shift = deltaS*speed;

    ground.x = shiftGroundX(ground, shift);
    upperground.x = shiftGroundX(upperground, shift);

    rocks.forEach(rock => {
        rock.x -= shift;
        if(rock.x <= -rock.width) stage.removeChild(rock);
    });
    rocks = rocks.filter(rock => rock.x > -rock.width);

    stage.update(event);
}

