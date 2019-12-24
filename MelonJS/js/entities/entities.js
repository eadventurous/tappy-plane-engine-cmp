/**
 * Player Entity
 */
game.PlaneEntity = me.Entity.extend({

    /**
     * constructor
     */
    init: function (x, y, settings) {
        // call the constructor
        this._super(me.Entity, 'init', [x, y, settings]);

        this.body.vel = new me.Vector2d(0, 0);
        this.body.mass = 0;
        this.body.collisionType = me.collision.types.PLAYER_OBJECT;
        this.body.setCollisionMask(me.collision.types.WORLD_SHAPE);
        this.renderable.animationpause = true;
        game.data.planePosX = this.pos.x;
    },

    /**
     * update the entity
     */
    update: function (dt) {

        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        //if not set like this velocity x seems to be 1 and drifiting forward, not tacking into account of being set in init
        this.body.vel.x = 0;

        if (me.input.isKeyPressed("jump")) {
            if (!game.data.started) {
                game.data.started = true;
                game.playScreen.spawnRock();
                game.playScreen.textObj.text = 0;
                game.data.flightVel = 0.15;
                this.body.mass = 0.4;
                this.renderable.animationpause = false;
            }
            this.body.vel.y = -game.data.jumpVel;
        }

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },

    /**
      * colision handler
      * (called when colliding with other objects)
      */
    onCollision: function (response, other) {
        if (!game.data.reloadRequest) {
            game.data.reloadRequest = true;
            location.reload();
        }
    }
});

game.GroundEntity = me.Entity.extend({

    /**
     * constructor
     */
    init: function (x, y, upper) {

        var groundImg = me.loader.getImage("groundGrass" + (upper ? "Upper" : ""));

        var groundSettings = {
            "image": groundImg,
            "width": groundImg.width,
            "height": groundImg.height,
            "shapes": [],
        }

        // call the constructor
        this._super(me.Entity, 'init', [x, y, groundSettings]);

        this.body.gravity.y = 0;
        this.body.maxVel.y = 0;

        this.body.collisionType = me.collision.types.WORLD_SHAPE;
        this.body.setCollisionMask(me.collision.types.PLAYER_OBJECT);

        if (upper) {
            this.body.addShapesFromJSON(me.loader.getJSON("colliderGroundUpper"), "groundGrassUpper");
        }
        else {
            this.body.addShapesFromJSON(me.loader.getJSON("colliders"), "groundGrass");
        }

        this.renderable.alwaysUpdate = true;

    },

    /**
     * update the entity
     */
    update: function (time) {
        this.body.update(time);
        return (this._super(me.Entity, 'update', [time]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },
});


game.RockEntity = me.Entity.extend({

    /**
     * constructor
     */
    init: function (upper) {

        var rockImg = me.loader.getImage("rockGrass" + (upper ? "Down" : ""));

        var groundSettings = {
            "image": rockImg,
            "width": rockImg.width,
            "height": rockImg.height,
            "shapes": [],
        }

        // call the constructor
        this._super(me.Entity, 'init', [me.game.viewport.width - 3,
        upper ? 0 : me.game.viewport.height - rockImg.height, groundSettings]);

        this.body.gravity.y = 0;

        this.body.maxVel.y = 0;

        this.body.collisionType = me.collision.types.WORLD_SHAPE;
        this.body.setCollisionMask(me.collision.types.PLAYER_OBJECT);

        if (upper) {
            this.body.addShapesFromJSON(me.loader.getJSON("colliderRockUpper"), "rockGrassDown");
        }
        else {
            this.body.addShapesFromJSON(me.loader.getJSON("colliders"), "rockGrass");
        }

        this.renderable.alwaysUpdate = true;

    },

    /**
     * update the entity
     */
    update: function (time) {
        this.body.update(time);
        this.pos.x -= time * game.data.flightVel;

        if (this.pos.x + this.width / 2 < game.data.planePosX && !this.passed) {
            this.passed = true;
            game.data.score++;
            game.playScreen.textObj.text = game.data.score;
        }

        if(this.pos.x + this.width < 0){
            this.ancestor.removeChild(this);
        }

        return (this._super(me.Entity, 'update', [time]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },
});


game.DoubleGroundEntity = me.Container.extend({

    /**
     * constructor
     */
    init: function () {
        // call the constructor
        this._super(me.Container, 'init');
    },


    setup: function (upper) {

        this.ground1 = me.pool.pull("groundObj", 0, 0, upper);
        this.addChild(this.ground1);

        var ground2 = me.pool.pull("groundObj", this.ground1._width, 0, upper);
        this.addChild(ground2);

        var ground3 = me.pool.pull("groundObj", this.ground1._width * 2, 0, upper);
        this.addChild(ground3);

        this.updateChildBounds();

        this.stickToGround(!upper);
    },

    stickToGround: function (lower) {
        if (lower) {
            this.pos.y = me.game.viewport.height - this.ground1._height;
        }
        this.updateChildBounds();
    },

    /**
     * update the entity
     */
    update: function (time) {
        this._super(me.Container, "update", [time]);
        this.pos.x -= time * game.data.flightVel;
        this.forEach(function (child) {
            if (child.pos.x + this.pos.x < -this.ground1._width + 1) {
                child.pos.x += this.ground1._width * 3;
            }
        });
        this.updateChildBounds();
    },
});