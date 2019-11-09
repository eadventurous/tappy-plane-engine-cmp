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
