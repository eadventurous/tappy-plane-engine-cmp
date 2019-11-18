//Create a Pixi Application
let app = new PIXI.Application({ width: 800, height: 460, antialias: true });

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

PIXI.loader
    .add("background", "../Assets/PNG/background.png")
    .load(setup);

function setup() {

    let resources = PIXI.loader.resources;

    //Create the cat sprite
    let background = new PIXI.Sprite(resources.background.texture);

    //Add the cat to the stage
    app.stage.addChild(background);
}