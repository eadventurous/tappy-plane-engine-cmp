var gameWidth = 800;
var gameHeight = 460;

var state;
var ticker;
var resources;

var ground;
var upperground;
var plane;

var rocks = [];
var rockSpawnTime = 1500;
var rockSpawnTimeVariation = 700;
var rockSpawnCountdown = rockSpawnTime;
var rockType = false;

var planeV = 0;
var planeA = 0.2;
var planeM = 100;
var speedBoost = -5;

var speed = 150;
//Create a Pixi Application
let app = new PIXI.Application({
     width: gameWidth, 
     height: gameHeight, 
     antialias: true,
     sharedTicker: true, 
    });

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

PIXI.loader
    .add("background", "../Assets/PNG/background.png")
    .add("ground", "../Assets/PNG/groundGrass.png")
    .add("rock", "../Assets/PNG/rockGrass.png")
    .add("rockDown", "../Assets/PNG/rockGrassDown.png")
    .add("plane1", "../Assets/PNG/Planes/planeRed1.png")
    .add("plane2", "../Assets/PNG/Planes/planeRed2.png")
    .add("plane3", "../Assets/PNG/Planes/planeRed3.png")
    .load(setup);

function setup() {

    resources = PIXI.loader.resources;

    let background = new PIXI.Sprite(resources.background.texture);
    app.stage.addChild(background);

    let groundTex = resources.ground.texture;
    let tileW = groundTex.width;
    ground = new PIXI.TilingSprite(groundTex, gameWidth + tileW, groundTex.height);
    ground.tileW = tileW;
    ground.x = shiftGroundX(ground, Math.random() * tileW);
    ground.y = gameHeight - groundTex.height;
    app.stage.addChild(ground);

    upperground = new PIXI.TilingSprite(groundTex, gameWidth + tileW, groundTex.height);
    upperground.tileW = tileW;
    upperground.x = shiftGroundX(upperground, Math.random() * tileW);
    upperground.y = groundTex.height;
    upperground.scale.y = -1;
    app.stage.addChild(upperground);

    let planeTexs = [resources["plane1"].texture, resources["plane2"].texture, resources["plane3"].texture];
    plane = new PIXI.AnimatedSprite(planeTexs);
    app.stage.addChild(plane);
    plane.play();
    plane.y = gameHeight/2 - plane.height/2;
    plane.x = plane.width;

    app.stage.interactive = true;
    app.stage.mouseup = () => planeV = speedBoost;

    state = play;

    ticker = PIXI.Ticker.shared;
    ticker.add(delta => gameLoop(delta));
    ticker.start();
}

function gameLoop(delta) {

    //Update the current game state:
    state(delta);
}

function play(delta) {
    let deltaS = ticker.elapsedMS / 1000;

    shift = deltaS*speed;

    ground.x = shiftGroundX(ground, shift);
    upperground.x = shiftGroundX(upperground, shift);

    rockSpawnCountdown -= ticker.elapsedMS;
    if(rockSpawnCountdown < 0) {
        spawnRock(rockType);
        rockType = !rockType;
        rockSpawnCountdown = rockSpawnTime + Math.random()*rockSpawnTimeVariation;
    }

    rocks.forEach(rock => {
        rock.x -= shift;
        if(rock.x <= -rock.width) app.stage.removeChild(rock);
    });

    planeV += planeA;
    plane.y += planeV;
}

function spawnRock(down){
    let rockTex = resources[down ? "rockDown" : "rock"].texture;
    let rock = new PIXI.Sprite(rockTex);
    rock.x = gameWidth;
    rock.y = down ? 0 : gameHeight - rockTex.height;
    rocks.push(rock);
    app.stage.addChild(rock);
    rock.passed = false;
}

function shiftGroundX(ground, deltaX) {
    return (ground.x - deltaX) % ground.tileW;
}