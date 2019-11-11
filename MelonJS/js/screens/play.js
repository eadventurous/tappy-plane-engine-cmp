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

        this.lowerGround = me.pool.pull("doubleGroundObj");
        this.lowerGround.setup(false);
        me.game.world.addChild(this.lowerGround);

        this.upperGround = me.pool.pull("doubleGroundObj");
        this.upperGround.setup(true);
        me.game.world.addChild(this.upperGround);

        game.data.upperRock = false;
        this.spawn = true;
    },

    spawnRock() {
        if(!this.spawn) return;
        let rock = me.pool.pull("rockObj", game.data.upperRock);
        me.game.world.addChild(rock, 5);
        game.data.upperRock = !game.data.upperRock;
        me.timer.setTimeout(this.spawnRock.bind(this), game.data.rockSpawnTime + Math.random() * game.data.rockSpawnFluct);
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
        me.game.world.removeChild(this.upperGround);
        me.game.world.removeChild(this.lowerGround);
        this.spawn = false;
    }
});
