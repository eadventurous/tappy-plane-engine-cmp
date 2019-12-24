game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function () {

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
        
        this.textObj = new (me.Renderable.extend({
            init : function () {
                this._super(me.Renderable, "init", [0, 0, me.game.viewport.width, me.game.viewport.height]);
                this.text = "TAPPY PLANE";
                var textColor = new me.Color(82, 158, 222);
                this.font = new me.Font("arial", 42, textColor, "center");
                this.alwaysUpdate = true;
            },
            destroy : function () {},
            draw : function (renderer) {
                this.font.draw(renderer, this.text, me.game.viewport.width, 3*me.game.viewport.height/4);
            }
        }));
        me.game.world.addChild(this.textObj, 10);

        game.data.upperRock = false;
        this.spawn = true;
    },

    spawnRock: function() {
        if (!this.spawn) return;
        var rock = me.pool.pull("rockObj", game.data.upperRock);
        me.game.world.addChild(rock, 5);
        game.data.upperRock = !game.data.upperRock;
        me.timer.setTimeout(this.spawnRock.bind(this), game.data.rockSpawnTime + Math.random() * game.data.rockSpawnFluct);
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function () {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
        me.game.world.removeChild(this.upperGround);
        me.game.world.removeChild(this.lowerGround);
        this.spawn = false;
    }
});
