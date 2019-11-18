//Create a Pixi Application
let app = new PIXI.Application({ width: 900, height: 460, antialias: true });

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

PIXI.settings.WRAP_MODE = PIXI.WRAP_MODES.REPEAT;

PIXI.loader
    .add("background", "../Assets/PNG/background.png")
    .add("ground", "../Assets/PNG/groundGrass.png")
    .load(setup);

function setup() {

    let resources = PIXI.loader.resources;

    let backgroundTex = resources.background.texture;
    backgroundTex.trim = new PIXI.Rectangle(0,0,900, 460);
    backgroundTex.updateUvs();

    let background = new PIXI.Sprite(backgroundTex);
    app.stage.addChild(background);
}