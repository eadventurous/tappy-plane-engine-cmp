/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

export class MainScene extends Phaser.Scene {
  private background: Phaser.GameObjects.Sprite;
  private plane: Phaser.GameObjects.Sprite;

  constructor() {
    super({
      key: "MainScene"
    });
  }

  preload(): void {
    this.load.image("background", "./assets/PNG/background.png");
    this.load.spritesheet("plane", "./assets/Spritesheet/planeSpritesheet.png", { frameWidth: 88, frameHeight: 73 });
  }

  create(): void {
    this.background = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, "background");

    let planeAnim = this.anims.create({
      key: 'fly',
      frames: this.anims.generateFrameNumbers('plane', null),
      frameRate: 16,
      repeat: -1
    });

    this.plane = this.add.sprite(this.cameras.main.centerX / 4, this.cameras.main.centerY, 'plane');
    this.plane.play("fly");
  }

  update(time: number, delta: number): void {

  }
}
