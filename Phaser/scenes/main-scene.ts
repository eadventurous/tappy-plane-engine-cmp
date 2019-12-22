import { Physics } from "phaser";
import { Rock } from "../gameObjects/Rock";

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
  private scrollSpeed = 0.2;
  private started: boolean;
  private rocks: Array<Rock>;
  private text: Phaser.GameObjects.BitmapText;

  //rock spawn
  private rockSpawnTime = 1700;
  private rockSpawnTimeVariation = 700;
  private rockSpawnCountdown = 0;
  private upperRock = false;

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
    this.load.image("rock", "./assets/PNG/rockGrass.png");
    this.load.bitmapFont("mainFont", "./assets/Font/main_0.png", "./assets/Font/main.fnt");
  }

  create(): void {
    this.started = false;
    this.rocks = new Array<Rock>();

    this.background = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, "background");
    this.height = this.cameras.main.centerY * 2;
    this.width = this.cameras.main.centerX * 2;

    //plane
    let planeAnim = this.anims.create({
      key: 'fly',
      frames: this.anims.generateFrameNumbers('plane', null),
      frameRate: 16,
      repeat: -1
    });

    this.plane = this.physics.add.sprite(this.cameras.main.centerX / 4, this.cameras.main.centerY, 'plane');
    (this.plane.body as Physics.Arcade.Body).setAllowGravity(false);

    let groundHeight = 71;

    //lower ground
    this.lowerGround = this.add.tileSprite(this.cameras.main.centerX,
      this.height - groundHeight / 2, this.width, groundHeight, "ground");

    this.physics.add.existing(this.lowerGround);
    (this.lowerGround.body as Physics.Arcade.Body).setImmovable(true)
      .setSize(this.width, 1)
      .setAllowGravity(false);

    //upper ground
    this.upperGround = this.add.tileSprite(this.cameras.main.centerX,
      groundHeight / 2, this.width, groundHeight, "ground");
    this.upperGround.setRotation(Math.PI);

    this.physics.add.existing(this.upperGround);
    (this.upperGround.body as Physics.Arcade.Body).setImmovable(true)
      .setSize(this.width, 1)
      .setAllowGravity(false);

    this.physics.add.collider(this.plane, [this.lowerGround, this.upperGround], () => {
      this.scene.restart();
    });

    this.text = this.add.bitmapText(this.cameras.main.centerX, this.cameras.main.centerY / 2, "mainFont", "TAPPY PLANE");
    this.text.x = this.cameras.main.centerX - this.text.width / 2;

    //input setup
    this.input.on('pointerdown', (pointer) => {
      if (!this.started) {
        this.start();
        this.started = true;
      }
      (this.plane.body as Physics.Arcade.Body).setVelocityY(-this.jumpVel)
    });
  }

  start() {
    (this.plane.body as Physics.Arcade.Body).setAllowGravity(true);
    this.plane.play("fly");
    this.text.text = "0";
    this.text.x = this.cameras.main.centerX - this.text.width / 2;
  }

  update(time: number, delta: number): void {
    if (this.started) {
      //ground
      this.lowerGround.tilePositionX += this.scrollSpeed * delta;
      this.upperGround.tilePositionX -= this.scrollSpeed * delta;

      //rocks
      this.rocks.forEach((rock) => rock.update(time, delta));

      this.rockSpawnCountdown -= delta;
      if (this.rockSpawnCountdown <= 0) {
        let rock = new Rock({ scene: this, 
          upper: this.upperRock, 
          scrollSpeed: this.scrollSpeed, 
          plane: this.plane, 
          passedFunc: () => this.text.text = (parseInt(this.text.text) + 1).toString()});
        this.rocks.push(rock);
        this.upperRock = !this.upperRock;
        this.rockSpawnCountdown = this.rockSpawnTime + Math.random() * this.rockSpawnTimeVariation;
        this.physics.add.collider(this.plane, rock, () => {
          this.scene.restart();
        });
      }
    }
  }
}
