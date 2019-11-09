
/* Game namespace */
var game = {

    // an object where to store game information
    data : {
        // score
        score : 0,
        jumpVel : 10,
        flightVel: 2,
    },


    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init(800, 480, {wrapper : "screen", scale : "auto"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // set and load all resources.
        // (this will also automatically switch to the loading screen)
        me.loader.preload(game.resources, this.loaded.bind(this));
    },

    // Run on game resources loaded.
    "loaded" : function () {
        me.state.set(me.state.PLAY, new game.PlayScreen());

        // enable the keyboard
        me.input.bindKey(me.input.KEY.SPACE, "jump", true);
        // map the left button click on the X key (default if the button is not specified)
        me.input.bindPointer(me.input.KEY.SPACE);

        // add our player entity in the entity pool
        me.pool.register("planeObj", game.PlaneEntity);
        me.pool.register("groundObj", game.GroundEntity, true);
        me.pool.register("doubleGroundObj", game.DoubleGroundEntity);

        // Start the game.
        me.state.change(me.state.PLAY);
    }
};
