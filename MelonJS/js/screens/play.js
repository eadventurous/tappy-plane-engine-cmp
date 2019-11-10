game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {

        me.levelDirector.loadLevel("game-map");

        // reset the score
        game.data.score = 0;

        // Add our HUD to the game world, add it last so that this is on top of the rest.
        // Can also be forced by specifying a "Infinity" z value to the addChild function.
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);

        let lowerGround = me.pool.pull("doubleGroundObj");
        lowerGround.setup(false);
        me.game.world.addChild(lowerGround);

        let upperGround = me.pool.pull("doubleGroundObj");
        upperGround.setup(true);
        me.game.world.addChild(upperGround);
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
    }
});
