var stage, w, h, loader;
var background, ground, upperground, plane;

var rocks = [];
var rockSpawnTime = 1500;
var rockSpawnTimeVariation = 700;
var rockSpawnCountdown = rockSpawnTime;
var rockType = false;

var planeV = 0;
var planeA = 0.2;
var planeM = 100;
var speedBoost = -5;

var started = false;

function init() {
    stage = new createjs.Stage("demoCanvas");

    w = stage.canvas.width;
    h = stage.canvas.height;

    loader = new createjs.LoadQueue();

    manifest = [
        { src: "background.png", id: "background" },
        { src: "groundGrass.png", id: "ground" },
        { src: "rockGrass.png", id: "rock"},
        { src: "rockGrassDown.png", id: "rockDown"},
        { src: "planes/planeRed1.png", id: "plane1"},
        { src: "planes/planeRed2.png", id: "plane2"},
        { src: "planes/planeRed3.png", id: "plane3"}
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
    addRectCollider(ground, {y: h-(groundImg.height/1.5), x: 0}, {y: h, x: w} );

    upperground = ground.clone(true);
    upperground.tileW = groundImg.width;
    upperground.x = shiftGroundX(ground, Math.random() * groundImg.width);
    upperground.y = groundImg.height;
    upperground.scaleY = -1;
    addRectCollider(upperground, {y: 0, x: 0}, {y: groundImg.height/1.5, x: w} );

    let planeImg = loader.getResult("plane1");

    var data = {
        images: [planeImg, loader.getResult("plane2"), loader.getResult("plane3")],
        frames: {width:planeImg.width, height:planeImg.height},
    };

    let planeSpriteSheet = new createjs.SpriteSheet(data);
    
    plane = new createjs.Sprite(planeSpriteSheet);
    plane.gotoAndPlay(0);
    //plane.graphics.beginBitmapFill(planeImg).drawRect(0, 0, planeImg.width, planeImg.height);
    plane.y = h/2;
    plane.x = planeImg.width;
    addRectCollider(plane, {y: plane.y, x: plane.x}, {y: plane.y+planeImg.height, x: plane.x + planeImg.width} );

    stage.addChild(background, ground, upperground, plane);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", tick);
    stage.addEventListener("click", () => {
        started = true;
        planeV = speedBoost
    });
    stage.update();
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
    addRectCollider(rock, {x: rock.x + rockImg.width/9*4, y: rock.y}, {x: rock.x + rockImg.width/9*5, y: rock.y + rockImg.height});
    rocks.push(rock);
    stage.addChildAt(rock, stage.getChildIndex(background)+1);
}

function tick(event) {
    if (!started) return;

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
        rock.collider.update({x:-shift, y:0});
        if(rock.collider.intersects(plane.collider)){ 
            location.reload();
        }
    });
    rocks = rocks.filter(rock => rock.x > -rock.width);

    planeV += planeA;
    plane.y += planeV;
    plane.collider.update({x: 0, y: planeV});
    if(plane.collider.intersects(ground.collider) || plane.collider.intersects(upperground.collider))
        location.reload();

    stage.update(event);
}

function addRectCollider(shape, point1, point2){
    shape.collider = {
        point1: point1,
        point2: point2,
        update (shift) {
            this.point1.x += shift.x;
            this.point2.x += shift.x;
            this.point1.y += shift.y;
            this.point2.y += shift.y;
        },

        intersects (other){
            return !(this.point1.x > other.point2.x 
            || this.point2.x < other.point1.x
            || this.point1.y > other.point2.y
            || this.point2.y < other.point1.y)
        }
    }
}