import { Physics } from "phaser";

export class Rock extends Phaser.GameObjects.Sprite {
    private _upper = false;
    public scrollSpeed: number;

    get upper(): boolean {
        return this._upper;
    }

    set upper(value: boolean) {
        this._upper = value;
        this.y = value ? this.height / 2 : this.scene.cameras.main.height - this.height / 2;
        if(value) this.setRotation(Math.PI);
    }

    constructor(config) {
        super(config.scene, 0, 0, "rock");
        this.upper = config.upper;
        this.scrollSpeed = config.scrollSpeed;
        this.x = this.scene.cameras.main.width + this.width / 2;
        (config.scene as Phaser.Scene).add.existing(this);
        (config.scene as Phaser.Scene).physics.add.existing(this);
        (this.body as Physics.Arcade.Body).setAllowGravity(false)
            .setSize(this.width / 2, this.height);
    }

    update(time: number, delta: number) {
        this.x -= this.scrollSpeed * delta;
        if (this.x <= -this.width) {
            this.destroy();
        }
    }
}