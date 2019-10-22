var stage, w, h, loader;
var background;

function init(){
    stage = new createjs.Stage("demoCanvas");

    w = stage.canvas.width;
    h = stage.canvas.height;
    
    loader = new createjs.LoadQueue();

    manifest = [
        {src: "background.png", id: "background"}
    ]

    loader.addEventListener("complete", handleComplete);
    loader.loadManifest(manifest, true, "../assets/png/");
}

function handleComplete(){
    background = new createjs.Shape();
    backgroundImg = loader.getResult("background");
    background.graphics.beginBitmapFill(backgroundImg).drawRect(0, 0, w, h);
    stage.addChild(background);
    stage.update();
}

