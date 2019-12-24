var gameWidth = 800;
var gameHeight = 460;

var state;
var ticker;
var resources;

var ground;
var upperground;
var plane;
var score;

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
    ground.hitArea = new PIXI.RoundedRectangle(0, groundTex.height / 3, ground.width, groundTex.height * 2 / 3);
    addRectCollider(ground, { y: gameHeight - (groundTex.height / 1.5), x: 0 }, { y: gameHeight, x: gameWidth });
    app.stage.addChild(ground);

    upperground = new PIXI.TilingSprite(groundTex, gameWidth + tileW, groundTex.height);
    upperground.tileW = tileW;
    upperground.x = shiftGroundX(upperground, Math.random() * tileW);
    upperground.y = groundTex.height;
    upperground.scale.y = -1;
    addRectCollider(upperground, { y: 0, x: 0 }, { y: groundTex.height / 1.5, x: gameWidth })
    app.stage.addChild(upperground);

    let planeTexs = [resources["plane1"].texture, resources["plane2"].texture, resources["plane3"].texture];
    plane = new PIXI.AnimatedSprite(planeTexs);
    app.stage.addChild(plane);
    plane.y = gameHeight / 2 - plane.height / 2;
    plane.x = plane.width;
    addRectCollider(plane, { y: plane.y, x: plane.x }, { y: plane.y + plane.height, x: plane.x + plane.width });

    score = new PIXI.Text("TAPPY PLANE",
        {
            fontFamily: 'Arial',
            fontSize: 42,
            fill: 0x529ede,
            align: 'center'
        });
    score.x = gameWidth / 2 - score.width / 2;
    score.y = gameHeight / 5;
    app.stage.sortableChildren = true;
    score.zIndex = 10;
    app.stage.addChild(score);

    app.stage.interactive = true;
    let onclick = () => {
        if (state != play) {
            state = play;
            plane.play();
            score.text = 0;
            score.x = gameWidth / 2 - score.width / 2;
        }
        planeV = speedBoost;
    };

    app.stage.mouseup = onclick;
    app.stage.touchstart = onclick;

    state = idle;

    ticker = PIXI.Ticker.shared;
    ticker.add(delta => gameLoop(delta));
    ticker.start();
}

function gameLoop(delta) {

    //Update the current game state:
    state(delta);
}

function idle(delta) {

}

function restart() {
    state = idle;
    location.reload();
}

function play(delta) {
    let deltaS = ticker.elapsedMS / 1000;

    shift = deltaS * speed;

    ground.x = shiftGroundX(ground, shift);
    upperground.x = shiftGroundX(upperground, shift);

    rockSpawnCountdown -= ticker.elapsedMS;
    if (rockSpawnCountdown < 0) {
        spawnRock(rockType);
        rockType = !rockType;
        rockSpawnCountdown = rockSpawnTime + Math.random() * rockSpawnTimeVariation;
    }

    rocks.forEach(rock => {
        rock.x -= shift;
        if (rock.x <= -rock.width) app.stage.removeChild(rock);
        rock.collider.update({ x: -shift, y: 0 });
        if (rock.collider.intersects(plane.collider)) {
            restart();
        }
        if (!rock.passed && rock.x + rock.width / 2 < plane.x + plane.width / 2) {
            rock.passed = true;
            score.text = (parseInt(score.text) + 1).toString();
            score.x = gameWidth / 2 - score.width / 2;
        }
    });

    planeV += planeA;
    plane.y += planeV;
    plane.collider.update({ x: 0, y: planeV });
    if (plane.collider.intersects(ground.collider) || plane.collider.intersects(upperground.collider))
        restart();
}

function spawnRock(down) {
    let rockTex = resources[down ? "rockDown" : "rock"].texture;
    let rock = new PIXI.Sprite(rockTex);
    rock.x = gameWidth;
    rock.y = down ? 0 : gameHeight - rockTex.height;
    rocks.push(rock);
    app.stage.addChild(rock);
    addRectCollider(rock, { x: rock.x + rockTex.width / 9 * 4, y: rock.y }, { x: rock.x + rockTex.width / 9 * 5, y: rock.y + rockTex.height });
    rock.passed = false;
}

function shiftGroundX(ground, deltaX) {
    return (ground.x - deltaX) % ground.tileW;
}

function addRectCollider(shape, point1, point2) {
    shape.collider = {
        point1: point1,
        point2: point2,
        update(shift) {
            this.point1.x += shift.x;
            this.point2.x += shift.x;
            this.point1.y += shift.y;
            this.point2.y += shift.y;
        },

        intersects(other) {
            return !(this.point1.x > other.point2.x
                || this.point2.x < other.point1.x
                || this.point1.y > other.point2.y
                || this.point2.y < other.point1.y)
        }
    }
}