import { Physics } from "phaser";

/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

export class MainScene extends Phaser.Scene {
  private background: Phaser.GameObjects.Sprite;
  private plane: Phaser.GameObjects.Sprite;
  private lowerGround: Phaser.GameObjects.TileSprite;
  private upperGround: Phaser.GameObjects.TileSprite;
  private height: integer;
  private width: integer;
  private jumpVel = 200;
  private started = false;

  constructor() {
    super({
      key: "MainScene"
    });
  }

  preload(): void {
    this.load.image("background", "./assets/PNG/background.png");
    this.load.spritesheet("plane", "./assets/Spritesheet/planeSpritesheet.png", { frameWidth: 88, frameHeight: 73 });
    this.load.image("ground", "./assets/PNG/groundGrass.png");
    this.load.image("filler", "./assets/transparent-pixel.png");
  }

  create(): void {
    this.background = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, "background");
    this.height = this.cameras.main.centerY * 2;
    this.width = this.cameras.main.centerX * 2;

    let planeAnim = this.anims.create({
      key: 'fly',
      frames: this.anims.generateFrameNumbers('plane', null),
      frameRate: 16,
      repeat: -1
    });

    this.plane = this.physics.add.sprite(this.cameras.main.centerX / 4, this.cameras.main.centerY, 'plane');
    (this.plane.body as Physics.Arcade.Body).setAllowGravity(false);
    this.plane.play("fly");

    let groundHeight = 71;

    this.lowerGround = this.add.tileSprite(this.cameras.main.centerX,
      this.height - groundHeight / 2, this.width, groundHeight, "ground");

    let lgCollider = this.physics.add.image(this.cameras.main.centerX, this.height - groundHeight / 2, "filler")
      .setImmovable(true);
    lgCollider.setSize(this.width, 1);
    let groundBody = (lgCollider.body as Physics.Arcade.Body);
    groundBody.allowGravity = false;

    this.physics.add.collider(this.plane, lgCollider, () => this.scene.restart());

    this.input.on('pointerdown', (pointer) => {
      if (!this.started) {
        this.start();
        this.started = true;
      }
      (this.plane.body as Physics.Arcade.Body).setVelocityY(-this.jumpVel)
    })
  }

  start() {
    (this.plane.body as Physics.Arcade.Body).setAllowGravity(true);
  }

  update(time: number, delta: number): void {

  }
}
