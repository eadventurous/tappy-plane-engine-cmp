/**
 * Player Entity
 */
game.PlaneEntity = me.Entity.extend({

    /**
     * constructor
     */
    init:function (x, y, settings) {
        // call the constructor
        this._super(me.Entity, 'init', [x, y , settings]);

        this.body.vel = new me.Vector2d(0,0);
        this.body.mass = 0.5;
    },

    /**
     * update the entity
     */
    update : function (dt) {

        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        //if not set like this velocity x seems to be 1 and drifiting forward, not tacking into account of being set in init
        this.body.vel.x = 0;

        if(me.input.isKeyPressed("jump")){
            this.body.vel.y = -game.data.jumpVel;
            console.log("jump");
        }

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },

   /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision : function (response, other) {
        // Make all other objects solid
        return true;
    }
});

game.GroundEntity = me.Entity.extend({

    /**
     * constructor
     */
    init:function (x, y) {

        var groundImg = me.loader.getImage("groundGrass");

        var groundSettings = {
            "image": groundImg,
            "width": groundImg.width,
            "height": groundImg.height,
            "shapes": [],
        }

        // call the constructor
        this._super(me.Entity, 'init', [x, y , groundSettings]);

        this.width = groundImg.width;

        this.body.gravity.y = 0;

        this.body.maxVel.y = 0;

        this.body.addShapesFromJSON(me.loader.getJSON("colliders"), "groundGrass");

    },

    /**
     * update the entity
     */
    update: function (time) {
        this.body.update(time);
        return (this._super(me.Entity, 'update', [time]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },
});


game.DoubleGroundEntity = me.Container.extend({

    /**
     * constructor
     */
    init:function (x, y) {
        // call the constructor
        this._super(me.Container, 'init', [x, y]);

        //this.body.vel.x = -game.data.flightVel;
    },


    addChildren: function(){
        let ground1 = me.pool.pull("groundObj", 0, 0);
        this.addChild(ground1);
        this.addChild(me.pool.pull("groundObj", 0, ground1.width));
        this.updateChildBounds();
    },

    /**
     * update the entity
     */
    update: function (time) {
        this._super(me.Container, "update", [time]);
        this.updateChildBounds();
    },
});